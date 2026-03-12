// Register page.

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import * as authApi from '../api/auth';
import usePageTitle from "../hooks/usePageTitle.js";

export default function RegisterPage() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
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
            await authApi.register({ firstName, lastName, email, password });
            const response = await authApi.login({ email, password });
            login(response.data.token);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    usePageTitle("Account registration");

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
                        Get started
                    </p>
                    <h2 className="brand text-white text-4xl font-light leading-tight">
                        One place for<br />
                        every offer.<br />
                        <span className="text-[#E8E0D5]">Zero chaos.</span>
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
                        Create account
                    </h1>
                    <p className="text-[#888] text-sm mb-8">
                        Start tracking your applications
                    </p>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-lg mb-6">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex gap-3">
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                                    First name
                                </label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    placeholder="John"
                                    className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#1A1A1A] placeholder-[#BDBDBD] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                                />
                            </div>
                            <div className="flex-1">
                                <label className="block text-sm font-medium text-[#1A1A1A] mb-1.5">
                                    Last name
                                </label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    placeholder="Doe"
                                    className="w-full px-4 py-3 bg-white border border-[#E5E5E5] rounded-lg text-sm text-[#1A1A1A] placeholder-[#BDBDBD] focus:outline-none focus:border-[#1A1A1A] transition-colors"
                                />
                            </div>
                        </div>

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
                            {loading ? 'Creating account...' : 'Create account'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-[#888] mt-6">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#1A1A1A] font-medium underline underline-offset-2">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}