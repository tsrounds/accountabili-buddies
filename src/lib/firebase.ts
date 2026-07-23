import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDVAbxj3ZXfp5feOMvxgIKOnEmEI783lMg',
  authDomain: 'accountabili-buddies.firebaseapp.com',
  projectId: 'accountabili-buddies',
  storageBucket: 'accountabili-buddies.firebasestorage.app',
  messagingSenderId: '198599137573',
  appId: '1:198599137573:web:afbc787d5f72b971b9e2cc',
  measurementId: 'G-LM0NPZJGK4',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)

export default app
