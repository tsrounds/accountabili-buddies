import { LogOut, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import ZoneDivider from '@/components/ZoneDivider'

export default function Profile() {
  const { currentUser, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  const initials = (currentUser?.firstName ?? 'R')[0].toUpperCase()

  return (
    <div className="flex flex-col">

      {/* ── DARK HERO ZONE ── */}
      <div className="zone-hero pb-10 flex flex-col items-center gap-3">
        {/* Large avatar ring — character badge */}
        <div className="w-28 h-28 rounded-full bg-dark-teal border-4 border-neon flex items-center justify-center animate-fade-in shadow-glow">
          <span className="font-display text-5xl text-cream leading-none">{initials}</span>
        </div>

        <div className="text-center animate-slide-up">
          <p className="font-body text-cream/40 text-xs uppercase tracking-[0.25em]">Agent</p>
          <h2 className="font-display text-4xl text-cream uppercase tracking-wide leading-tight">
            {currentUser?.firstName ?? 'Recruit'}
          </h2>
          {currentUser?.phone && (
            <p className="font-body text-cream/40 text-sm mt-1">{currentUser.phone}</p>
          )}
        </div>
      </div>

      {/* ── BLOB DIVIDER ── */}
      <ZoneDivider />

      {/* ── LIGHT CONTENT ZONE ── */}
      <div className="zone-content space-y-4">

        {/* Stats grid — placeholder until Phase 7 real data */}
        <div className="grid grid-cols-3 gap-3 animate-slide-up">
          {[
            { label: 'Missions',    value: '—' },
            { label: 'Completed',   value: '—' },
            { label: 'Best Streak', value: '—' },
          ].map(({ label, value }, i) => (
            <div
              key={label}
              className="card-light text-center py-4"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <p className="font-display text-2xl text-neon">{value}</p>
              <p className="font-body text-dark/50 text-xs uppercase tracking-wide mt-1 leading-relaxed">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="space-y-3 animate-slide-up-2">
          <button
            className="inline-flex items-center justify-center gap-2 w-full px-7 py-4
                       bg-dark text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer border-2 border-dark/20
                       transition-all duration-150 hover:bg-dark/90"
          >
            <Settings size={16} strokeWidth={1.8} aria-hidden="true" />
            Settings
          </button>
          <button
            className="inline-flex items-center justify-center gap-2 w-full px-7 py-4
                       bg-retro-red text-cream font-body text-base uppercase tracking-wider
                       rounded-full min-h-[44px] cursor-pointer
                       transition-all duration-150 hover:brightness-110 active:scale-[0.97]"
            style={{ boxShadow: 'inset 0 -3px 0 rgba(0,0,0,0.22)' }}
            onClick={() => void handleSignOut()}
          >
            <LogOut size={16} strokeWidth={1.8} aria-hidden="true" />
            Sign Out
          </button>
        </div>

      </div>
    </div>
  )
}
