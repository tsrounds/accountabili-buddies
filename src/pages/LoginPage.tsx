import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ClipboardEvent,
} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
} from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { useAuth } from '@/hooks/useAuth'
import { ArrowRight, Lock } from 'lucide-react'
import MascotZone from '@/components/MascotZone'
import ZoneDivider from '@/components/ZoneDivider'

type Step =
  | { name: 'phone' }
  | { name: 'otp'; confirmationResult: ConfirmationResult; phone: string }
  | { name: 'name'; uid: string; phone: string }

const ERROR_MAP: Record<string, string> = {
  'auth/invalid-phone-number': 'Invalid phone number. Include your country code (e.g. +1).',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
  'auth/invalid-verification-code': 'Incorrect code. Check your message and try again.',
  'auth/code-expired': 'Code expired. Go back and request a new one.',
  'auth/missing-phone-number': 'Please enter your phone number.',
}

function formatError(err: unknown): string {
  if (err && typeof err === 'object' && 'code' in err) {
    const code = (err as { code: string }).code
    return ERROR_MAP[code] ?? (err instanceof Error ? err.message : 'Something went wrong. Try again.')
  }
  return 'Something went wrong. Try again.'
}

export default function LoginPage() {
  const { currentUser, refreshUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/'

  useEffect(() => {
    if (currentUser) navigate(from, { replace: true })
  }, [currentUser, from, navigate])

  const [step, setStep] = useState<Step>({ name: 'phone' })
  const [phoneInput, setPhoneInput] = useState('+1')
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [nameInput, setNameInput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null)
  const digitRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null))

  useEffect(() => {
    if (step.name !== 'phone') return
    if (recaptchaVerifierRef.current) return
    recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {},
    })
    return () => {
      recaptchaVerifierRef.current?.clear()
      recaptchaVerifierRef.current = null
    }
  }, [step.name])

  async function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (!recaptchaVerifierRef.current) throw new Error('reCAPTCHA not ready')
      const cr = await signInWithPhoneNumber(auth, phoneInput, recaptchaVerifierRef.current)
      setStep({ name: 'otp', confirmationResult: cr, phone: phoneInput })
    } catch (err) {
      console.error('[LoginPage] signInWithPhoneNumber error:', err)
      setError(formatError(err))
      try {
        recaptchaVerifierRef.current?.clear()
        recaptchaVerifierRef.current = null
        recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
          callback: () => {},
        })
      } catch (rcErr) {
        console.error('[LoginPage] reCAPTCHA recreate error:', rcErr)
      }
    } finally {
      setSubmitting(false)
    }
  }

  async function handleOtpSubmit(e: FormEvent) {
    e.preventDefault()
    if (step.name !== 'otp') return
    const code = otpDigits.join('')
    if (code.length !== 6) return
    setError(null)
    setSubmitting(true)
    try {
      const credential = await step.confirmationResult.confirm(code)
      const uid = credential.user.uid
      const userSnap = await getDoc(doc(db, 'ab_users', uid))
      if (userSnap.exists()) {
        await refreshUser()
        navigate(from, { replace: true })
      } else {
        setStep({ name: 'name', uid, phone: step.phone })
      }
    } catch (err) {
      setError(formatError(err))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleNameSubmit(e: FormEvent) {
    e.preventDefault()
    if (step.name !== 'name') return
    const firstName = nameInput.trim()
    if (!firstName) return
    setError(null)
    setSubmitting(true)
    try {
      await setDoc(doc(db, 'ab_users', step.uid), {
        uid: step.uid,
        firstName,
        phone: step.phone,
        createdAt: serverTimestamp(),
        avatarUrl: null,
      })
      await refreshUser()
      navigate(from, { replace: true })
    } catch (err) {
      setError(formatError(err))
    } finally {
      setSubmitting(false)
    }
  }

  function handleDigitChange(index: number, value: string) {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...otpDigits]
    next[index] = digit
    setOtpDigits(next)
    if (digit && index < 5) digitRefs.current[index + 1]?.focus()
  }

  function handleDigitKeyDown(index: number, e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      digitRefs.current[index - 1]?.focus()
    }
  }

  function handleOtpPaste(e: ClipboardEvent<HTMLDivElement>) {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    const next = [...otpDigits]
    pasted.split('').forEach((d, i) => { next[i] = d })
    setOtpDigits(next)
    const focusIndex = Math.min(pasted.length, 5)
    digitRefs.current[focusIndex]?.focus()
  }

  const stepLabel = {
    phone: 'ENLISTMENT',
    otp:   'VERIFICATION',
    name:  'IDENTIFICATION',
  }[step.name]

  return (
    <div className="bg-dark min-h-screen flex flex-col font-body">

      {/* ── DARK HERO ZONE ── */}
      <div className="flex-1 flex flex-col items-center justify-end px-5 pb-8 pt-12">
        <MascotZone mood="idle" />
        <p className="mt-4 font-display text-cream/40 text-xs uppercase tracking-[0.25em] animate-slide-up-1">
          {stepLabel}
        </p>
        <h1 className="font-display text-cream text-5xl uppercase tracking-wide text-center leading-none mt-1 animate-slide-up-2">
          Accountabili-<br />Buddies
        </h1>
      </div>

      {/* ── BLOB DIVIDER ── */}
      <ZoneDivider />

      {/* ── LIGHT CONTENT ZONE ── */}
      <div className="zone-content pb-10">
        <div className="w-full max-w-sm mx-auto space-y-4">

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 bg-retro-red/15 border border-retro-red/30 rounded-2xl px-4 py-3 animate-fade-in">
              <p className="font-body text-dark text-sm leading-relaxed">{error}</p>
            </div>
          )}

          {/* ── PHONE STEP ── */}
          {step.name === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4 animate-slide-up">
              <div>
                <label htmlFor="phone" className="block font-body text-xs text-dark/60 uppercase tracking-wider mb-1.5">
                  Mobile Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phoneInput}
                  onChange={e => setPhoneInput(e.target.value)}
                  placeholder="+1 555 000 0000"
                  required
                  className="w-full border border-dark/15 bg-white/60 px-4 py-3
                             font-body text-dark placeholder-dark/30 rounded-2xl
                             focus:outline-none focus:border-dark/40 transition-colors duration-150
                             min-h-[44px] tracking-wider"
                  autoComplete="tel"
                  inputMode="tel"
                />
                <p className="font-body text-dark/50 text-xs mt-1.5 leading-relaxed">
                  Include your country code (e.g. +1 for US/Canada)
                </p>
              </div>
              <div id="recaptcha-container" />
              <button
                type="submit"
                disabled={submitting}
                className="btn-retro-xl w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending Code…' : (
                  <>Send Code <ArrowRight size={16} aria-hidden="true" /></>
                )}
              </button>
            </form>
          )}

          {/* ── OTP STEP ── */}
          {step.name === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4 animate-slide-up">
              <p className="font-body text-dark/60 text-sm text-center leading-relaxed">
                Code dispatched to{' '}
                <span className="text-dark font-semibold">{step.phone}</span>
              </p>
              <div>
                <label className="block font-body text-xs text-dark/60 uppercase tracking-wider mb-2 text-center">
                  Clearance Code
                </label>
                <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={el => { digitRefs.current[i] = el }}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleDigitChange(i, e.target.value)}
                      onKeyDown={e => handleDigitKeyDown(i, e)}
                      className="w-12 h-14 text-center border border-dark/15 bg-white/60
                                 text-dark text-xl font-display rounded-2xl
                                 focus:outline-none focus:border-dark/40 transition-colors duration-150"
                      autoComplete="one-time-code"
                      autoFocus={i === 0}
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting || otpDigits.join('').length !== 6}
                className="btn-retro-xl w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Verifying…' : (
                  <>Confirm Code <Lock size={16} aria-hidden="true" /></>
                )}
              </button>
              <button
                type="button"
                className="w-full text-center font-body text-dark/40 text-sm underline underline-offset-2 cursor-pointer min-h-[44px]"
                onClick={() => { setStep({ name: 'phone' }); setOtpDigits(Array(6).fill('')); setError(null) }}
              >
                Wrong number? Start over
              </button>
            </form>
          )}

          {/* ── NAME STEP ── */}
          {step.name === 'name' && (
            <form onSubmit={handleNameSubmit} className="space-y-4 animate-slide-up">
              <p className="font-body text-dark/60 text-sm leading-relaxed text-center">
                What should we call you, recruit?
              </p>
              <div>
                <label htmlFor="firstName" className="block font-body text-xs text-dark/60 uppercase tracking-wider mb-1.5">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder="e.g. Theodore"
                  required
                  autoFocus
                  className="w-full border border-dark/15 bg-white/60 px-4 py-3
                             font-body text-dark placeholder-dark/30 rounded-2xl
                             focus:outline-none focus:border-dark/40 transition-colors duration-150
                             min-h-[44px]"
                  autoComplete="given-name"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || !nameInput.trim()}
                className="btn-retro-xl w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Reporting for duty…' : (
                  <>Report for Duty <ArrowRight size={16} aria-hidden="true" /></>
                )}
              </button>
            </form>
          )}

          <p className="text-center font-body text-dark/30 text-xs pt-2 leading-relaxed">
            Your data is used only for this app. No spam. Ever.
          </p>
        </div>
      </div>

    </div>
  )
}
