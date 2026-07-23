import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function TopBar({ title }: { title: string }) {
  const navigate = useNavigate()
  return (
    <header className="pt-safe sticky top-0 z-20 bg-papaya/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-lg items-center gap-2 px-4">
        <button
          onClick={() => navigate(-1)}
          aria-label="Back"
          className="-ml-2 grid h-10 w-10 place-items-center rounded-full text-space active:bg-space/10"
        >
          <ChevronLeft className="h-6 w-6" aria-hidden />
        </button>
        <h1 className="font-display truncate text-xl tracking-wide uppercase text-space">
          {title}
        </h1>
      </div>
    </header>
  )
}
