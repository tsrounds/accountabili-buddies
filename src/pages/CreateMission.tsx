import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Check, Copy, Share2 } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { createChallenge, joinChallenge } from '../lib/challenges'
import type { FrequencyPeriod } from '../lib/types'
import { pageEnter, reveal } from '../lib/motion'
import TopBar from '../components/TopBar'
import Mascot from '../components/Mascot'

export default function CreateMission() {
  const { user, profile } = useAuth()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [ongoing, setOngoing] = useState(true)
  const [duration, setDuration] = useState(30)
  const [goal, setGoal] = useState('')
  const [frequency, setFrequency] = useState(3)
  const [period, setPeriod] = useState<FrequencyPeriod>('per_week')
  const [busy, setBusy] = useState(false)
  const [created, setCreated] = useState<{ challengeId: string; code: string } | null>(
    null,
  )
  const [copied, setCopied] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const shareRef = useRef<HTMLDivElement>(null)

  useEffect(() => pageEnter(rootRef.current), [])
  useEffect(() => {
    if (created) reveal(shareRef.current, 24)
  }, [created])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!user || busy) return
    setBusy(true)
    try {
      const result = await createChallenge({
        name: name.trim(),
        description: description.trim(),
        creatorUid: user.uid,
        duration: ongoing ? null : duration,
        durationType: ongoing ? 'ongoing' : 'fixed',
      })
      await joinChallenge(result.challengeId, {
        uid: user.uid,
        firstName: profile?.firstName ?? 'Buddy',
        avatarSeed: profile?.avatarSeed ?? user.uid,
        personalGoal: goal.trim(),
        targetFrequency: frequency,
        frequencyPeriod: period,
      })
      setCreated(result)
    } finally {
      setBusy(false)
    }
  }

  const inviteUrl = created ? `${window.location.origin}/join/${created.code}` : ''

  async function copyLink() {
    await navigator.clipboard.writeText(inviteUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  async function shareLink() {
    if (navigator.share) {
      await navigator
        .share({
          title: 'Accountabili-Buddies',
          text: `Join "${name}" — code ${created?.code}`,
          url: inviteUrl,
        })
        .catch(() => {})
    } else {
      await copyLink()
    }
  }

  if (created) {
    return (
      <main className="min-h-dvh">
        <TopBar title="Challenge live" />
        <div ref={shareRef} className="mx-auto max-w-lg px-5 pb-16 text-center">
          <Mascot variant={1} float size={140} className="mx-auto mt-4" />
          <h2 className="font-display mt-4 text-3xl uppercase text-space">
            “{name}” is live
          </h2>
          <p className="mt-2 text-sm text-space/70">
            Send this to the group chat. No one gets to say they didn’t know.
          </p>

          <div className="mt-6 rounded-2xl bg-space py-6 text-papaya shadow-lifted">
            <p className="text-xs font-bold tracking-[0.25em] uppercase text-steel">
              Invite code
            </p>
            <p className="font-display mt-1 text-5xl tracking-[0.2em]">
              {created.code}
            </p>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              onClick={copyLink}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-space/15 bg-white py-3.5 font-bold text-space active:bg-space/5"
            >
              {copied ? (
                <Check className="h-5 w-5 text-steel" aria-hidden />
              ) : (
                <Copy className="h-5 w-5" aria-hidden />
              )}
              {copied ? 'Copied' : 'Copy link'}
            </button>
            <button
              onClick={shareLink}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-steel py-3.5 font-bold text-space active:bg-steel/80"
            >
              <Share2 className="h-5 w-5" aria-hidden />
              Share
            </button>
          </div>

          <Link
            to="/"
            className="font-display mt-6 block rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava"
          >
            Go to challenge →
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-dvh">
      <TopBar title="New challenge" />
      <div ref={rootRef} className="mx-auto max-w-lg px-5 pb-16">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label data-animate className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wide uppercase text-space/60">
              Challenge name
            </span>
            <input
              type="text"
              required
              maxLength={60}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Summer of Discipline"
              className="rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base text-space placeholder:text-space/30 focus:border-steel"
            />
          </label>

          <label data-animate className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wide uppercase text-space/60">
              Description <span className="normal-case">(optional)</span>
            </span>
            <textarea
              rows={3}
              maxLength={280}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="What are we holding each other to?"
              className="resize-none rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base text-space placeholder:text-space/30 focus:border-steel"
            />
          </label>

          <div data-animate className="flex flex-col gap-2">
            <span className="text-xs font-bold tracking-wide uppercase text-space/60">
              Duration
            </span>
            <div className="grid grid-cols-2 gap-2 rounded-xl bg-space/8 p-1.5">
              <button
                type="button"
                onClick={() => setOngoing(true)}
                aria-pressed={ongoing}
                className={`rounded-lg py-2.5 font-bold transition-colors ${
                  ongoing ? 'bg-space text-papaya' : 'text-space/60 hover:text-space/80'
                }`}
              >
                Ongoing
              </button>
              <button
                type="button"
                onClick={() => setOngoing(false)}
                aria-pressed={!ongoing}
                className={`rounded-lg py-2.5 font-bold transition-colors ${
                  !ongoing ? 'bg-space text-papaya' : 'text-space/60 hover:text-space/80'
                }`}
              >
                Fixed days
              </button>
            </div>
            {!ongoing && (
              <label className="mt-1 flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-24 rounded-xl border-2 border-space/15 bg-white px-4 py-3 text-center text-base font-bold text-space focus:border-steel"
                />
                <span className="text-sm text-space/70">days of no excuses</span>
              </label>
            )}
          </div>

          <label data-animate className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wide uppercase text-space/60">
              Your personal goal
            </span>
            <input
              type="text"
              required
              maxLength={100}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              placeholder="Run 5k, write 500 words, touch grass…"
              className="rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base text-space placeholder:text-space/30 focus:border-steel"
            />
          </label>

          <div data-animate className="flex flex-col gap-1">
            <span className="text-xs font-bold tracking-wide uppercase text-space/60">
              How often?
            </span>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={1}
                max={31}
                required
                value={frequency}
                onChange={(e) => setFrequency(Number(e.target.value))}
                className="w-20 rounded-xl border-2 border-space/15 bg-white px-3 py-3 text-center text-base font-bold text-space focus:border-steel"
              />
              <span className="text-sm font-bold text-space/60">×</span>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value as FrequencyPeriod)}
                className="flex-1 rounded-xl border-2 border-space/15 bg-white px-4 py-3.5 text-base font-bold text-space focus:border-steel"
              >
                <option value="per_day">per day</option>
                <option value="per_week">per week</option>
                <option value="per_month">per month</option>
              </select>
            </div>
          </div>

          <button
            data-animate
            type="submit"
            disabled={busy || !name.trim() || !goal.trim()}
            className="font-display mt-2 rounded-xl bg-brick py-4 text-lg tracking-wide uppercase text-papaya shadow-lifted active:bg-lava disabled:opacity-50"
          >
            {busy ? 'Creating…' : 'Create challenge'}
          </button>
        </form>
      </div>
    </main>
  )
}
