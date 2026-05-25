import { useState } from 'react'
import { doc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export const REACTION_EMOJIS = ['🔥', '😂', '💀', '👏'] as const
export type ReactionEmoji = (typeof REACTION_EMOJIS)[number]
export type Reactions = Partial<Record<string, string[]>>

interface ReactionBarProps {
  collectionName: string
  docId: string
  reactions: Reactions
  currentUid: string
}

// Emoji reaction row. Optimistic toggle; persists to the doc's `reactions` map.
export default function ReactionBar({ collectionName, docId, reactions, currentUid }: ReactionBarProps) {
  const [local, setLocal] = useState<Reactions>(reactions)

  async function toggle(emoji: ReactionEmoji) {
    const has = (local[emoji] ?? []).includes(currentUid)
    setLocal((prev) => {
      const list = prev[emoji] ?? []
      return {
        ...prev,
        [emoji]: has ? list.filter((u) => u !== currentUid) : [...list, currentUid],
      }
    })
    try {
      await updateDoc(doc(db, collectionName, docId), {
        [`reactions.${emoji}`]: has ? arrayRemove(currentUid) : arrayUnion(currentUid),
      })
    } catch {
      // Revert on failure
      setLocal((prev) => {
        const list = prev[emoji] ?? []
        return {
          ...prev,
          [emoji]: has ? [...list, currentUid] : list.filter((u) => u !== currentUid),
        }
      })
    }
  }

  return (
    <div className="flex items-center gap-1.5 mt-2">
      {REACTION_EMOJIS.map((emoji) => {
        const list = local[emoji] ?? []
        const mine = list.includes(currentUid)
        const count = list.length
        return (
          <button
            key={emoji}
            type="button"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); void toggle(emoji) }}
            className={[
              'inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm leading-none',
              'transition-colors duration-150 active:scale-90',
              mine ? 'bg-navy/10 ring-1 ring-navy/30' : 'bg-ink/5 hover:bg-ink/10',
            ].join(' ')}
            aria-pressed={mine}
            aria-label={`React ${emoji}`}
          >
            <span>{emoji}</span>
            {count > 0 && (
              <span className="font-body text-[11px] text-ink/60">{count}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}
