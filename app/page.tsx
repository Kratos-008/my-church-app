
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import VerseOfTheDay from './components/VerseOfTheDay'
import NextService from './components/NextService'
import UpcomingEvents from './components/UpcomingEvents'
import ConnectCards from './components/ConnectCards'
import Footer from './components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Navbar />
      <Hero />
      <VerseOfTheDay />
      <NextService />
      <UpcomingEvents />
      <ConnectCards />
      <Footer />
    </main>
  )
}
