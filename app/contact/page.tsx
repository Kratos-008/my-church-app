'use client';

import Link from 'next/link';
import { useState } from 'react';

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
        <h1 className="mx-auto font-semibold">❤️ Contact Us</h1>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-center mb-2">Get in Touch</h2>
        <p className="text-center mb-10">We'd love to hear from you! Reach out to us with any questions, prayer requests, or if you'd like to visit our church.</p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="bg-gray-50 border rounded-xl p-6 mb-10 shadow">
          <h3 className="font-semibold mb-4">📩 Send us a Message</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              required
              placeholder="Your full name"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              required
              placeholder="your.email@example.com"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Your phone number"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={handleChange}
            />
            <input
              type="text"
              name="subject"
              placeholder="What is this about?"
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell us how we can help you..."
            className="w-full border border-gray-300 p-2 rounded mt-4 focus:outline-none focus:ring-2 focus:ring-orange-400"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
            Send Message
          </button>
        </form>

        {/* Visit Info */}
        <div className="bg-gray-50 border rounded-xl p-6 mb-6 shadow">
          <h3 className="font-semibold mb-2">📍 Visit Us</h3>
          <p>You're always welcome at our church!</p>
          <p className="mt-2"><strong>Church Address:</strong> Purk 7 Punta Nursery, Masbate City, Masbate</p>
          <p className="mt-2"><strong>Service Times:</strong><br />
            Sunday: 7:30 AM<br />
            Training: Sunday 7:00 PM<br />
            Youth Fellowship: Saturday 4:00 PM
          </p>
        </div>

        {/* Contact Info */}
        <div className="bg-gray-50 border rounded-xl p-6 mb-6 shadow">
          <h3 className="font-semibold mb-2">📞 Contact Information</h3>
          <p><strong>Phone:</strong> +63 (56) 333-1234</p>
          <p><strong>Email:</strong> info@masbategoodnewsbaptist.com</p>
          <p><strong>Follow Us:</strong> Masbate Good News Baptist Church</p>
        </div>



        <div className="bg-gray-50 border rounded-xl p-6 mb-6 shadow">
          <h3 className="text-lg font-semibold mb-2">🙏 Need Prayer?</h3>
          <p className="text-gray-600 mb-4">
           If you need prayer support, we're here for you. Submit a prayer request or speak with one of our pastors.
          </p>
          <Link href="/prayer">
          <button
            type="submit"
            className="mt-4 w-full bg-black shadow text-white py-2 rounded hover:bg-gray-800"
          >
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
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
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
    </div>
  );
}
