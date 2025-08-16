'use client'

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { LogIn, Heart } from "lucide-react"

export default function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    })

    setLoading(false)

    if (res?.ok) {
      toast.success("Signed in successfully")
      router.push("/admin")
    } else {
      toast.error("Invalid credentials. Please try again.")
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-[#1a1a1a]">
      <div className="relative box">
        <div className="relative z-10 bg-[#1f1f1f] p-8 rounded-2xl shadow-lg w-80 text-center">
          {/* Icon + Title */}
          <div className="flex items-center justify-center gap-2 mb-6 text-pink-500">
            <LogIn className="w-5 h-5" />
            <span className="text-white text-lg font-bold tracking-wider">LOGIN</span>
            <Heart className="w-5 h-5" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full rounded-full border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none focus:border-pink-500"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full rounded-full border border-gray-400 bg-transparent px-4 py-2 text-white focus:outline-none focus:border-pink-500"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>

      {/* Neon Glow Styles */}
      <style jsx>{`
        .box::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 15px 50px #000);
          border-radius: 20px;
          animation: rotating 4s linear infinite;
          animation-delay: -1s;
          background: linear-gradient(45deg, #ff0057, #00fff7, #ff0057);
          background-size: 200% 200%;
          z-index: 0;
        }
        .box::after {
          content: "";
          position: absolute;
          inset: 4px;
          background: #2d2d39;
          border-radius: 15px;
          border: 8px solid #25252b;
          z-index: 0;
        }
        @keyframes rotating {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  )
}
