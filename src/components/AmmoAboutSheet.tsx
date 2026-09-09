import { useMemo, useRef, useState, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight, X } from 'lucide-react'
import { nextAmmoPrompt, type AmmoPrompt } from '../lib/ammoQuestions'
import { submitAmmoAnswer } from '../lib/challenges'
import AmmoQuestionRunner from './AmmoQuestionRunner'

interface AmmoAboutSheetProps {
  challengeId: string
  target: { uid: string; firstName: string; avatarSeed: string }
  byUid: string
  byFirstName: string
  /** How many answers get us to the "you can bail now" state. */
  minAnswers?: number
  onClose: () => void
  /** Called after each successful submit — parent typically refreshes ammo counts. */
  onAnswered?: () => void
}

/**
 * Bottom-sheet ammo collector focused on ONE target (a newly-joined buddy).
 * Reuses the same prompt/submit machinery as the join wizard's AmmoPhase,
 * but pinned to a single participant so the roster/review UI is not needed.
 */
export default function AmmoAboutSheet({
  challengeId,
  target,
  byUid,
  byFirstName,
  minAnswers = 2,
  onClose,
  onAnswered,
}: AmmoAboutSheetProps) {
  const participants = useMemo(
    () => [{ uid: target.uid, firstName: target.firstName }],
    [target.uid, target.firstName],
  )
  const usedKeysRef = useRef<Set<string>>(new Set())
  const [prompt, setPrompt] = useState<AmmoPrompt | null>(() =>
    nextAmmoPrompt(participants, usedKeysRef.current, { targetUid: target.uid }),
  )
  const [answer, setAnswer] = useState('')
  const [answered, setAnswered] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const done = answered >= minAnswers
  const noPrompt = !prompt

  function advance() {
    setAnswer('')
    setPrompt(
      nextAmmoPrompt(participants, usedKeysRef.current, { targetUid: target.uid }),
    )
  }

  async function handleAnswer(e: FormEvent) {
    e.preventDefault()
    if (!prompt || !answer.trim() || submitting) return
    setSubmitting(true)
    setError('')
    try {
      await submitAmmoAnswer(challengeId, {
        aboutUid: prompt.participant.uid,
        aboutFirstName: prompt.participant.firstName,
        byUid,
        byFirstName,
        questionId: prompt.templateId,
        question: prompt.question,
        answer: answer.trim(),
      })
      usedKeysRef.current.add(`${prompt.participant.uid}:${prompt.templateId}`)
      setAnswered((n) => n + 1)
      onAnswered?.()
      advance()
    } catch (err) {
      console.error('ammo submit failed', err)
      setError('Could not save that one. Try again?')
    } finally {
      setSubmitting(false)
    }
  }

  function handleSkip() {
    if (!prompt) return
    usedKeysRef.current.add(`${prompt.participant.uid}:${prompt.templateId}`)
    advance()
  }

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-space/40 backdrop-blur-sm sm:items-center"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm animate-[slideUp_200ms_ease-out] rounded-t-2xl bg-papaya p-6 shadow-lifted sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-space/50">
              New buddy
            </p>
            <h3 className="font-display mt-0.5 text-2xl tracking-wide uppercase text-space">
              Got dirt on {target.firstName}?
            </h3>
            <p className="mt-1 text-sm text-space/60">
              Answer {minAnswers} to fuel the roasts. Skip anything that misses.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="-mr-1 grid h-9 w-9 shrink-0 place-items-center rounded-full text-space/50 active:bg-space/10"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-space/8 px-4 py-2">
          <span className="text-xs font-bold tracking-wide uppercase text-space/60">
            Spilled
          </span>
          <span className="font-display text-lg text-space">
            {answered} / {minAnswers}
            {done && <span className="text-brick"> ✓</span>}
          </span>
        </div>

        <div className="mt-4">
          {prompt ? (
            <AmmoQuestionRunner
              prompt={prompt}
              avatarSeed={target.avatarSeed}
              answer={answer}
              onAnswerChange={setAnswer}
              onSubmit={handleAnswer}
              onSkip={handleSkip}
              submitting={submitting}
            />
          ) : (
            <div className="rounded-2xl border-2 border-space/10 bg-white p-4 text-center shadow-card">
              <p className="text-sm text-space/60">
                Out of questions for now. Come back tomorrow.
              </p>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-3 text-sm font-bold text-brick">{error}</p>
        )}

        {(done || noPrompt) && (
          <button
            type="button"
            onClick={onClose}
            className="font-display mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-brick py-3 text-base tracking-wide uppercase text-papaya shadow-lifted active:bg-lava"
          >
            {done ? "That'll do" : 'Close'}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </button>
        )}
      </div>
    </div>,
    document.body,
  )
}
