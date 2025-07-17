'use server'

export async function updateUserRole(id: string, role: 'ADMIN' | 'USER') {
  const res = await fetch('/api/admin/users/edit', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, role }),
  })
  return res.json()
}

export async function deleteUser(id: string) {
  const res = await fetch('/api/admin/users/delete', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  return res.json()
}
