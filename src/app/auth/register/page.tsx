import Link from 'next/link'
import { AuthForm } from '@/components/auth/AuthForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-600 mt-2">Get started with the page builder</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <AuthForm mode="register" />

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
