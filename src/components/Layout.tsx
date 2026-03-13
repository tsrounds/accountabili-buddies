import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import NotificationBell from './NotificationBell'

export default function Layout() {
  return (
    <div className="paper-bg min-h-screen flex flex-col font-body">
      <header className="sticky top-0 z-40 w-full bg-dark-teal border-b border-cream/10 px-4 py-3 flex items-center justify-between">
        <div className="w-7" />
        <h1 className="font-display text-cream text-lg tracking-widest uppercase leading-none">
          Accountabili-Buddies
        </h1>
        <NotificationBell />
      </header>
      <main className="flex-1 overflow-y-auto pb-24 px-4 pt-5 max-w-lg mx-auto w-full">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
