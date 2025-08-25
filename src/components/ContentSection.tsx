import { ReactNode } from 'react'

interface ContentSectionProps {
  children: ReactNode
  className?: string
}

export default function ContentSection({ children, className = '' }: ContentSectionProps) {
  return (
    <section className={`relative w-full bg-light text-dark overflow-hidden ${className}`}>
      {/* Background Geometric Decorations */}
      {/* Green Rectangles */}
      <div className="absolute top-16 left-8 w-16 h-12 bg-umwelt-600 opacity-20 rotate-12 z-0"></div>
      <div className="absolute top-32 right-20 w-20 h-14 bg-umwelt-700 opacity-15 -rotate-6 z-0"></div>
      <div className="absolute bottom-24 left-1/4 w-18 h-12 bg-umwelt-500 opacity-25 rotate-45 z-0"></div>
      
      {/* Purple Circles */}
      <div className="absolute top-20 right-12 w-14 h-14 bg-frieden-600 rounded-full opacity-20 z-0"></div>
      <div className="absolute top-1/3 left-12 w-12 h-12 bg-frieden-700 rounded-full opacity-15 z-0"></div>
      <div className="absolute bottom-16 right-1/3 w-16 h-16 bg-frieden-500 rounded-full opacity-25 z-0"></div>
      
      {/* Yellow Triangles */}
      <div 
        className="absolute top-40 left-1/3 opacity-20 z-0"
        style={{
          width: 0,
          height: 0,
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '28px solid',
          borderBottomColor: 'var(--menschen-600)',
        }}
      ></div>
      <div 
        className="absolute bottom-32 left-16 opacity-15 z-0"
        style={{
          width: 0,
          height: 0,
          borderLeft: '26px solid transparent',
          borderRight: '26px solid transparent',
          borderBottom: '32px solid',
          borderBottomColor: 'var(--menschen-700)',
        }}
      ></div>
      
      {/* Blue Future Shapes */}
      <div className="absolute top-24 left-2/3 w-8 h-20 bg-zukunft-600 opacity-20 rotate-12 z-0"></div>
      <div className="absolute bottom-20 right-16 w-14 h-8 bg-zukunft-700 opacity-15 -rotate-45 z-0"></div>
      
      {/* Gray Secondary Accents */}
      <div className="absolute top-1/2 right-8 w-6 h-6 bg-secondary-600 rounded-full opacity-30 z-0"></div>
      <div className="absolute bottom-1/3 left-8 w-12 h-4 bg-secondary-700 opacity-20 rotate-45 z-0"></div>
      <div className="absolute top-12 left-1/2 w-8 h-8 bg-secondary-500 opacity-25 rotate-12 z-0"></div>
      
      {/* Additional Organic Shapes */}
      <div className="absolute top-2/3 right-1/4 w-7 h-16 bg-zusammenarbeit-600 opacity-15 rotate-75 z-0"></div>
      <div className="absolute bottom-8 left-2/3 w-5 h-5 bg-umwelt-800 rounded-full opacity-30 z-0"></div>
      <div className="absolute top-8 right-1/3 w-10 h-5 bg-frieden-800 opacity-10 -rotate-12 z-0"></div>
      
      {/* Content Container */}
      <div className="relative z-10 mx-auto w-[90%] max-w-[1500px] py-16">
        {children}
      </div>
    </section>
  )
}