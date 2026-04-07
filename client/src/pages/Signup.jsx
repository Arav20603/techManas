import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'child' })
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/')
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSignup = async () => {
    try {
      // const res = await fetch('http://localhost:5000/api/auth/register', {
      const res = await fetch('https://techmanas.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) { alert(data.message); return }
      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))
      navigate('/')
    } catch {
      alert('Error signing up')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-sm space-y-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-soft">
        {/* Brand */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-blue">TechManas</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Create your account</p>
        </div>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">Full Name</label>
            <input
              name="name"
              placeholder="Your name"
              className="input-base"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">Email</label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              className="input-base"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="input-base"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-300">Role</label>
            <select name="role" className="input-base" onChange={handleChange}>
              <option value="child">Child</option>
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSignup}
          className="w-full rounded-xl bg-gradient-to-r from-brand-teal to-emerald-500 py-2.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal"
        >
          Create Account
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-brand-blue hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
