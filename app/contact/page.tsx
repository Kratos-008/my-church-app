'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import { FaHandsPraying, FaFacebookF } from 'react-icons/fa6';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Your message has been sent!');
  };

  return (
    <div className="bg-white text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white p-4 flex items-center">
        <a href="/" className="text-sm">&larr; Back to Home</a>
        <h1 className="text-2xl md:text-3xl font-semibold mx-auto">❤️ Contact Us</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Get in Touch</h2>
        <p className="text-center mb-10">
          We’d love to hear from you! Reach out to us with any questions, prayer requests, or if you’d like to visit our church.
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-6 mb-10 shadow">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <span>✈️</span> Send us a Message
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" name="name" required placeholder="Your full name"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={handleChange} />
            <input type="email" name="email" required placeholder="your.email@example.com"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={handleChange} />
            <input type="text" name="phone" placeholder="Your phone number"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={handleChange} />
            <input type="text" name="subject" placeholder="What is this about?"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={handleChange} />
          </div>
          <textarea name="message" required rows={5} placeholder="Tell us how we can help you..."
            className="w-full border border-gray-300 p-2 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={handleChange} />
          <button type="submit" className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Send Message
          </button>
        </form>

        {/* Visit Us */}
        <div className="bg-gray-50 border rounded-xl p-6 mb-6 shadow">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-red-500" /> Visit Us
          </h3>
          <p>You're always welcome at our church!</p>
          <p className="mt-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            <strong>Church Address:</strong> Purk 7 Punta Nursery, Masbate City, Masbate
          </p>
          <p className="mt-2 flex items-start gap-2">
            <Clock className="w-4 h-4 text-gray-500 mt-1" />
            <span>
              <strong>Service Times:</strong><br />
              Sunday: 7:30 AM<br />
              Training: Sunday 7:00 PM<br />
              Youth Fellowship: Saturday 4:00 PM
            </span>
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 border rounded-xl p-6 mb-6 shadow">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <Phone className="w-5 h-5 text-green-500" /> Contact Information
          </h3>
          <p className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gray-500" /> +63 (56) 333-1234
          </p>
          <p className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gray-500" /> info@masbategoodnewsbaptist.com
          </p>
          <p className="flex items-center gap-2">
            <FaFacebookF className="w-4 h-4 text-blue-600" /> Masbate Good News Baptist Church
          </p>
        </div>

        {/* Need Prayer */}
        <div className="bg-gray-50 border rounded-xl p-6 mb-6 shadow">
          <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
            <FaHandsPraying className="w-5 h-5 text-purple-500" /> Need Prayer?
          </h3>
          <p className="text-gray-600 mb-4">
            If you need prayer support, we're here for you. Submit a prayer request or speak with one of our pastors.
          </p>
          <Link href="/prayer">
            <button className="mt-4 w-full bg-black shadow text-white py-2 rounded hover:bg-gray-800">
              Submit Prayer Request
            </button>
          </Link>
        </div>

        {/* Map */}
        <div className="mb-10">
          <h3 className="text-xl font-bold mb-2 text-center">Find Us on the Map</h3>
          <div className="w-full h-[300px]">
            <iframe
              src="https://www.google.com/maps?q=9JFP%4J9%2C+Nursery+Blvd%2C+Masbate+City%2C+Masbate&output=embed"
              width="100%" height="100%" allowFullScreen loading="lazy"
              className="rounded-xl border shadow"
            ></iframe>
          </div>
        </div>

        {/* Getting Here */}
        <div className="bg-gray-50 border rounded-xl p-6 mb-10 shadow">
          <h3 className="text-xl font-bold mb-4 text-center">Getting Here</h3>
          <div className="space-y-2 text-sm">
            <p>🔵 Head to Masbate City center and locate the main public market.</p>
            <p>🔵 From the market, head towards Punta Nursery area.</p>
            <p>🔵 Look for Purk 7 signage – our church is located in this barangay.</p>
            <p>🔵 Ask locals for "Masbate Good News Baptist Church" – we’re well known in the community!</p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-center py-10">
        <h3 className="text-2xl font-bold mb-2">We'd Love to Meet You!</h3>
        <p className="mb-4">Come visit us this Sunday or contact us anytime. Our church family is excited to welcome you!</p>
        <div className="flex justify-center gap-4">
          <Link href='/services' className="bg-white text-black font-semibold px-4 py-2 rounded">View Service Times</Link>
          <Link href='/' className="bg-white text-black font-semibold px-4 py-2 rounded">Back to Home </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-10">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          <div>
            <h4 className="font-bold">Masbate Good News Baptist Church</h4>
            <p className="text-sm mt-2">Faithfully serving the Masbate community with love and dedication.</p>
          </div>
          <div>
            <h4 className="font-bold">Quick Links</h4>
            <ul className="text-sm mt-2 space-y-1">
              <li>Events</li>
              <li>Services</li>
              <li>Volunteer</li>
              <li>Give</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold">Contact Info</h4>
            <p className="text-sm mt-2">Purok 7 Punta Nursery, Masbate City</p>
            <p className="text-sm">+63 (56) 333-1234</p>
            <p className="text-sm">info@masbategoodnewsbaptist.com</p>
          </div>
        </div>
        <div className="text-center text-xs mt-8">
          © 2024 Masbate Good News Baptist Church. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
