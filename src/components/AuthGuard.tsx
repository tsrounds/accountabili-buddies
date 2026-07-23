import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from './LoadingScreen'

export default function AuthGuard({
  children,
  adminOnly = false,
}: {
  children: ReactNode
  adminOnly?: boolean
}) {
  const { user, profile, loading, completingSignIn } = useAuth()

  if (loading || completingSignIn) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && !profile?.isAdmin) return <Navigate to="/" replace />
  return <>{children}</>
}
