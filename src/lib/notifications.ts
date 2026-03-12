import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { fillTemplate, pickRandom, checkInBlastTemplates } from '@/templates/roastTemplates'

export type NotifType = 'checkin_blast' | 'reminder'

export interface NotifPayload {
  recipientUid: string
  type: NotifType
  message: string
  challengeId: string
  challengeName: string
}

export async function writeNotification(payload: NotifPayload): Promise<void> {
  await addDoc(collection(db, 'ab_notifications'), {
    ...payload,
    read: false,
    createdAt: serverTimestamp(),
  })
}

interface CheckinBlastParams {
  checkinUid: string
  checkinName: string
  checkinGoal: string
  challengeId: string
  challengeName: string
  otherMembers: Array<{
    uid: string
    firstName: string
    personalGoal: string
    goToExcuse?: string
    biggestWeakness?: string
  }>
}

export async function sendCheckinBlast(params: CheckinBlastParams): Promise<void> {
  const {
    checkinName, checkinGoal, challengeId, challengeName, otherMembers,
  } = params

  await Promise.all(
    otherMembers.map(member => {
      const message = fillTemplate(pickRandom(checkInBlastTemplates), {
        recipientName: member.firstName,
        checkinName,
        checkinGoal,
        goToExcuse: member.goToExcuse ?? 'I was too tired',
        biggestWeakness: member.biggestWeakness ?? 'procrastination',
      })
      return writeNotification({
        recipientUid: member.uid,
        type: 'checkin_blast',
        message,
        challengeId,
        challengeName,
      })
    })
  )
}
