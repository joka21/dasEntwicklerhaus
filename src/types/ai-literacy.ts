export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

export interface InteractiveTaskData {
  title: string
  description: string
  prompt?: string
  feedback: string
  sampleAnswer?: string
}

export interface PracticeExampleData {
  icon: string
  title: string
  category: string
  situation: string
  solution: string
  benefits: string[]
}

export interface LearningPhaseData {
  title: string
  introduction: string
  learningGoals: string[]
  interactiveTasks: InteractiveTaskData[]
  practiceExamples: PracticeExampleData[]
  quizQuestions: QuizQuestion[]
}
