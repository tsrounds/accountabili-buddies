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
import { ArrowRight, Lock, User, Phone } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Step =
  | { name: 'phone' }
  | { name: 'otp'; confirmationResult: ConfirmationResult; phone: string }
  | { name: 'name'; uid: string; phone: string }

// ─────────────────────────────────────────────────────────────────────────────
// Firebase error → readable message
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// LoginPage
// ─────────────────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const { currentUser, refreshUser } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? '/'

  // Redirect if already authenticated
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

  // ── reCAPTCHA lifecycle (phone step only) ────────────────────────────────
  useEffect(() => {
    if (step.name !== 'phone') return
    // Guard against StrictMode double-invoke
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

  // ── Phone submission ─────────────────────────────────────────────────────
  async function handlePhoneSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      if (!recaptchaVerifierRef.current) throw new Error('reCAPTCHA not ready')
      const cr = await signInWithPhoneNumber(auth, phoneInput, recaptchaVerifierRef.current)
      setStep({ name: 'otp', confirmationResult: cr, phone: phoneInput })
    } catch (err) {
      setError(formatError(err))
      // Verifier is invalidated after an error — recreate it for next attempt
      recaptchaVerifierRef.current?.clear()
      recaptchaVerifierRef.current = null
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
      })
    } finally {
      setSubmitting(false)
    }
  }

  // ── OTP submission ───────────────────────────────────────────────────────
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
        // Returning user — load their profile into context then navigate
        await refreshUser()
        navigate(from, { replace: true })
      } else {
        // New user — advance to name step
        setStep({ name: 'name', uid, phone: step.phone })
      }
    } catch (err) {
      setError(formatError(err))
    } finally {
      setSubmitting(false)
    }
  }

  // ── Name submission ──────────────────────────────────────────────────────
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

  // ── OTP digit handlers ───────────────────────────────────────────────────
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

  // ── Step title/icon metadata ─────────────────────────────────────────────
  const stepMeta = {
    phone: { title: 'Enlistment Form',    Icon: Phone },
    otp:   { title: 'Enter Clearance Code', Icon: Lock  },
    name:  { title: 'Identification',     Icon: User  },
  }
  const { title, Icon } = stepMeta[step.name]

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div className="paper-bg min-h-screen flex flex-col items-center justify-center px-4 py-10 font-body">
      <div className="w-full max-w-sm">

        {/* App header */}
        <div className="text-center mb-6">
          <h1 className="font-display text-slate text-2xl uppercase tracking-widest leading-tight">
            Accountabili-Buddies
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex-1 border-t-2 border-slate/30" />
            <span className="badge-retro text-slate/60">CLASSIFIED</span>
            <div className="flex-1 border-t-2 border-slate/30" />
          </div>
        </div>

        {/* Step card */}
        <div className="card-retro space-y-4">
          {/* Step header */}
          <div className="flex items-center gap-2 border-b border-slate/20 pb-3">
            <Icon size={16} className="text-mustard" strokeWidth={1.8} />
            <h2 className="font-display text-sm text-slate uppercase tracking-wider">
              {title}
            </h2>
          </div>

          {/* Error message */}
          {error && (
            <p className="font-body text-retro-red text-sm border border-retro-red/30 bg-retro-red/5 px-3 py-2">
              {error}
            </p>
          )}

          {/* ── PHONE STEP ── */}
          {step.name === 'phone' && (
            <form onSubmit={handlePhoneSubmit} className="space-y-4">
              <div>
                <label htmlFor="phone" className="label-retro">Mobile Number</label>
                <input
                  id="phone"
                  type="tel"
                  value={phoneInput}
                  onChange={e => setPhoneInput(e.target.value)}
                  placeholder="+1 555 000 0000"
                  required
                  className="input-retro tracking-wider"
                  autoComplete="tel"
                  inputMode="tel"
                />
                <p className="font-body text-slate/40 text-xs mt-1">
                  Include your country code (e.g. +1 for US/Canada)
                </p>
              </div>
              {/* Invisible reCAPTCHA target */}
              <div id="recaptcha-container" />
              <button
                type="submit"
                disabled={submitting}
                className="btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Sending Code...' : (
                  <>Send Code <ArrowRight size={14} /></>
                )}
              </button>
            </form>
          )}

          {/* ── OTP STEP ── */}
          {step.name === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-4">
              <p className="font-body text-slate/60 text-sm text-center">
                Code dispatched to <span className="text-slate font-semibold">{step.phone}</span>
              </p>
              <div>
                <label className="label-retro text-center block">Clearance Code</label>
                <div
                  className="flex gap-2 justify-center mt-1"
                  onPaste={handleOtpPaste}
                >
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
                      className="w-10 h-12 text-center input-retro text-lg font-display p-0"
                      autoComplete="one-time-code"
                      autoFocus={i === 0}
                    />
                  ))}
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting || otpDigits.join('').length !== 6}
                className="btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Verifying...' : (
                  <>Confirm Code <Lock size={14} /></>
                )}
              </button>
              <button
                type="button"
                className="w-full text-center font-body text-slate/40 text-xs underline underline-offset-2"
                onClick={() => { setStep({ name: 'phone' }); setOtpDigits(Array(6).fill('')); setError(null) }}
              >
                Wrong number? Start over
              </button>
            </form>
          )}

          {/* ── NAME STEP ── */}
          {step.name === 'name' && (
            <form onSubmit={handleNameSubmit} className="space-y-4">
              <p className="font-body text-slate/70 text-sm leading-relaxed">
                What should we call you, recruit?
              </p>
              <div>
                <label htmlFor="firstName" className="label-retro">First Name</label>
                <input
                  id="firstName"
                  type="text"
                  value={nameInput}
                  onChange={e => setNameInput(e.target.value)}
                  placeholder="e.g. Theodore"
                  required
                  autoFocus
                  className="input-retro"
                  autoComplete="given-name"
                />
              </div>
              <button
                type="submit"
                disabled={submitting || !nameInput.trim()}
                className="btn-retro w-full gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Reporting for duty...' : (
                  <>Report for Duty <ArrowRight size={14} /></>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center font-body text-slate/30 text-xs mt-6">
          Your data is used only for this app. No spam. Ever.
        </p>
      </div>
    </div>
  )
}
