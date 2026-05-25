import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, Hash } from 'lucide-react'
import { submitCheckin, type OtherMember } from '@/lib/checkin'

interface QuickUpdateProps {
  open: boolean
  onClose: () => void
  onSubmitted: () => void
  challengeId: string
  uid: string
  firstName: string
  today: string
  personalGoal: string
  challengeName: string
  targetUnit?: string | null
  otherMembers: OtherMember[]
}

// Quick-entry check-in: swipe right = did it, left = didn't, or tap a button.
// Optional measurable value + note. Designed for an under-5-second update.
export default function QuickUpdate({
  open, onClose, onSubmitted, challengeId, uid, firstName, today,
  personalGoal, challengeName, targetUnit, otherMembers,
}: QuickUpdateProps) {
  const [value, setValue] = useState('')
  const [note, setNote] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hint, setHint] = useState<'did' | 'skip' | null>(null)

  async function submit(completed: boolean) {
    if (submitting) return
    setSubmitting(true)
    setError(null)
    try {
      await submitCheckin({
        challengeId, uid, firstName, today, completed,
        value: value.trim() ? Number(value) : null,
        note, personalGoal, challengeName, otherMembers,
      })
      onSubmitted()
      onClose()
      setValue(''); setNote('')
    } catch {
      setError('Failed to log. Try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-ink/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md bg-dust rounded-t-4xl sm:rounded-4xl p-5 pb-8"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <p className="font-display text-ink text-lg uppercase tracking-wide">Log Update</p>
              <button onClick={onClose} aria-label="Close" className="text-ink/40 hover:text-ink">
                <X size={18} strokeWidth={2} />
              </button>
            </div>

            {personalGoal && (
              <p className="font-body text-ink/60 text-sm mb-3 leading-relaxed">{personalGoal}</p>
            )}

            {/* Swipe card */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragSnapToOrigin
              onDrag={(_, info) => {
                setHint(info.offset.x > 40 ? 'did' : info.offset.x < -40 ? 'skip' : null)
              }}
              onDragEnd={(_, info) => {
                setHint(null)
                if (info.offset.x > 100) void submit(true)
                else if (info.offset.x < -100) void submit(false)
              }}
              className="relative select-none cursor-grab active:cursor-grabbing rounded-3xl bg-ivory border border-ink/10 px-5 py-6 text-center mb-4 shadow-card"
            >
              <p className="font-body text-ink/40 text-xs uppercase tracking-widest mb-1">
                Swipe → did it · ← skipped
              </p>
              <p className="font-display text-2xl uppercase tracking-wide"
                 style={{ color: hint === 'did' ? '#4B5694' : hint === 'skip' ? '#D7263D' : '#111844' }}>
                {hint === 'did' ? 'Did it!' : hint === 'skip' ? 'Skipped' : 'Did you do it?'}
              </p>
            </motion.div>

            {/* Optional measurable value */}
            <div className="mb-3">
              <label htmlFor="qu-value" className="label-light flex items-center gap-1.5">
                <Hash size={11} strokeWidth={2} /> Amount {targetUnit ? `(${targetUnit})` : '(optional)'}
              </label>
              <input
                id="qu-value" type="number" inputMode="numeric" min="0"
                value={value} onChange={(e) => setValue(e.target.value)}
                placeholder="e.g. 3" className="input-light"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="qu-note" className="label-light">Note (optional)</label>
              <textarea
                id="qu-note" rows={2} value={note} onChange={(e) => setNote(e.target.value)}
                placeholder="Any victories or struggles?" className="input-light resize-none"
              />
            </div>

            {error && <p className="font-body text-retro-red text-sm mb-3">{error}</p>}

            <div className="flex gap-3">
              <button
                type="button" disabled={submitting}
                onClick={() => void submit(false)}
                className="btn-danger flex-1 gap-2 disabled:opacity-50"
              >
                <X size={16} strokeWidth={2.5} /> Didn't
              </button>
              <button
                type="button" disabled={submitting}
                onClick={() => void submit(true)}
                className="btn-retro flex-1 gap-2 disabled:opacity-50"
              >
                <Check size={16} strokeWidth={2.5} /> {submitting ? '...' : 'Did it'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
