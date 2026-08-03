import type { FormEvent, ReactNode } from 'react'
import { Check, SkipForward } from 'lucide-react'
import type { AmmoPrompt } from '../lib/ammoQuestions'
import { renderAvatarDataUri } from '../lib/avatar'

interface AmmoQuestionRunnerProps {
  prompt: AmmoPrompt
  avatarSeed: string
  answer: string
  onAnswerChange: (value: string) => void
  onSubmit: (e: FormEvent) => void
  onSkip: () => void
  submitting: boolean
  submitLabel?: string
  submittingLabel?: string
  footer?: ReactNode
}

/**
 * Prompt → answer → submit/skip UI shared by the join wizard's ammo phase
 * and the dashboard's post-join nudge sheet. Pure presentation — parents
 * own the prompt-picking and submission logic.
 */
export default function AmmoQuestionRunner({
  prompt,
  avatarSeed,
  answer,
  onAnswerChange,
  onSubmit,
  onSkip,
  submitting,
  submitLabel = 'Submit',
  submittingLabel = 'Filing…',
  footer,
}: AmmoQuestionRunnerProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border-2 border-space/10 bg-white p-4 shadow-card"
    >
      <div className="flex items-center gap-3">
        <img
          src={renderAvatarDataUri(avatarSeed)}
          width={48}
          height={48}
          alt=""
          className="h-12 w-12 shrink-0 rounded-full bg-papaya"
          draggable={false}
        />
        <div>
          <p className="text-xs font-bold tracking-wide uppercase text-space/50">
            About {prompt.participant.firstName}
          </p>
          <p className="font-display text-lg leading-tight text-space">
            {prompt.question}
          </p>
        </div>
      </div>
      <textarea
        autoFocus
        value={answer}
        onChange={(e) => onAnswerChange(e.target.value)}
        maxLength={280}
        rows={3}
        placeholder="Be specific. Names, dates, quotes."
        className="mt-3 w-full resize-none rounded-xl border-2 border-space/15 bg-papaya/40 px-4 py-3 text-base text-space placeholder:text-space/30 focus:border-steel"
      />
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={onSkip}
          className="flex items-center gap-1.5 rounded-xl bg-space/8 px-4 py-2.5 text-sm font-bold text-space/70"
        >
          <SkipForward className="h-4 w-4" aria-hidden /> Skip
        </button>
        <button
          type="submit"
          disabled={!answer.trim() || submitting}
          className="font-display flex flex-1 items-center justify-center gap-2 rounded-xl bg-brick px-4 py-3 tracking-wide uppercase text-papaya shadow-lifted active:bg-lava disabled:opacity-50"
        >
          <Check className="h-4 w-4" aria-hidden />
          {submitting ? submittingLabel : submitLabel}
        </button>
      </div>
      {footer}
    </form>
  )
}
