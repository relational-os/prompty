import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { cors } from 'hono/cors'
import jwt from 'jsonwebtoken'
import { userModel, promptModel, responseModel } from './db'
import 'dotenv/config'

const app = new Hono()
const JWT_SECRET = process.env.JWT_SECRET || 'secret'

app.use('/api/*', cors())

// Serve static files from dist directory
app.use('/*', serveStatic({ root: './dist' }))
app.use('/*', serveStatic({ path: './dist/index.html' }))

// Middleware to verify JWT
const authMiddleware = async (c: any, next: any) => {
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  
  if (!token) {
    return c.json({ error: 'No token provided' }, 401)
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    c.set('userId', decoded.userId)
    await next()
  } catch (err) {
    return c.json({ error: 'Invalid token' }, 401)
  }
}

// Auth endpoints
app.post('/api/auth/register', async (c) => {
  const { email, password, username } = await c.req.json()
  
  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }

  try {
    const userId = await userModel.create(email, password, username)
    const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' })
    const user = userModel.findById(Number(userId))
    
    return c.json({ token, user })
  } catch (err: any) {
    if (err.message.includes('UNIQUE')) {
      return c.json({ error: 'Email already exists' }, 400)
    }
    return c.json({ error: 'Registration failed' }, 500)
  }
})

app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json()
  
  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }

  const user = userModel.findByEmail(email) as any
  
  if (!user || !(await userModel.verifyPassword(password, user.password))) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' })
  
  return c.json({ 
    token, 
    user: {
      id: user.id,
      email: user.email,
      username: user.username
    }
  })
})

app.get('/api/auth/me', authMiddleware, (c) => {
  const userId = c.get('userId')
  const user = userModel.findById(userId)
  
  if (!user) {
    return c.json({ error: 'User not found' }, 404)
  }
  
  return c.json({ user })
})

// Prompt endpoints
app.post('/api/prompts', authMiddleware, async (c) => {
  const userId = c.get('userId')
  const { title, description, minLength, maxLength, expiresIn } = await c.req.json()
  
  if (!title || !expiresIn) {
    return c.json({ error: 'Title and expiration time are required' }, 400)
  }

  const promptId = promptModel.create(
    userId,
    title,
    description || '',
    minLength || 50,
    maxLength || 500,
    expiresIn
  )
  
  return c.json({ id: promptId })
})

app.get('/api/prompts/:id', async (c) => {
  const promptId = c.req.param('id')
  const token = c.req.header('Authorization')?.replace('Bearer ', '')
  
  const prompt = promptModel.findById(promptId) as any
  
  if (!prompt) {
    return c.json({ error: 'Prompt not found' }, 404)
  }

  if (promptModel.isExpired(prompt)) {
    return c.json({ error: 'Prompt has expired' }, 410)
  }

  let hasResponded = false
  let responses: any[] = []
  
  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as any
      hasResponded = responseModel.hasUserResponded(promptId, decoded.userId)
      
      if (hasResponded) {
        responses = responseModel.findByPromptId(promptId)
      }
    } catch (err) {
      // Invalid token, treat as not logged in
    }
  }

  return c.json({
    prompt: {
      id: prompt.id,
      title: prompt.title,
      description: prompt.description,
      minLength: prompt.min_length,
      maxLength: prompt.max_length,
      expiresAt: prompt.expires_at,
      authorName: prompt.author_name,
      responseCount: responses.length || responseModel.findByPromptId(promptId).length
    },
    hasResponded,
    responses: hasResponded ? responses : []
  })
})

app.get('/api/prompts', authMiddleware, (c) => {
  const userId = c.get('userId')
  const prompts = promptModel.findByUserId(userId)
  
  return c.json({ prompts })
})

// Response endpoints
app.post('/api/prompts/:id/respond', authMiddleware, async (c) => {
  const userId = c.get('userId')
  const promptId = c.req.param('id')
  const { response } = await c.req.json()
  
  if (!response) {
    return c.json({ error: 'Response is required' }, 400)
  }

  const prompt = promptModel.findById(promptId) as any
  
  if (!prompt) {
    return c.json({ error: 'Prompt not found' }, 404)
  }

  if (promptModel.isExpired(prompt)) {
    return c.json({ error: 'Prompt has expired' }, 410)
  }

  if (responseModel.hasUserResponded(promptId, userId)) {
    return c.json({ error: 'You have already responded to this prompt' }, 400)
  }

  if (response.length < prompt.min_length || response.length > prompt.max_length) {
    return c.json({ 
      error: `Response must be between ${prompt.min_length} and ${prompt.max_length} characters` 
    }, 400)
  }

  try {
    await responseModel.create(promptId, userId, response)
    const responses = responseModel.findByPromptId(promptId)
    
    return c.json({ 
      success: true,
      responses
    })
  } catch (err) {
    return c.json({ error: 'Failed to submit response' }, 500)
  }
})

const port = process.env.PORT || 3000
console.log(`Server running on port ${port}`)

export default {
  port,
  fetch: app.fetch,
}