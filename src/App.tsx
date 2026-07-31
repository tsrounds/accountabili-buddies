import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/AuthGuard'
import Login from './pages/Login'
import CreateMission from './pages/CreateMission'
import Join from './pages/Join'
import Dashboard from './pages/Dashboard'
import ChallengeDetail from './pages/ChallengeDetail'

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
          path="/create"
          element={
            <AuthGuard adminOnly>
              <CreateMission />
            </AuthGuard>
          }
        />
        {/* Join is intentionally unguarded — the page bootstraps anonymous
            auth itself so invitees never see a login screen. */}
        <Route path="/join/:code" element={<Join />} />
      </Routes>
    </AuthProvider>
  )
}
