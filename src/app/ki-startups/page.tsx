import { redirect } from 'next/navigation'

// Redirect /ki-startups to the blog post
export default function KIStartupsPage() {
  redirect('/blog/ki-startups-2025-deutschland')
}
