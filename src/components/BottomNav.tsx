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
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-dark-teal border-t border-cream/10">
      <ul className="flex items-stretch max-w-lg mx-auto">
        {NAV_ITEMS.map(({ to, label, Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                [
                  'flex flex-col items-center justify-center gap-1 py-3 w-full',
                  'transition-colors duration-100',
                  isActive ? 'text-neon' : 'text-cream/40 hover:text-cream/70',
                ].join(' ')
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} aria-hidden="true" />
                  <span className="text-[10px] font-display uppercase tracking-wider leading-none">
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
