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
      <div className="absolute top-16 left-8 w-12 h-8 bg-umwelt opacity-20 rotate-12 z-0"></div>
      <div className="absolute top-32 right-20 w-16 h-10 bg-umwelt opacity-15 -rotate-6 z-0"></div>
      <div className="absolute bottom-24 left-1/4 w-14 h-9 bg-umwelt opacity-25 rotate-45 z-0"></div>
      
      {/* Purple Circles */}
      <div className="absolute top-20 right-12 w-10 h-10 bg-frieden rounded-full opacity-20 z-0"></div>
      <div className="absolute top-1/3 left-12 w-8 h-8 bg-frieden rounded-full opacity-15 z-0"></div>
      <div className="absolute bottom-16 right-1/3 w-12 h-12 bg-frieden rounded-full opacity-25 z-0"></div>
      
      {/* Yellow Triangles */}
      <div 
        className="absolute top-40 left-1/3 opacity-20 z-0"
        style={{
          width: 0,
          height: 0,
          borderLeft: '15px solid transparent',
          borderRight: '15px solid transparent',
          borderBottom: '20px solid',
          borderBottomColor: 'var(--menschen)',
        }}
      ></div>
      <div 
        className="absolute bottom-32 left-16 opacity-15 z-0"
        style={{
          width: 0,
          height: 0,
          borderLeft: '20px solid transparent',
          borderRight: '20px solid transparent',
          borderBottom: '25px solid',
          borderBottomColor: 'var(--menschen)',
        }}
      ></div>
      
      {/* Blue Future Shapes */}
      <div className="absolute top-24 left-2/3 w-6 h-16 bg-zukunft opacity-20 rotate-12 z-0"></div>
      <div className="absolute bottom-20 right-16 w-10 h-6 bg-zukunft opacity-15 -rotate-45 z-0"></div>
      
      {/* Gray Secondary Accents */}
      <div className="absolute top-1/2 right-8 w-4 h-4 bg-secondary rounded-full opacity-30 z-0"></div>
      <div className="absolute bottom-1/3 left-8 w-8 h-2 bg-secondary opacity-20 rotate-45 z-0"></div>
      <div className="absolute top-12 left-1/2 w-6 h-6 bg-secondary opacity-25 rotate-12 z-0"></div>
      
      {/* Additional Organic Shapes */}
      <div className="absolute top-2/3 right-1/4 w-5 h-12 bg-zusammenarbeit opacity-15 rotate-75 z-0"></div>
      <div className="absolute bottom-8 left-2/3 w-3 h-3 bg-umwelt rounded-full opacity-30 z-0"></div>
      <div className="absolute top-8 right-1/3 w-7 h-3 bg-frieden opacity-10 -rotate-12 z-0"></div>
      
      {/* Content Container */}
      <div className="relative z-10 mx-auto w-[90%] max-w-[1500px] py-16">
        {children}
      </div>
    </section>
  )
}