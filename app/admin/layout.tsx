export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 text-black">
      {/* You can add sidebar or navbar here */}
      <main className="p-4">{children}</main>
    </div>
  );
}