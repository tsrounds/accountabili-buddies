import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/AuthGuard'
import LoadingScreen from './components/LoadingScreen'
import Login from './pages/Login'

// Login stays in the entry chunk — it's where a signed-out cold start lands.
// The rest split out, which is most of the app's weight: Join and
// ChallengeDetail alone are ~1,300 lines plus their own dependencies.
const loadDashboard = () => import('./pages/Dashboard')
const Dashboard = lazy(loadDashboard)
const ChallengeDetail = lazy(() => import('./pages/ChallengeDetail'))
const CreateMission = lazy(() => import('./pages/CreateMission'))
const Join = lazy(() => import('./pages/Join'))

export default function App() {
  // "/" is where a signed-in cold start lands, but AuthGuard won't render
  // Dashboard until auth resolves — so without this its chunk wouldn't even
  // start downloading until then, trading bundle size for a serial round trip.
  // Kick it off now so it streams alongside the auth handshake.
  useEffect(() => {
    void loadDashboard()
  }, [])

  return (
    <AuthProvider>
      {/* Outside the guard: a route chunk that resolves while auth is still
          pending must not add a second loading state after it. */}
      <Suspense fallback={<LoadingScreen />}>
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
              <AuthGuard>
                <CreateMission />
              </AuthGuard>
            }
          />
          {/* Join is intentionally unguarded — the page bootstraps anonymous
              auth itself so invitees never see a login screen. */}
          <Route path="/join/:code" element={<Join />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  )
}
