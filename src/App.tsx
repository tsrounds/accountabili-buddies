import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import AuthGuard from '@/components/AuthGuard'
import Layout from '@/components/Layout'
import LoginPage from '@/pages/LoginPage'
import Home from '@/pages/Home'
import ChallengeDetail from '@/pages/ChallengeDetail'
import CreateChallenge from '@/pages/CreateChallenge'
import JoinChallenge from '@/pages/JoinChallenge'
import Profile from '@/pages/Profile'
import DossierPage from '@/pages/DossierPage'
import CheckInPage from '@/pages/CheckInPage'
import NotificationsPage from '@/pages/NotificationsPage'
import DispatchPage from '@/pages/DispatchPage'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Auth — no Layout, no guard */}
        <Route path="/login" element={<LoginPage />} />

        {/* All app routes — guarded, then wrapped in Layout */}
        <Route element={<AuthGuard />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/challenge/:id" element={<ChallengeDetail />} />
            <Route path="/challenge/:id/dossier" element={<DossierPage />} />
            <Route path="/challenge/:id/checkin" element={<CheckInPage />} />
            <Route path="/create" element={<CreateChallenge />} />
            <Route path="/join" element={<JoinChallenge />} />
            <Route path="/join/:code" element={<JoinChallenge />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/dispatch" element={<DispatchPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}
