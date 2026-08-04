import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { animate, createTimeline } from 'animejs'
import { ArrowRight, Send, MailCheck } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import Mascot from '../components/Mascot'
import LoadingScreen from '../components/LoadingScreen'
import AvatarBuilder from '../components/AvatarBuilder'
import { prefersReducedMotion } from '../lib/motion'
import { randomAvatarSeed } from '../lib/avatar'

type Phase = 'name' | 'email' | 'sending' | 'sent'

export default function Login() {
  const {
    user,
    profile,
    loading,
    completingSignIn,
    needsEmailConfirm,
    needsAvatar,
    sendLink,
    confirmEmailAndSignIn,
    completeProfile,
  } = useAuth()
  const [phase, setPhase] = useState<Phase>(needsEmailConfirm ? 'email' : 'name')
  const [firstName, setFirstName] = useState('')
  const [avatarSeed, setAvatarSeed] = useState(() => randomAvatarSeed())
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [avatarBusy, setAvatarBusy] = useState(false)
  const rootRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (loading || completingSignIn || user || !rootRef.current) return
    if (prefersReducedMotion()) {
      rootRef.current
        .querySelectorAll<HTMLElement>('[data-animate]')
        .forEach((el) => (el.style.opacity = '1'))
      return
    }
    // Mascot drops in → wordmark → form slides up → button settles ready.
    const tl = createTimeline({ defaults: { ease: 'outCubic' } })
    tl.add('[data-animate="mascot"]', {
      opacity: [0, 1],
      translateY: [-32, 0],
      scale: [0.92, 1],
      duration: 500,
    })
      .add(
        '[data-animate="wordmark"]',
        { opacity: [0, 1], translateY: [16, 0], duration: 350 },
        '-=200',
      )
      .add(
        '[data-animate="form"]',
        { opacity: [0, 1], translateY: [28, 0], duration: 400 },
        '-=150',
      )
      .add(
        '[data-animate="cta"]',
        { opacity: [0, 1], scale: [0.96, 1.03, 1], duration: 380 },
        '-=120',
      )
  }, [loading, completingSignIn, user, phase, needsEmailConfirm])

  if (loading || completingSignIn) return <LoadingScreen message="Verifying your link…" />

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    const cleanEmail = email.trim().toLowerCase()
    if (needsEmailConfirm) {
      try {
        await confirmEmailAndSignIn(cleanEmail)
      } catch {
        setError('That email doesn’t match the link. Try again.')
      }
      return
    }
    if (!firstName.trim() || !cleanEmail) return
    setPhase('sending')
    try {
      await sendLink(cleanEmail, firstName.trim())
      setPhase('sent')
    } catch (err) {
      console.error(err)
      setError('Couldn’t send the link. Check the email and try again.')
      setPhase('email')
      const form = rootRef.current?.querySelector('[data-animate="form"]')
      if (form && !prefersReducedMotion()) {
        animate(form, { translateX: [0, -8, 8, -5, 5, 0], duration: 320, ease: 'outQuad' })
      }
    }
  }

  async function handleAvatarConfirm() {
    if (avatarBusy) return
    setAvatarBusy(true)
    setError('')
    try {
      await completeProfile({ firstName: profile?.firstName ?? firstName.trim(), avatarSeed })
    } catch (err) {
      console.error(err)
      setError('Couldn’t save that. Try again.')
    } finally {
      setAvatarBusy(false)
    }
  }

  if (user && needsAvatar) {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-2 px-6 pt-safe pb-safe">
        <div className="mb-2">
          <Mascot variant={0} float size={190} />
        </div>
        <h1 className="font-display text-center text-[2.6rem] leading-[0.95] uppercase text-space">
          Choose your
          <br />
          <span className="text-brick">Avatar</span>
        </h1>
        <div className="mt-6 flex w-full max-w-sm flex-col gap-4">
          <AvatarBuilder seed={avatarSeed} onChange={setAvatarSeed} />
          {error && <p className="text-sm font-bold text-brick">{error}</p>}
          <button
            type="button"
            onClick={handleAvatarConfirm}
            disabled={avatarBusy}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brick px-6 py-4 font-display text-lg tracking-wide uppercase text-papaya shadow-lifted transition-colors active:bg-lava disabled:opacity-60"
          >
            {avatarBusy ? 'Saving…' : "Let's go"}
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </main>
    )
  }

  if (user) return <Navigate to="/" replace />

  return (
    <main
      ref={rootRef}
      className="flex min-h-dvh flex-col items-center justify-center gap-2 px-6 pt-safe pb-safe"
    >
      <div data-animate="mascot" className="mb-2">
        <Mascot variant={phase === 'sent' ? 1 : 0} float size={190} />
      </div>

      <h1
        data-animate="wordmark"
        className="font-display text-center text-[2.6rem] leading-[0.95] uppercase text-space"
      >
        Accountabili-
        <br />
        <span className="text-brick">Buddies</span>
      </h1>

      {phase === 'sent' ? (
        <div data-animate="form" className="mt-6 w-full max-w-sm text-center">
          <div className="rounded-2xl bg-space px-6 py-8 text-papaya shadow-lifted">
            <MailCheck className="mx-auto mb-3 h-8 w-8 text-steel" aria-hidden />
            <h2 className="font-display text-2xl uppercase">Check your email</h2>
            <p className="mt-2 text-sm text-papaya/80">
              A magic link is on its way to <strong>{email}</strong>. Tap it on this
              phone and you’re in. The mascot will wait. Reluctantly.
            </p>
          </div>
          <button
            className="mt-4 text-sm font-bold text-steel underline underline-offset-4"
            onClick={() => setPhase('name')}
          >
            Wrong email? Start over
          </button>
        </div>
      ) : phase === 'name' && !needsEmailConfirm ? (
        <div data-animate="form" className="mt-6 flex w-full max-w-sm flex-col gap-4">
          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wide uppercase text-space/60">
              First name
            </span>
            <input
              type="text"
              autoComplete="given-name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Teddy"
              className="rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base text-space placeholder:text-space/30 focus:border-steel"
            />
          </label>
          <button
            data-animate="cta"
            type="button"
            onClick={() => setPhase('email')}
            disabled={!firstName.trim()}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-brick px-6 py-4 font-display text-lg tracking-wide uppercase text-papaya shadow-lifted transition-colors active:bg-lava disabled:opacity-60"
          >
            Next
            <ArrowRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      ) : (
        <form
          data-animate="form"
          onSubmit={handleSubmit}
          className="mt-6 flex w-full max-w-sm flex-col gap-3"
        >
          {needsEmailConfirm && (
            <p className="rounded-xl bg-steel/20 px-4 py-3 text-sm font-bold text-space">
              New device detected. Confirm the email this link was sent to.
            </p>
          )}
          <label className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wide uppercase text-space/60">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              required
              inputMode="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base text-space placeholder:text-space/30 focus:border-steel"
            />
          </label>
          {error && <p className="text-sm font-bold text-brick">{error}</p>}
          <div className="flex items-center gap-2">
            {!needsEmailConfirm && (
              <button
                type="button"
                onClick={() => setPhase('name')}
                className="rounded-xl bg-space/8 px-4 py-4 text-sm font-bold text-space/70"
              >
                Back
              </button>
            )}
            <button
              data-animate="cta"
              type="submit"
              disabled={phase === 'sending'}
              className="mt-0 flex flex-1 items-center justify-center gap-2 rounded-xl bg-brick px-6 py-4 font-display text-lg tracking-wide uppercase text-papaya shadow-lifted transition-colors active:bg-lava disabled:opacity-60"
            >
              <Send className="h-5 w-5" aria-hidden />
              {phase === 'sending'
                ? 'Sending…'
                : needsEmailConfirm
                  ? 'Confirm & sign in'
                  : 'Send magic link'}
            </button>
          </div>
        </form>
      )}

      <p className="mt-8 max-w-xs text-center text-xs text-space/50">
        No passwords. No excuses. Your friends are watching.
      </p>
    </main>
  )
}
