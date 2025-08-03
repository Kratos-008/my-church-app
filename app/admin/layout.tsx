import { getServerSession } from 'next-auth'
import {authOptions} from '@/lib/auth'
import { redirect } from 'next/navigation'
import AdminClientLayout from '@/app/components/admin/AdminClientLayout'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  console.log('admin session:', session)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  return <AdminClientLayout>{children}</AdminClientLayout>
}