export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <h5 className="font-bold">Masbate Good News Baptist Church</h5>
          <p>A loving community serving God and our neighbors in Masbate.</p>
        </div>
        <div>
          <h5 className="font-bold">Location</h5>
          <p>Purok 7 Punta Nursery<br />Masbate City</p>
        </div>
        <div>
          <h5 className="font-bold">Service Times</h5>
          <p>Sunday: 7:30 AM</p>
        </div>
      </div>
      <p className="text-center text-xs mt-6">© 2024 Masbate Good News Baptist Church. All rights reserved.</p>
    </footer>
  )
}
