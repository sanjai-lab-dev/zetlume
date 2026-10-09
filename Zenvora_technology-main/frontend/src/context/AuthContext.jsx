import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('zenvora_user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('zenvora_token')
    if (token) {
      authApi
        .me()
        .then((res) => {
          setUser(res.data.user)
          localStorage.setItem('zenvora_user', JSON.stringify(res.data.user))
        })
        .catch(() => {
          localStorage.removeItem('zenvora_token')
          localStorage.removeItem('zenvora_user')
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = async (email, password) => {
    const res = await authApi.login({ email, password })
    localStorage.setItem('zenvora_token', res.data.access_token)
    localStorage.setItem('zenvora_user', JSON.stringify(res.data.user))
    setUser(res.data.user)
    return res.data.user
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } catch (e) {
      // proceed with local logout even if the API call fails
    }
    localStorage.removeItem('zenvora_token')
    localStorage.removeItem('zenvora_user')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
