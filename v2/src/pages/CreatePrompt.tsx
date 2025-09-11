import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const CreatePrompt = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [minLength, setMinLength] = useState(50)
  const [maxLength, setMaxLength] = useState(500)
  const [expiresIn, setExpiresIn] = useState('3600')
  const [error, setError] = useState('')
  const { token } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    try {
      const res = await fetch('/api/prompts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          minLength,
          maxLength,
          expiresIn: parseInt(expiresIn)
        })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create prompt')
      }
      
      navigate(`/prompt/${data.id}`)
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="prompt-title">Create a Prompt</h2>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Prompt Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's your burning question?"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add context or instructions..."
            rows={3}
          />
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="form-group">
            <label>Min Length</label>
            <input
              type="number"
              value={minLength}
              onChange={(e) => setMinLength(parseInt(e.target.value))}
              min="10"
              max="1000"
            />
          </div>
          
          <div className="form-group">
            <label>Max Length</label>
            <input
              type="number"
              value={maxLength}
              onChange={(e) => setMaxLength(parseInt(e.target.value))}
              min="50"
              max="5000"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label>Expires In</label>
          <select value={expiresIn} onChange={(e) => setExpiresIn(e.target.value)}>
            <option value="3600">1 hour</option>
            <option value="14400">4 hours</option>
            <option value="86400">1 day</option>
            <option value="259200">3 days</option>
            <option value="604800">1 week</option>
          </select>
        </div>
        
        <button type="submit" className="btn" style={{ width: '100%' }}>
          Create Prompt
        </button>
      </form>
    </div>
  )
}

export default CreatePrompt