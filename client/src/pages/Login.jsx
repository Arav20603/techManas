import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/')
  }, [])

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleLogin = async () => {
    try {
      const res = await fetch('https://aravportfolio.onrender.com/api/auth/login', {
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
      alert('Error logging in')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-sm space-y-5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-8 shadow-soft">
        {/* Logo / brand */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-brand-blue">TechManas</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Sign in to your account</p>
        </div>

        <div className="space-y-3">
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
        </div>

        <button
          onClick={handleLogin}
          className="w-full rounded-xl bg-gradient-to-r from-brand-blue to-brand-teal py-2.5 text-sm font-semibold text-white shadow-soft transition hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue"
        >
          Login
        </button>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400">
          Don't have an account?{' '}
          <Link to="/signup" className="font-semibold text-brand-blue hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
