import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/AuthGuard'
import Login from './pages/Login'
import CreateMission from './pages/CreateMission'
import Join from './pages/Join'
import Dashboard from './pages/Dashboard'
import ChallengeDetail from './pages/ChallengeDetail'

function Placeholder({ name }: { name: string }) {
  return (
    <main className="grid min-h-dvh place-items-center">
      <h1 className="font-display text-4xl text-space">{name}</h1>
    </main>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        />
        <Route
          path="/challenge/:id"
          element={
            <AuthGuard>
              <ChallengeDetail />
            </AuthGuard>
          }
        />
        <Route
          path="/dispatch"
          element={
            <AuthGuard>
              <Placeholder name="DISPATCH" />
            </AuthGuard>
          }
        />
        <Route
          path="/create"
          element={
            <AuthGuard adminOnly>
              <CreateMission />
            </AuthGuard>
          }
        />
        <Route
          path="/join/:code"
          element={
            <AuthGuard>
              <Join />
            </AuthGuard>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
