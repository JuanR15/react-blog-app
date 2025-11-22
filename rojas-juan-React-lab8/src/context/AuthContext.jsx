import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  // Load user from localStorage on first mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('authUser')
      if (stored) {
        setUser(JSON.parse(stored))
      }
    } catch (err) {
      console.error('Failed to load stored auth user', err)
    }
  }, [])

  // Persist user to localStorage whenever it changes
  useEffect(() => {
    try {
      if (user) {
        window.localStorage.setItem('authUser', JSON.stringify(user))
      } else {
        window.localStorage.removeItem('authUser')
      }
    } catch (err) {
      console.error('Failed to persist auth user', err)
    }
  }, [user])

  const login = (username, password) => {
    const trimmedUsername = username.trim()
    const trimmedPassword = password.trim()

    if (!trimmedUsername || !trimmedPassword) {
      return { ok: false, message: 'Username and password are required.' }
    }

    // For this project we are not calling a real backend.
    // Any non-empty username/password combination is treated as a "success".
    setUser({ username: trimmedUsername })
    return { ok: true }
  }

  const logout = () => {
    setUser(null)
  }

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
