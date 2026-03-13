import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import usePageTitle from "../hooks/usePageTitle.js";

export default function NotFoundPage() {
  const navigate = useNavigate()

  usePageTitle("404 Not found")

  return (
      <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="min-h-screen flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-8xl font-bold font-unbounded mb-4">404</h1>
        <p className="text-xl text-gray-500 mb-8">Page not found</p>
        <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Go Home
        </button>
      </motion.div>
  )
}