// Login page.

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as authApi from '../api/auth';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await authApi.login({ email, password });
            login(response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F7F5F2] flex">
            {/* Left panel */}
            <div className="hidden lg:flex w-1/2 bg-[#1A1A1A] flex-col justify-between p-16">
                <div>
          <span className="brand text-white text-lg font-semibold tracking-tight">
            OfferFetch
          </span>
                </div>
                <div>
                    <p className="text-[#666] text-sm uppercase tracking-widest mb-4 font-medium">
                        Your job search
                    </p>
                    <h2 className="brand text-white text-4xl font-light leading-tight">
                        Track every<br />
                        application.<br />
                        <span className="text-[#E8E0D5]">Stay in control.</span>
                    </h2>
                </div>
                <div className="flex gap-6">
                    <div>
                        <p className="brand text-white text-2xl font-semibold">100%</p>
                        <p className="text-[#666] text-xs mt-1">Free forever</p>
                    </div>
                    <div>
                        <p className="brand text-white text-2xl font-semibold">∞</p>
                        <p className="text-[#666] text-xs mt-1">Applications</p>
                    </div>
                </div>
            </div>

            {/* Right panel */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">

                    <div className="lg:hidden mb-10">
                        <span className="brand text-[#1A1A1A] text-lg font-semibold">OfferFetch</span>
                    </div>

                    <h1 className="brand text-2xl font-semibold text-[#1A1A1A] mb-1">
                        Welcome back
                    </h1>
                    <p className="text-[#888] text-sm mb-8">
                        Sign in to your account
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                                Email
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                                className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#1A1A1A] placeholder-[#BDBDBD] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#1A1A1A] placeholder-[#BDBDBD] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#1A1A1A] text-white text-sm font-medium rounded-lg hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#888] mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-[#1A1A1A] font-medium underline underline-offset-2">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}