import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import NotificationBell from './NotificationBell'

export default function Layout() {
  return (
    <div className="bg-dust min-h-screen flex flex-col font-body">
      <header className="sticky top-0 z-40 w-full bg-navy border-b border-ivory/10 px-5 py-4 flex items-center justify-between max-w-lg mx-auto w-full">
        <div className="w-8" />
        <h1 className="font-display text-ivory text-base tracking-[0.2em] uppercase leading-none">
          Accountabili-Buddies
        </h1>
        <NotificationBell />
      </header>
      {/* No horizontal padding — pages own their zone layouts */}
      <main className="flex-1 overflow-y-auto w-full max-w-lg mx-auto">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  )
}
