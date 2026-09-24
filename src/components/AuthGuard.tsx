import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAuth } from '../contexts/AuthContext'
import LoadingScreen from './LoadingScreen'

export default function AuthGuard({ children }: { children: ReactNode }) {
  const { user, loading, completingSignIn } = useAuth()

  if (loading || completingSignIn) return <LoadingScreen />
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}
