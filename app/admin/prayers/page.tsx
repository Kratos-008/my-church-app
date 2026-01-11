// app/admin/prayers/page.tsx
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from '@/lib/auth'
import { prisma } from "@/lib/prisma"
import { PrayerRequest } from "@prisma/client"

export default async function AdminPrayersPage() {
  const session = await getServerSession(authOptions)

  // 🚫 Restrict to Admins only
  if (!session || session.user.role !== "ADMIN") {
    redirect("/")
  }

  // 📥 Fetch all prayer requests
  const prayers: PrayerRequest[] = await prisma.prayerRequest.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Prayer Requests</h1>

      {prayers.length === 0 ? (
        <p className="text-gray-500">No prayer requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-700 bg-gray-900 text-white rounded-lg">
            <thead>
              <tr className="bg-gray-800 text-left">
                <th className="p-3 border-b border-gray-700">Name</th>
                <th className="p-3 border-b border-gray-700">Request</th>
                <th className="p-3 border-b border-gray-700">Status</th>
                <th className="p-3 border-b border-gray-700">Date</th>
                <th className="p-3 border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {prayers.map((prayer) => (
                <tr key={prayer.id} className="hover:bg-gray-800">
                  <td className="p-3 border-b border-gray-700">
                    {prayer.anonymous ? "Anonymous" : prayer.name || "Unknown"}
                  </td>
                  <td className="p-3 border-b border-gray-700">
                    {prayer.request}
                  </td>
                  <td className="p-3 border-b border-gray-700">
                    {prayer.answered ? (
                      <span className="text-green-400 font-semibold">
                        Answered
                      </span>
                    ) : (
                      <span className="text-yellow-400">Pending</span>
                    )}
                    <br />
                    {prayer.approved ? (
                      <span className="text-blue-400 font-semibold">
                        Approved
                      </span>
                    ) : (
                      <span className="text-gray-400">Hidden</span>
                    )}
                  </td>
                  <td className="p-3 border-b border-gray-700">
                    {new Date(prayer.createdAt).toLocaleString()}
                  </td>
                  <td className="p-3 border-b border-gray-700 space-x-2">
                    {/* ✅ Toggle Approve */}
                    <form
                      action={`/api/admin/prayers/${prayer.id}/approve`}
                      method="post"
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-700 text-sm"
                      >
                        {prayer.approved ? "Unapprove" : "Approve"}
                      </button>
                    </form>

                    {/* ✅ Mark as Answered */}
                    {!prayer.answered && (
                      <form
                        action={`/api/admin/prayers/${prayer.id}/answer`}
                        method="post"
                        className="inline"
                      >
                        <button
                          type="submit"
                          className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-sm"
                        >
                          Mark Answered
                        </button>
                      </form>
                    )}

                    {/* 🗑 Delete Request */}
                    <form
                      action={`/api/admin/prayers/${prayer.id}/delete`}
                      method="post"
                      className="inline"
                    >
                      <button
                        type="submit"
                        className="px-3 py-1 rounded bg-red-600 hover:bg-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
