// app/youth/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Users, BookOpen, Heart, HandHelping, Smile, Music } from 'lucide-react'

export default function YouthPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col animate-fade-in">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 flex items-center space-x-2">
        <button onClick={() => router.push('/')} className="text-sm hover:underline">
          ← Back to Home
        </button>
        <Heart className="w-4 h-4 text-white" />
        <span className="text-sm font-medium">Youth Fellowship</span>
      </div>

      {/* Hero Section */}
      <section className="text-center py-10 px-4">
        <h1 className="text-3xl font-bold mb-2">Youth Fellowship</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Join our vibrant youth community! We gather for worship, Bible study, fun activities, and meaningful fellowship.
        </p>

        <div className="mt-6 mx-auto max-w-sm bg-white shadow rounded-lg p-4">
          <p className="font-semibold text-gray-800">Young People Welcome!</p>
          <p className="text-sm text-gray-600 mt-1">
            Ages 13–30 are invited to join us<br/>
            Bible study, worship, and fun activities<br/>
            Building friendships in faith
          </p>
        </div>
      </section>

      {/* Upcoming Youth Meetings */}
      <section className="text-center px-4 py-10">
        <h2 className="text-2xl font-bold mb-1">Upcoming Youth Meetings</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Here are our scheduled youth fellowship meetings. Come join us for worship, Bible study, and fellowship!
        </p>

        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-full mb-4">
            <Users className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="font-semibold mb-1">No Youth Meetings Scheduled</h3>
          <p className="text-gray-500 max-w-md">
            We don't have any upcoming youth meetings scheduled at the moment. Check back soon for new activities and fellowship opportunities!
          </p>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="bg-white px-4 py-14">
        <h2 className="text-center text-2xl font-bold mb-10">What We Do in Youth Fellowship</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
          <div>
            <div className="bg-purple-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
              <BookOpen className="text-purple-500 w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-1">Bible Study</h3>
            <p className="text-gray-500 text-sm">
              Explore God’s Word together and grow in faith through interactive Bible studies.
            </p>
          </div>

          <div>
            <div className="bg-blue-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
              <Music className="text-blue-500 w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-1">Worship</h3>
            <p className="text-gray-500 text-sm">
              Join in contemporary worship with music, prayer, and praise that speaks to young hearts.
            </p>
          </div>

          <div>
            <div className="bg-green-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
              <Users className="text-green-500 w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-1">Fellowship</h3>
            <p className="text-gray-500 text-sm">
              Build lasting friendships with other young people who share your faith and values.
            </p>
          </div>

          <div>
            <div className="bg-orange-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
              <Smile className="text-orange-500 w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-1">Activities</h3>
            <p className="text-gray-500 text-sm">
              Enjoy fun activities, games, and special events designed for young people.
            </p>
          </div>
        </div>
      </section>

      {/* Youth Leadership Section */}
      <section className="text-center px-4 py-14">
        <h2 className="text-2xl font-bold mb-4">Youth Leadership</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-8">
          Our youth ministry is led by dedicated volunteers who are passionate about helping young people grow in their faith and develop their leadership skills.
        </p>
        <div className="max-w-md mx-auto bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2">Want to Get Involved?</h3>
          <p className="text-gray-600 text-sm mb-4">
            Whether you’re interested in joining our youth group or helping with leadership, we’d love to connect with you!
          </p>
          <button className="bg-black text-white font-medium px-4 py-2 rounded hover:bg-gray-800">
            Contact Our Youth Leader
          </button>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-12 px-4">
        <h2 className="text-2xl font-bold mb-2">Join Our Youth Community!</h2>
        <p className="max-w-xl mx-auto mb-6">
          Come and be part of our growing youth fellowship. Make friends, grow in faith, and have fun together!
        </p>
        <div className="space-x-4">
          <Link href="/contact" className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100">Get More Info</Link>
          <Link href="/" className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100">Back to Home</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-6 text-center">
        <div className="flex justify-center items-center space-x-2">
          <Heart className="w-4 h-4 text-white" />
          <span className="font-medium">Masbate Good News Baptist Church</span>
        </div>
        <p className="text-sm mt-1 text-gray-300">Purok 7 Punta Nursery, Masbate City</p>
      </footer>
    </main>
  )
}