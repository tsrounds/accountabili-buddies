import { NavLink } from 'react-router-dom'
import { Home, Plus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

/** Bottom tab bar — thumb reach first. */
export default function AppNav() {
  const { profile } = useAuth()

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex flex-1 flex-col items-center gap-0.5 py-2.5 text-[0.7rem] font-bold tracking-wide uppercase ${
      isActive ? 'text-steel' : 'text-papaya/50 hover:text-papaya/70'
    }`

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 bg-space pb-safe">
      <div className="mx-auto flex max-w-lg items-stretch">
        <NavLink to="/" end className={linkClass}>
          <Home className="h-6 w-6" aria-hidden />
          Home
        </NavLink>
        {profile?.isAdmin && (
          <NavLink to="/create" className={linkClass}>
            <Plus className="h-6 w-6" aria-hidden />
            New
          </NavLink>
        )}
      </div>
    </nav>
  )
}
