// Roast & reminder message templates
// Placeholders: {recipientName}, {checkinName}, {checkinGoal}, {goToExcuse}, {biggestWeakness}, {friendIntel}

// Sent to all OTHER members when someone checks in
export const checkInBlastTemplates: string[] = [
  "{checkinName} just checked in. While you were doing whatever it is you do, they were actually doing {checkinGoal}. Just so you know.",
  "{checkinName} did the thing. The thing you also said you'd do, {recipientName}. Your move.",
  "Oh look, {checkinName} checked in. And here we are, still waiting on you, {recipientName}. Totally fine.",
  "{checkinName} is out here doing {checkinGoal}. Not judging. Definitely keeping track though.",
  "Hey {recipientName}, {checkinName} logged their check-in. You mentioned '{goToExcuse}' would be your thing today. Looking forward to seeing how that turns out.",
  "Big news: {checkinName} showed up for {checkinGoal}. Still rooting for you, {recipientName}. Still waiting.",
  "{checkinName}: checked in. {recipientName}: not yet. These are the facts. That's all.",
  "Update from {checkinName}: they did it. Update from {recipientName}: ...we'll circle back.",
  "You mentioned '{goToExcuse}', {recipientName}. {checkinName} mentioned nothing — they just showed up. Different approaches.",
  "Not to pressure you or anything, but {checkinName} just checked in. And you haven't. That's totally a choice you're making.",
]

// Shown when user opens the app and hasn't checked in yet for an active challenge
export const reminderTemplates: string[] = [
  "Hey {recipientName}. Just checking in. You haven't. Yet.",
  "Your '{goToExcuse}' strategy hasn't checked you in, {recipientName}. Something to think about.",
  "Today is still happening, {recipientName}. Just putting that out there.",
  "You're not behind yet. You could be though. Maybe check in.",
  "We're not keeping score. (We are.)",
  "Your buddies are watching the board. Your spot is very... available.",
  "One check-in. That's all. You've done harder things. Probably.",
  "Still time today, {recipientName}. Not a lot of time. But some.",
  "'{goToExcuse}' is a classic. Genuinely. But so is checking in.",
  "We believe in you, {recipientName}. We also have the data.",
]

// Shown to the group when the challenge hits certain milestones (future use)
export const milestoneTemplates: string[] = [
  "{recipientName} is doing well. Don't let it go to their head.",
  "Halfway there, everyone. The second half is where excuses get creative.",
  "Almost done. Whatever you've been saving for the end — now would be a good time.",
]

export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`)
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
