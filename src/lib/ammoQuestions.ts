import type { AmmoQuestionTemplate } from './types'

export const AMMO_TEMPLATES: AmmoQuestionTemplate[] = [
  { id: 'witnessed', template: "What's the most {name} thing you've ever witnessed?" },
  { id: 'excuse', template: "If {name} bailed on plans last minute, what was the excuse?" },
  { id: 'order', template: "What does {name} always order that you know isn't good?" },
  { id: 'broken-promise', template: "What's a promise {name} has broken at least twice?" },
  { id: 'go-to-excuse', template: "What's {name}'s most-used excuse for not doing the thing?" },
  { id: 'mess', template: "Describe {name}'s car, room, or desk in one honest sentence." },
  { id: 'nickname', template: "What's a nickname {name} hates but secretly answers to?" },
  { id: 'start-monday', template: "What's the last thing {name} swore they'd 'start Monday'?" },
  { id: 'not-a-big-deal', template: "What habit does {name} insist isn't a big deal? (It is.)" },
  { id: 'competitive', template: "What is {name} weirdly, unnecessarily competitive about?" },
]

export interface AmmoParticipant {
  uid: string
  firstName: string
}

export interface AmmoPrompt {
  participant: AmmoParticipant
  templateId: string
  question: string
}

/**
 * Pick the next (participant, question) pair. `usedKeys` is the set of
 * `${uid}:${templateId}` strings already shown this session — caller adds the
 * returned prompt's key after presenting it (answered OR skipped).
 *
 * `targetUid` pins the participant (deliberate mode). `lastUid` steers away
 * from picking the same person twice in a row in random mode.
 */
export function nextAmmoPrompt(
  members: AmmoParticipant[],
  usedKeys: Set<string>,
  opts: { targetUid?: string; lastUid?: string } = {},
): AmmoPrompt | null {
  if (members.length === 0) return null

  let pool = opts.targetUid
    ? members.filter((m) => m.uid === opts.targetUid)
    : members
  if (pool.length > 1 && opts.lastUid) {
    const filtered = pool.filter((m) => m.uid !== opts.lastUid)
    if (filtered.length > 0) pool = filtered
  }
  if (pool.length === 0) return null

  const participant = pool[Math.floor(Math.random() * pool.length)]
  let templates = AMMO_TEMPLATES.filter(
    (t) => !usedKeys.has(`${participant.uid}:${t.id}`),
  )
  // Pool exhausted for this participant — allow repeats rather than dead-ending.
  if (templates.length === 0) templates = AMMO_TEMPLATES

  const template = templates[Math.floor(Math.random() * templates.length)]
  return {
    participant,
    templateId: template.id,
    question: template.template.replace('{name}', participant.firstName),
  }
}
