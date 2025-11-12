import { redirect } from 'next/navigation'

// Redirect /ki-deutschland to the blog post
export default function KIDeutschlandPage() {
  redirect('/blog/deutschland-fuehrende-ki-nation')
}
