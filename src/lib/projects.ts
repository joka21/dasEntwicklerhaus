import {
  collection,
  doc,
  addDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  where,
  limit,
  Timestamp
} from 'firebase/firestore'
import { db } from './firebase'
import { Project } from '@/types'

export const createProject = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'projects'), {
      ...projectData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    })
    return docRef.id
  } catch (error) {
    console.error('Error creating project:', error)
    throw error
  }
}

export const getProjects = async (limitCount?: number): Promise<Project[]> => {
  try {
    let q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'))
    
    if (limitCount) {
      q = query(q, limit(limitCount))
    }

    const querySnapshot = await getDocs(q)
    const projects: Project[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      projects.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Project)
    })

    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    throw error
  }
}

export const getProject = async (id: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, 'projects', id)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data()
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Project
    }
    return null
  } catch (error) {
    console.error('Error fetching project:', error)
    throw error
  }
}

export const getFeaturedProjects = async (): Promise<Project[]> => {
  try {
    const q = query(
      collection(db, 'projects'),
      where('featured', '==', true),
      orderBy('createdAt', 'desc'),
      limit(6)
    )

    const querySnapshot = await getDocs(q)
    const projects: Project[] = []

    querySnapshot.forEach((doc) => {
      const data = doc.data()
      projects.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt.toDate(),
        updatedAt: data.updatedAt.toDate()
      } as Project)
    })

    return projects
  } catch (error) {
    console.error('Error fetching featured projects:', error)
    throw error
  }
}