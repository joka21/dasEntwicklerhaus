import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { aktuellerViewer } from '@/lib/portal/viewer'
import { logout } from '@/app/login/actions'

export const metadata: Metadata = {
  title: 'Kundenportal',
  robots: { index: false, follow: false },
}

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const viewer = await aktuellerViewer()
  if (!viewer) redirect('/login')

  return (
    <>
      <div className="bg-white border-b border-gray-200">
        <div className="mx-auto w-[90%] max-w-[1500px] py-3 flex items-center justify-end gap-4 text-sm text-dark">
          <span>Angemeldet als {viewer.email}</span>
          <form action={logout}>
            <button type="submit" className="text-primary hover:underline">
              Abmelden
            </button>
          </form>
        </div>
      </div>
      {children}
    </>
  )
}
