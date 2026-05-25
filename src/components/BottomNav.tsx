import { NavLink } from 'react-router-dom'
import { Home, PlusCircle, Users, UserCircle } from 'lucide-react'
import type { ElementType } from 'react'

interface NavItem {
  to: string
  label: string
  Icon: ElementType
  end?: boolean
}

const NAV_ITEMS: NavItem[] = [
  { to: '/',        label: 'Home',    Icon: Home,       end: true },
  { to: '/create',  label: 'Create',  Icon: PlusCircle              },
  { to: '/join',    label: 'Join',    Icon: Users                   },
  { to: '/profile', label: 'Profile', Icon: UserCircle              },
]

export default function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none px-4 pt-2"
      style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
    >
      <ul className="pointer-events-auto flex items-stretch max-w-lg mx-auto bg-navy rounded-full shadow-float border border-ivory/10 px-2">
        {NAV_ITEMS.map(({ to, label, Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'relative flex flex-col items-center justify-center gap-1 py-3 w-full min-h-[56px] rounded-full',
                  'transition-colors duration-150',
                  isActive ? 'text-ivory' : 'text-ivory/50 hover:text-ivory/80',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active neon pill indicator */}
                  {isActive && (
                    <span className="absolute inset-1 rounded-full bg-emerald animate-fade-in" aria-hidden="true" />
                  )}
                  <Icon
                    size={20}
                    strokeWidth={isActive ? 2.5 : 1.8}
                    aria-hidden="true"
                    className="relative z-10 transition-transform duration-150 active:scale-90"
                  />
                  <span className="relative z-10 text-[10px] font-display uppercase tracking-wider leading-none">
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
