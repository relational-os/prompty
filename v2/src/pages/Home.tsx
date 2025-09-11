import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="card">
      <h1 className="prompt-title">Prompty is a collaborative prompting game for together fun.</h1>
      <p style={{ fontSize: '18px', marginTop: '20px', marginBottom: '30px' }}>
        Create prompts, share them with friends, and discover what everyone thinks — 
        but only after you've shared your own response.
      </p>
      
      <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
        {user ? (
          <Link to="/create" className="btn">Create a Prompt</Link>
        ) : (
          <>
            <Link to="/register" className="btn">Get Started</Link>
            <Link to="/login" className="btn btn-secondary">Login</Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Home