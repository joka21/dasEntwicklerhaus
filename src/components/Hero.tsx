'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen bg-primary overflow-hidden flex items-center justify-center">
      {/* Geometric Shapes */}
      {/* Green Rectangle - Top Left Corner */}
      <div 
        className="absolute top-0 left-0 w-44 h-32 lg:w-[18rem] lg:h-[12rem] bg-umwelt transition-transform duration-300 hover:scale-110 hover:rotate-3"
        style={{
          transform: `translateY(${scrollY * 0.2}px) rotate(${scrollY * 0.1}deg)`
        }}
      ></div>

      {/* Purple/Violet Half-Circle - Right Edge */}
      <div 
        className="absolute top-16 -right-16 lg:top-20 lg:-right-20 w-44 h-44 lg:w-[20rem] lg:h-[20rem] bg-frieden rounded-full transition-transform duration-300 hover:scale-110"
        style={{
          transform: `translateY(${scrollY * -0.15}px) translateX(${scrollY * -0.1}px)`
        }}
      ></div>

      {/* Yellow Triangle - Bottom Edge */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-transform duration-300 hover:scale-110 hover:-rotate-12"
        style={{
          transform: `translateX(-50%) scale(${0.7 + (scrollY * 0.0003)})`,
          width: 0,
          height: 0,
          borderLeft: '30vw solid transparent',
          borderRight: '30vw solid transparent',
          borderBottom: '120px solid',
          borderBottomColor: 'var(--menschen)',
        }}
      ></div>
      
      {/* Desktop Triangle Overlay for larger size */}
      <div 
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-transform duration-300 hover:scale-110 hover:-rotate-12 hidden lg:block"
        style={{
          transform: `translateX(-50%) scale(${0.7 + (scrollY * 0.0003)})`,
          width: 0,
          height: 0,
          borderLeft: '40vw solid transparent',
          borderRight: '40vw solid transparent',
          borderBottom: '150px solid',
          borderBottomColor: 'var(--menschen)',
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-lg lg:text-xl text-dark leading-relaxed mb-6">
            Seit recht langer Zeit bin ich Entwickler. Viele Trends mitgemacht, viele Trends verpasst, aber immer auf dem Stand der Technik.
          </p>
          
          <p className="text-lg lg:text-xl text-dark leading-relaxed mb-6">
            Und nun kommt KI und plötzlich ist nichts mehr wie es war. Werden unsere Fähigkeiten morgen noch gebraucht? Werde ich noch gebraucht? Die einzig ehrliche Antwort auf diese Frage ist: Keine Ahnung!
          </p>
          
          <p className="text-lg lg:text-xl text-dark leading-relaxed mb-6">
            Wir wissen nicht, was da auf uns zukommt. Wir wissen nicht, was KI in der nächsten Woche alles kann. Aber Zuschauen und mit offenen Augen die neue Welt bestaunen ist eine sehr schlechte Alternative.
          </p>
          
          <p className="text-lg lg:text-xl text-dark leading-relaxed mb-8">
            Also auf geht's! Lass uns Ideen entwickeln, lass uns Ideen vorstellen – dafür gibt es diese Plattform. Werde ein Teil davon und stelle deine Ideen vor oder unterstütze Ideen, die du gut findest.
          </p>
        </div>
        
        <h1 className="text-h1 lg:text-h1-lg font-bold text-dark mb-6 leading-tight">
          Denn gemeinsam erreichen wir{' '}
          <span className="italic font-light">mehr</span>
        </h1>
      </div>

      {/* Black Arrow Down - Center Bottom */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="w-0 h-0 transition-transform duration-300 hover:scale-125 cursor-pointer"
          style={{
            borderLeft: '20px solid transparent',
            borderRight: '20px solid transparent',
            borderTop: '30px solid',
            borderTopColor: 'var(--dark)',
          }}
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        ></div>
      </div>

      {/* Additional decorative shapes for visual interest */}
      {/* Small accent circle - left side (30% larger) */}
      <div 
        className="absolute top-1/3 left-2 lg:left-12 w-10 h-10 lg:w-[3.9rem] lg:h-[3.9rem] bg-zusammenarbeit rounded-full opacity-60 transition-all duration-500 hover:opacity-100 hover:scale-150"
        style={{
          transform: `translateY(${scrollY * 0.4}px)`
        }}
      ></div>

      {/* Small accent square - right side (40% larger) */}
      <div 
        className="absolute bottom-1/3 right-2 lg:right-20 w-16 h-16 lg:w-[5.6rem] lg:h-[5.6rem] bg-zukunft opacity-40 rotate-45 transition-all duration-700 hover:opacity-80 hover:rotate-180 hover:scale-125"
        style={{
          transform: `rotate(45deg) translateY(${scrollY * -0.25}px)`
        }}
      ></div>
    </section>
  )
}