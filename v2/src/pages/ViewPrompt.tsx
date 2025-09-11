import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Prompt {
  id: string
  title: string
  description: string
  minLength: number
  maxLength: number
  expiresAt: string
  authorName: string
  responseCount: number
}

interface Response {
  id: number
  username: string
  response: string
  created_at: string
}

const ViewPrompt = () => {
  const { id } = useParams<{ id: string }>()
  const { user, token } = useAuth()
  const navigate = useNavigate()
  
  const [prompt, setPrompt] = useState<Prompt | null>(null)
  const [responses, setResponses] = useState<Response[]>([])
  const [hasResponded, setHasResponded] = useState(false)
  const [response, setResponse] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchPrompt()
  }, [id, token])

  const fetchPrompt = async () => {
    try {
      const headers: any = {}
      if (token) {
        headers['Authorization'] = `Bearer ${token}`
      }
      
      const res = await fetch(`/api/prompts/${id}`, { headers })
      const data = await res.json()
      
      if (!res.ok) {
        if (res.status === 410) {
          setError('This prompt has expired')
        } else {
          setError(data.error || 'Failed to load prompt')
        }
        return
      }
      
      setPrompt(data.prompt)
      setHasResponded(data.hasResponded)
      setResponses(data.responses || [])
    } catch (err) {
      setError('Failed to load prompt')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      navigate(`/register?redirect=/prompt/${id}`)
      return
    }
    
    if (!prompt) return
    
    if (response.length < prompt.minLength || response.length > prompt.maxLength) {
      setError(`Response must be between ${prompt.minLength} and ${prompt.maxLength} characters`)
      return
    }
    
    setError('')
    setSubmitting(true)
    
    try {
      const res = await fetch(`/api/prompts/${id}/respond`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ response })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit response')
      }
      
      setHasResponded(true)
      setResponses(data.responses)
      setResponse('')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="loading">Loading prompt...</div>
  }

  if (!prompt) {
    return (
      <div className="card">
        <div className="error">{error || 'Prompt not found'}</div>
      </div>
    )
  }

  const isExpired = new Date(prompt.expiresAt) < new Date()
  const timeLeft = new Date(prompt.expiresAt).getTime() - Date.now()
  const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
  const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

  return (
    <>
      <div className="card">
        <div className="prompt-meta">
          <span>{prompt.authorName}</span>
          <span>
            {isExpired ? 'Expired' : hoursLeft > 0 ? `Ends in ${hoursLeft} hours` : `Ends in ${minutesLeft} minutes`}
          </span>
          <span>{prompt.responseCount} responses</span>
        </div>
        
        <h1 className="prompt-title">{prompt.title}</h1>
        
        {prompt.description && (
          <p style={{ marginTop: '10px', marginBottom: '20px' }}>{prompt.description}</p>
        )}
        
        {error && <div className="error">{error}</div>}
        
        {!isExpired && !hasResponded && (
          <form onSubmit={handleSubmit}>
            <div className="form-group response-box">
              <label>Your Response</label>
              <textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder="Share your thoughts..."
                rows={6}
                disabled={submitting}
              />
              <div className={`char-count ${
                response.length < prompt.minLength ? 'warning' : 
                response.length > prompt.maxLength ? 'error' : ''
              }`}>
                {response.length} / {prompt.minLength}-{prompt.maxLength}
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn" 
              disabled={submitting || !user}
              style={{ width: '100%' }}
              onClick={!user ? () => navigate('/register') : undefined}
            >
              {!user ? 'Login or Sign Up to Respond' : submitting ? 'Submitting...' : 'Respond'}
            </button>
          </form>
        )}
        
        {hasResponded && !responses.length && (
          <div className="empty-state">
            <p>You're the first to respond! Check back later to see what others think.</p>
          </div>
        )}
      </div>
      
      {hasResponded && responses.length > 0 && (
        <div className="responses-list">
          <h2 style={{ marginBottom: '20px' }}>Responses ({responses.length})</h2>
          {responses.map((resp) => (
            <div key={resp.id} className="response-item">
              <div className="response-author">{resp.username}</div>
              <div className="response-text">{resp.response}</div>
            </div>
          ))}
        </div>
      )}
      
      {!hasResponded && responses.length > 0 && (
        <div className="card" style={{ textAlign: 'center' }}>
          <p>There are {responses.length} hidden responses to this prompt.</p>
          <p style={{ marginTop: '10px', fontWeight: 'bold' }}>Respond to reveal.</p>
        </div>
      )}
    </>
  )
}

export default ViewPrompt