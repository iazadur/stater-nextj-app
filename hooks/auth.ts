import 'server-only'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export function deleteSession() {
  cookies().delete('session')
}

export async function logout() {
  deleteSession()
  redirect('/login')
}