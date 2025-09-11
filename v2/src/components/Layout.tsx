import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">Prompty</Link>
        <nav className="nav">
          {user ? (
            <>
              <Link to="/my-prompts" className="btn btn-secondary">My Prompts</Link>
              <Link to="/create" className="btn">+ New Prompt</Link>
              <span>{user.username}</span>
              <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary">Login</Link>
              <Link to="/register" className="btn">Sign Up</Link>
            </>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout