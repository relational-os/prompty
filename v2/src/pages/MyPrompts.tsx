import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Prompt {
  id: string
  title: string
  description: string
  expires_at: string
  created_at: string
  response_count: number
  author_name?: string
}

const MyPrompts = () => {
  const [createdPrompts, setCreatedPrompts] = useState<Prompt[]>([])
  const [respondedPrompts, setRespondedPrompts] = useState<Prompt[]>([])
  const [loading, setLoading] = useState(true)
  const { token } = useAuth()

  useEffect(() => {
    fetchPrompts()
  }, [])

  const fetchPrompts = async () => {
    try {
      const res = await fetch('/api/prompts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setCreatedPrompts(data.created || [])
        setRespondedPrompts(data.responded || [])
      }
    } catch (err) {
      console.error('Failed to fetch prompts:', err)
    } finally {
      setLoading(false)
    }
  }

  const PromptCard = ({ prompt, showAuthor = false }: { prompt: Prompt, showAuthor?: boolean }) => {
    const isExpired = new Date(prompt.expires_at) < new Date()
    const timeLeft = new Date(prompt.expires_at).getTime() - Date.now()
    const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60))
    
    return (
      <Link 
        key={prompt.id} 
        to={`/prompt/${prompt.id}`}
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <div className="card prompt-card">
          <div className="prompt-meta">
            {showAuthor && prompt.author_name && (
              <span>by {prompt.author_name}</span>
            )}
            <span>{isExpired ? 'Expired' : hoursLeft > 0 ? `${hoursLeft} hours left` : 'Ending soon'}</span>
            <span>{prompt.response_count} responses</span>
          </div>
          <h3 className="prompt-title" style={{ fontSize: '20px' }}>{prompt.title}</h3>
          {prompt.description && (
            <p style={{ marginTop: '10px', color: '#666' }}>{prompt.description}</p>
          )}
        </div>
      </Link>
    )
  }

  if (loading) {
    return <div className="loading">Loading your prompts...</div>
  }

  if (!createdPrompts.length && !respondedPrompts.length) {
    return (
      <div className="empty-state card">
        <h2>No prompts yet</h2>
        <p>Create your first prompt to get started!</p>
        <Link to="/create" className="btn" style={{ marginTop: '20px' }}>
          Create a Prompt
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1>My Prompts</h1>
        <Link to="/create" className="btn">+ New Prompt</Link>
      </div>
      
      {createdPrompts.length > 0 && (
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{ marginBottom: '20px', color: '#666', fontSize: '18px' }}>
            Prompts I've Created ({createdPrompts.length})
          </h2>
          {createdPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      )}
      
      {respondedPrompts.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '20px', color: '#666', fontSize: '18px' }}>
            Prompts I've Responded To ({respondedPrompts.length})
          </h2>
          {respondedPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} showAuthor={true} />
          ))}
        </div>
      )}
    </div>
  )
}

export default MyPrompts