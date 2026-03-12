// Re-export AbUser as AuthUser so any future consumers of AuthUser continue to work
export type { AbUser as AuthUser } from '@/contexts/AuthContext'
export { useAuthContext as useAuth } from '@/contexts/AuthContext'
