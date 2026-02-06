'use client'

import { FC, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface AuthFormProps {
  mode: 'login' | 'register'
}

export const AuthForm: FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (mode === 'register') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        // Show success message for email confirmation
        setError('Check your email to confirm your account')
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        router.push('/')
        router.refresh()
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div
          className={`p-3 rounded-md text-sm ${
            error.includes('Check your email')
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}
        >
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-4 bg-indigo-600 text-white rounded-md font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading && <Loader2 className="animate-spin" size={18} />}
        {mode === 'register' ? 'Create Account' : 'Sign In'}
      </button>
    </form>
  )
}
