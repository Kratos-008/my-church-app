import Link from 'next/link'
import { Church, Users, HandHelping, Mail } from 'lucide-react'

const items = [
  {
    title: "Sunday Services",
    desc: "Join us every Sunday at 7:30 AM",
    icon: <Church className="w-8 h-8 text-blue-600" />,
    href: "/services",
  },
  {
    title: "Youth Fellowship",
    desc: "Young people gathering in faith",
    icon: <Users className="w-8 h-8 text-purple-600" />,
    href: "/youth",
  },
  {
    title: "Prayer Requests",
    desc: "We pray for one another",
    icon: <HandHelping className="w-8 h-8 text-green-600" />,
    href: "/prayer",
  },
  {
    title: "Contact Us",
    desc: "Get in touch with our church",
    icon: <Mail className="w-8 h-8 text-orange-600" />,
    href: "/contact",
  },
]

export default function ConnectCards() {
  return (
    <section className="py-12 px-4 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto animate-fade-in">
      {items.map((item) => (
        <Link
          href={item.href}
          key={item.title}
          className="border p-6 rounded-lg shadow text-center hover:shadow-lg transition block"
        >
          <div className="mb-2 flex justify-center">{item.icon}</div>
          <h4 className="text-lg font-semibold">{item.title}</h4>
          <p className="text-gray-600">{item.desc}</p>
        </Link>
      ))}
    </section>
  )
}