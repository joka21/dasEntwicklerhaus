import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { mussAdminSein } from '@/lib/portal/authz'
import { aktuellerViewer } from '@/lib/portal/viewer'

export const metadata: Metadata = {
  title: 'Admin-Bereich',
}

// Regel 11: Nur Admins. Alle anderen bekommen 404, damit niemand erkennt,
// dass es den Bereich gibt. Daten-Funktionen und Actions prüfen zusätzlich.
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!mussAdminSein(await aktuellerViewer())) notFound()
  return children
}
