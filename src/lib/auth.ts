import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  User
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { User as UserType } from '@/types'

export const signIn = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password)
    return result.user
  } catch (error) {
    throw error
  }
}

export const signUp = async (email: string, password: string, displayName: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    
    await updateProfile(result.user, {
      displayName: displayName
    })

    const userData: UserType = {
      id: result.user.uid,
      email: result.user.email!,
      displayName: displayName,
      photoURL: result.user.photoURL,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    await setDoc(doc(db, 'users', result.user.uid), userData)

    return result.user
  } catch (error) {
    throw error
  }
}

export const logout = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw error
  }
}

export const getUserData = async (uid: string): Promise<UserType | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid))
    if (userDoc.exists()) {
      return userDoc.data() as UserType
    }
    return null
  } catch (error) {
    console.error('Error fetching user data:', error)
    return null
  }
}