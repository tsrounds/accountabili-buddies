import { UserCircle, LogOut, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'

// TODO Phase 4: stats (Missions, Completed, Best Streak) from ab_users document

export default function Profile() {
  const { currentUser, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2">
        <UserCircle size={22} className="text-mustard" strokeWidth={1.5} />
        <h2 className="font-display text-2xl text-slate uppercase tracking-wide">
          Profile
        </h2>
      </div>

      {/* Avatar + name */}
      <div className="card-retro flex items-center gap-4">
        <div className="w-16 h-16 rounded-full border-2 border-slate bg-mustard/20 flex items-center justify-center flex-shrink-0">
          <UserCircle size={40} className="text-slate" strokeWidth={1} />
        </div>
        <div className="min-w-0">
          <p className="font-display text-slate text-lg truncate">
            {currentUser?.firstName ?? 'Recruit'}
          </p>
          <p className="font-body text-slate/40 text-xs truncate">
            {currentUser?.phone ?? ''}
          </p>
        </div>
      </div>

      {/* Stats — Phase 4 */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {[
          { label: 'Missions', value: '—' },
          { label: 'Completed', value: '—' },
          { label: 'Best Streak', value: '—' },
        ].map(({ label, value }) => (
          <div key={label} className="card-retro py-3">
            <p className="font-display text-xl text-mustard">{value}</p>
            <p className="font-body text-slate/50 text-[10px] uppercase tracking-wide mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <button className="btn-outline w-full gap-2">
          <Settings size={16} strokeWidth={1.8} />
          Settings
        </button>
        <button
          className="btn-danger w-full gap-2"
          onClick={() => void handleSignOut()}
        >
          <LogOut size={16} strokeWidth={1.8} />
          Sign Out
        </button>
      </div>
    </section>
  )
}
