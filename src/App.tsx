import { Routes, Route } from 'react-router-dom'

function Placeholder({ name }: { name: string }) {
  return (
    <main className="grid min-h-dvh place-items-center">
      <h1 className="font-display text-4xl text-space">{name}</h1>
    </main>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Placeholder name="LOGIN" />} />
      <Route path="/" element={<Placeholder name="DASHBOARD" />} />
      <Route path="/challenge/:id" element={<Placeholder name="MISSION" />} />
      <Route path="/dispatch" element={<Placeholder name="DISPATCH" />} />
      <Route path="/create" element={<Placeholder name="NEW MISSION" />} />
      <Route path="/join/:code" element={<Placeholder name="JOIN" />} />
    </Routes>
  )
}
