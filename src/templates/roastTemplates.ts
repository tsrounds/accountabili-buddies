// Roast & reminder message templates
// Placeholders: {recipientName}, {checkinName}, {checkinGoal}, {goToExcuse}, {biggestWeakness}, {friendIntel}

// Sent to all OTHER members when someone checks in
export const checkInBlastTemplates: string[] = [
  "{checkinName} just checked in. While you were busy doing absolutely nothing, they were out here conquering {checkinGoal}. Just saying.",
  "BULLETIN: {checkinName} completed {checkinGoal}. Your excuse of '{goToExcuse}' is looking weaker by the minute, {recipientName}.",
  "Intelligence report: {checkinName} checked in. Meanwhile, {recipientName} was last seen in the vicinity of their couch. Unconfirmed.",
  "{checkinName} didn't wait for motivation — they just did {checkinGoal}. A concept that may be foreign to you, {recipientName}.",
  "Breaking: {checkinName} has completed today's mission. The gap between you and them grows ever wider, {recipientName}.",
  "Your buddy {checkinName} just logged {checkinGoal}. We know you saw this notification. We're watching.",
  "{checkinName}: checked in. {recipientName}: has not checked in. One of these people will regret their choices.",
  "Field report: {checkinName} crushed {checkinGoal} today. Sources suggest your biggest weakness is '{biggestWeakness}'. Interesting timing.",
  "DISPATCH FROM HQ: {checkinName} has completed the mission. Waiting on your report, {recipientName}. Don't make us come looking.",
  "Not to make this weird, but {checkinName} checked in today and you didn't, {recipientName}. We have the data. We always have the data.",
]

// Shown when user opens the app and hasn't checked in yet for an active challenge
export const reminderTemplates: string[] = [
  "Still here, {recipientName}. Your '{goToExcuse}' excuse isn't going to check in for you.",
  "Friendly reminder that '{biggestWeakness}' will still be there AFTER you check in. Priorities.",
  "HQ calling {recipientName}. You haven't logged today. Is everything alright? (We know it is. Log in.)",
  "Your mission awaits, {recipientName}. The day is not yet over. Neither are our expectations.",
  "We're not mad, {recipientName}. We're just... disappointed. Check in.",
  "Your buddies are watching the board. Your slot is conspicuously empty. Do with that information what you will.",
  "Today's excuse forecast for {recipientName}: '{goToExcuse}'. Today's acceptable outcome: checking in anyway.",
  "Every day you skip, a small part of your credibility vanishes into the ether. Just a thought. Check in.",
  "An open letter to {recipientName}: It's not too late. It's never too late. But it's getting late. Check in.",
  "The mission doesn't complete itself, {recipientName}. Neither does your reputation. Log your check-in.",
]

// Shown to the group when the challenge hits certain milestones (future use)
export const milestoneTemplates: string[] = [
  "{recipientName} is on a roll. Don't celebrate yet — the mission isn't over.",
  "Halfway there, squad. The second half is where character is revealed. Or exposed.",
  "Final stretch. Whatever excuses you've been saving — leave them here. They won't serve you.",
]

export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key) => vars[key] ?? `{${key}}`)
}

export function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
