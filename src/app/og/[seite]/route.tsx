import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { notFound } from 'next/navigation'
import { OG_GROESSE, OG_SEITEN, OG_UNTERZEILE, type OgSeite } from '@/lib/og-bilder'

// Open-Graph-Bilder im Stil der Seiten-Heros: blaue Fläche, geometrische Formen.
// Werden beim Build erzeugt.
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(OG_SEITEN).map((seite) => ({ seite }))
}

// Farben aus globals.css
const FARBE = {
  primary: '#93BDE6',
  umwelt: '#73B958',
  frieden: '#BA5FA1',
  menschen: '#FFCD00',
  dark: '#000000',
}

export async function GET(_request: Request, { params }: { params: Promise<{ seite: string }> }) {
  const { seite } = await params
  if (!(seite in OG_SEITEN)) notFound()
  const titel = OG_SEITEN[seite as OgSeite]

  const [interBold, interMedium, logo] = await Promise.all([
    // Feste Pfade, damit der Build nur diese Dateien mitnimmt
    readFile(join(process.cwd(), 'src/assets/fonts/Inter-700.ttf')),
    readFile(join(process.cwd(), 'src/assets/fonts/Inter-500.ttf')),
    readFile(join(process.cwd(), 'public/images/logo/logo-dasentwicklerhaus-1024x783.png')),
  ])
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          background: FARBE.primary,
          fontFamily: 'Inter',
          color: FARBE.dark,
        }}
      >
        <div style={{ position: 'absolute', top: 0, left: 0, width: 220, height: 140, background: FARBE.umwelt }} />
        <div
          style={{
            position: 'absolute',
            right: -110,
            bottom: -110,
            width: 380,
            height: 380,
            borderRadius: 9999,
            background: FARBE.frieden,
          }}
        />
        {/* Satori kann keine Border-Dreiecke, daher SVG */}
        <svg width="180" height="72" viewBox="0 0 180 72" style={{ position: 'absolute', bottom: 0, left: 420 }}>
          <polygon points="90,0 180,72 0,72" fill={FARBE.menschen} />
        </svg>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '160px 220px 120px 80px',
            width: '100%',
          }}
        >
          <div style={{ fontSize: titel.length > 60 ? 54 : 64, fontWeight: 700, lineHeight: 1.15 }}>{titel}</div>
          <div style={{ display: 'flex', alignItems: 'center', marginTop: 40 }}>
            {/* eslint-disable-next-line @next/next/no-img-element -- Satori braucht <img> */}
            <img src={logoSrc} width={115} height={88} alt="" />
            <div style={{ marginLeft: 20, fontSize: 32, fontWeight: 500 }}>{OG_UNTERZEILE}</div>
          </div>
        </div>
      </div>
    ),
    {
      ...OG_GROESSE,
      fonts: [
        { name: 'Inter', data: interBold, weight: 700, style: 'normal' },
        { name: 'Inter', data: interMedium, weight: 500, style: 'normal' },
      ],
    }
  )
}
