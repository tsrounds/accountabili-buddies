import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

export default function AuthGuard() {
  const { currentUser, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="paper-bg min-h-screen flex items-center justify-center">
        <p className="font-display text-slate/50 uppercase tracking-widest text-sm animate-pulse">
          Authenticating...
        </p>
      </div>
    )
  }

  if (!currentUser) {
    // Store where they were trying to go so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
