import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePrompt from './pages/CreatePrompt'
import ViewPrompt from './pages/ViewPrompt'
import MyPrompts from './pages/MyPrompts'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth()
  
  if (isLoading) {
    return <div className="loading">Loading...</div>
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/prompt/:id" element={<ViewPrompt />} />
          <Route 
            path="/create" 
            element={
              <PrivateRoute>
                <CreatePrompt />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/my-prompts" 
            element={
              <PrivateRoute>
                <MyPrompts />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Layout>
    </AuthProvider>
  )
}

export default App