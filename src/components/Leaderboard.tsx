import { useLayoutEffect, useRef } from 'react'
import { animate } from 'animejs'
import { Flame } from 'lucide-react'
import type { MemberStanding } from '../lib/types'
import { attachListHoverLift, prefersReducedMotion } from '../lib/motion'

interface LeaderboardProps {
  standings: MemberStanding[]
  meUid?: string
  onSelectMember?: (uid: string) => void
}

/**
 * Ranked by completion %. Rows FLIP-animate to their new slots whenever
 * the order changes — names physically slide past each other.
 */
export default function Leaderboard({ standings, meUid, onSelectMember }: LeaderboardProps) {
  const rowRefs = useRef(new Map<string, HTMLLIElement>())
  const prevTops = useRef(new Map<string, number>())
  const hoverCleanups = useRef(new Map<string, () => void>())

  useLayoutEffect(() => {
    const tops = new Map<string, number>()
    rowRefs.current.forEach((el, uid) => tops.set(uid, el.offsetTop))
    if (!prefersReducedMotion()) {
      tops.forEach((top, uid) => {
        const prev = prevTops.current.get(uid)
        const el = rowRefs.current.get(uid)
        if (el && prev !== undefined && prev !== top) {
          animate(el, {
            translateY: [prev - top, 0],
            duration: 480,
            ease: 'outCubic',
          })
        }
      })
    }
    prevTops.current = tops
  }, [standings])

  if (standings.length === 0) return null

  const last = standings.length > 2 ? standings[standings.length - 1].uid : null

  return (
    <ol className="flex flex-col gap-2">
      {standings.map((s) => {
        const isMe = s.uid === meUid
        const isFirst = s.rank === 1
        const isLast = s.uid === last
        return (
          <li
            key={s.uid}
            ref={(el) => {
              if (el) rowRefs.current.set(s.uid, el)
              else rowRefs.current.delete(s.uid)
              attachListHoverLift(el, s.uid, hoverCleanups.current, { scale: 1.02, y: -1 })
            }}
          >
            {(() => {
              const rowContent = (
                <>
                  <span
                    className={`font-display grid h-9 w-9 shrink-0 place-items-center rounded-lg text-lg ${
                      isFirst
                        ? 'bg-lava text-papaya'
                        : isLast
                          ? 'bg-brick/15 text-brick'
                          : 'bg-space/8 text-space'
                    }`}
                  >
                    {s.rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <p className="truncate font-bold text-space">
                        {s.firstName}
                        {isMe && <span className="text-space/40"> (you)</span>}
                      </p>
                      {s.streak > 1 && (
                        <span className="flex items-center gap-0.5 text-xs font-bold text-brick">
                          <Flame className="h-3.5 w-3.5" aria-hidden />
                          {s.streak}
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-space/10">
                      <div
                        className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                          isLast ? 'bg-brick' : 'bg-steel'
                        }`}
                        style={{ width: `${s.completionPct}%` }}
                      />
                    </div>
                  </div>
                  <span className="font-display w-14 shrink-0 text-right text-xl text-space">
                    {s.completionPct}
                    <span className="text-sm text-space/50">%</span>
                  </span>
                </>
              )
              const baseClass = `relative flex w-full items-center gap-3 rounded-xl border-2 px-3.5 py-3 text-left shadow-card ${
                isMe ? 'border-steel bg-steel/15' : 'border-space/10 bg-white'
              }`
              if (onSelectMember) {
                return (
                  <button
                    type="button"
                    onClick={() => onSelectMember(s.uid)}
                    aria-label={`View ${s.firstName}'s calendar`}
                    className={`${baseClass} hover:border-steel/60 hover:bg-steel/10`}
                  >
                    {rowContent}
                  </button>
                )
              }
              return <div className={baseClass}>{rowContent}</div>
            })()}
          </li>
        )
      })}
    </ol>
  )
}
