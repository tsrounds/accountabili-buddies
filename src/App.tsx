import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import AuthGuard from './components/AuthGuard'
import Login from './pages/Login'

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
              <Placeholder name="DASHBOARD" />
            </AuthGuard>
          }
        />
        <Route
          path="/challenge/:id"
          element={
            <AuthGuard>
              <Placeholder name="MISSION" />
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
              <Placeholder name="NEW MISSION" />
            </AuthGuard>
          }
        />
        <Route
          path="/join/:code"
          element={
            <AuthGuard>
              <Placeholder name="JOIN" />
            </AuthGuard>
          }
        />
      </Routes>
    </AuthProvider>
  )
}
