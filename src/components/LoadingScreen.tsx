import Mascot from './Mascot'

/** The mascot IS the loading indicator. No spinners in this house. */
export default function LoadingScreen({ message = 'Judging silently…' }: { message?: string }) {
  return (
    <main className="grid min-h-dvh place-items-center bg-papaya">
      <div className="flex flex-col items-center gap-4">
        <Mascot float size={150} />
        <p
          className="text-sm font-bold tracking-wide text-space/70 motion-safe:animate-[loadingPulse_1.8s_ease-in-out_infinite]"
        >
          {message}
        </p>
      </div>
    </main>
  )
}
