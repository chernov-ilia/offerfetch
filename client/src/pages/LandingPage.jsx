// Landing page.

import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import usePageTitle from '../hooks/usePageTitle';

export default function LandingPage() {
    useEffect(() => {
        const nav = document.getElementById('nav');
        const handleScroll = () => {
            nav.classList.toggle('scrolled', window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    usePageTitle("Your search. Organized.");

    return (
        <PageTransition>
            <div className="landing">

            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .landing * { box-sizing: border-box; }

        .landing {
          background: #F7F5F2;
          color: #1A1A1A;
          font-family: 'DM Sans', sans-serif;
          overflow-x: hidden;
        }

        .landing .brand { font-family: 'Unbounded', sans-serif; }

        #nav {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 48px;
          background: rgba(247, 245, 242, 0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.3s;
        }

        #nav.scrolled { border-bottom-color: #E5E5E5; }

        .nav-logo {
          font-family: 'Unbounded', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #1A1A1A;
          text-decoration: none;
          letter-spacing: -0.02em;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0; padding: 0;
        }

        .nav-links a {
          font-size: 13px;
          color: #888;
          text-decoration: none;
          transition: color 0.2s;
        }

        .nav-links a:hover { color: #1A1A1A; }

        .nav-cta {
          font-size: 13px !important;
          font-weight: 500 !important;
          color: #F7F5F2 !important;
          background: #1A1A1A;
          padding: 10px 20px;
          border-radius: 6px;
          transition: background 0.2s !important;
        }

        .nav-cta:hover { background: #333; color: #F7F5F2 !important; }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 120px 48px 80px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 28px;
          opacity: 0;
          animation: fadeUp 0.6s ease forwards;
        }

        .hero-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(42px, 7vw, 96px);
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: -0.03em;
          color: #1A1A1A;
          margin-bottom: 32px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.1s forwards;
        }

        .hero-title em { font-style: normal; color: #888; }

        .hero-sub {
          font-size: 17px;
          font-weight: 300;
          color: #888;
          max-width: 480px;
          line-height: 1.7;
          margin-bottom: 48px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.2s forwards;
        }

        .hero-actions {
          display: flex;
          align-items: center;
          gap: 20px;
          opacity: 0;
          animation: fadeUp 0.6s ease 0.3s forwards;
        }

        .btn-primary {
          font-family: 'Unbounded', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #F7F5F2;
          background: #1A1A1A;
          padding: 16px 32px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
        }

        .btn-primary:hover { background: #333; transform: translateY(-1px); }

        .btn-ghost {
          font-size: 13px;
          color: #888;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }

        .btn-ghost:hover { color: #1A1A1A; }
        .btn-ghost svg { transition: transform 0.2s; }
        .btn-ghost:hover svg { transform: translateX(3px); }

        .divider {
          width: 100%;
          height: 1px;
          background: #E5E5E5;
          max-width: 1200px;
          margin: 0 auto;
        }

        .features {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 48px;
        }

        .section-label {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #888;
          margin-bottom: 64px;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2px;
          background: #E5E5E5;
          border: 1px solid #E5E5E5;
          border-radius: 12px;
          overflow: hidden;
        }

        .feature-card {
          background: #F7F5F2;
          padding: 40px;
          transition: background 0.2s;
        }

        .feature-card:hover { background: #fff; }

        .feature-num {
          font-family: 'Unbounded', sans-serif;
          font-size: 11px;
          color: #E5E5E5;
          margin-bottom: 24px;
          letter-spacing: 0.1em;
        }

        .feature-icon { font-size: 24px; margin-bottom: 20px; }

        .feature-title {
          font-family: 'Unbounded', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #1A1A1A;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
          line-height: 1.4;
        }

        .feature-desc {
          font-size: 14px;
          color: #888;
          line-height: 1.7;
          font-weight: 300;
        }

        .how {
          max-width: 1200px;
          margin: 0 auto;
          padding: 100px 48px;
        }

        .how-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .how-steps { display: flex; flex-direction: column; gap: 0; }

        .how-step {
          display: flex;
          gap: 24px;
          padding: 28px 0;
          border-bottom: 1px solid #E5E5E5;
          transition: padding-left 0.2s;
        }

        .how-step:first-child { border-top: 1px solid #E5E5E5; }
        .how-step:hover { padding-left: 8px; }

        .step-num {
          font-family: 'Unbounded', sans-serif;
          font-size: 11px;
          color: #E5E5E5;
          width: 24px;
          flex-shrink: 0;
          padding-top: 3px;
        }

        .step-title {
          font-family: 'Unbounded', sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #1A1A1A;
          margin-bottom: 6px;
          letter-spacing: -0.01em;
        }

        .step-desc {
          font-size: 14px;
          color: #888;
          font-weight: 300;
          line-height: 1.6;
        }

        .how-visual {
          background: #1A1A1A;
          border-radius: 16px;
          padding: 40px;
          aspect-ratio: 4/5;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .visual-header { display: flex; justify-content: space-between; align-items: center; }

        .visual-logo {
          font-family: 'Unbounded', sans-serif;
          font-size: 11px;
          color: #666;
          letter-spacing: 0.05em;
        }

        .visual-badge {
          font-size: 11px;
          color: #4ade80;
          background: rgba(74, 222, 128, 0.1);
          padding: 4px 10px;
          border-radius: 20px;
          font-weight: 500;
        }

        .visual-cards { display: flex; flex-direction: column; gap: 10px; }

        .visual-card {
          background: #242424;
          border-radius: 10px;
          padding: 16px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: background 0.2s;
        }

        .visual-card:hover { background: #2a2a2a; }
        .vc-company { font-size: 12px; color: #999; margin-bottom: 3px; }

        .vc-role {
          font-family: 'Unbounded', sans-serif;
          font-size: 12px;
          color: #fff;
          letter-spacing: -0.01em;
        }

        .vc-status {
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 20px;
          font-weight: 500;
        }

        .status-applied { background: rgba(99,179,237,0.15); color: #63b3ed; }
        .status-interview { background: rgba(246,173,85,0.15); color: #f6ad55; }
        .status-offer { background: rgba(74,222,128,0.15); color: #4ade80; }
        .status-rejected { background: rgba(252,129,74,0.15); color: #fc814a; }

        .visual-footer { display: flex; gap: 20px; }
        .vf-num { font-family: 'Unbounded', sans-serif; font-size: 20px; color: #fff; font-weight: 300; }
        .vf-label { font-size: 11px; color: #555; margin-top: 2px; }

        .cta-section { max-width: 1200px; margin: 0 auto; padding: 100px 48px; }

        .cta-inner {
          background: #1A1A1A;
          border-radius: 20px;
          padding: 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 48px;
        }

        .cta-title {
          font-family: 'Unbounded', sans-serif;
          font-size: clamp(24px, 3vw, 40px);
          font-weight: 300;
          color: #fff;
          letter-spacing: -0.03em;
          line-height: 1.2;
          margin-bottom: 16px;
        }

        .cta-sub { font-size: 15px; color: #666; font-weight: 300; }

        .btn-white {
          font-family: 'Unbounded', sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #1A1A1A;
          background: #fff;
          padding: 16px 32px;
          border-radius: 8px;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          letter-spacing: 0.02em;
          white-space: nowrap;
          display: inline-block;
        }

        .btn-white:hover { background: #E8E0D5; transform: translateY(-1px); }

        .landing-footer {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid #E5E5E5;
        }

        .footer-left { display: flex; align-items: center; gap: 24px; }
        .footer-logo { font-family: 'Unbounded', sans-serif; font-size: 12px; font-weight: 600; color: #1A1A1A; text-decoration: none; }
        .footer-copy { font-size: 13px; color: #888; }

        .footer-links { display: flex; gap: 24px; list-style: none; margin: 0; padding: 0; }

        .footer-links a {
          font-size: 13px;
          color: #888;
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .footer-links a:hover { color: #1A1A1A; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 900px) {
          #nav { padding: 20px 24px; }
          .nav-links { display: none; }
          .hero { padding: 100px 24px 60px; }
          .features { padding: 60px 24px; }
          .features-grid { grid-template-columns: 1fr; }
          .how { padding: 60px 24px; }
          .how-grid { grid-template-columns: 1fr; gap: 48px; }
          .how-visual { display: none; }
          .cta-section { padding: 60px 24px; }
          .cta-inner { flex-direction: column; padding: 48px 32px; text-align: center; }
          .landing-footer { flex-direction: column; gap: 20px; padding: 32px 24px; text-align: center; }
          .footer-left { flex-direction: column; gap: 8px; }
        }
      `}</style>

            <div className="landing">
                {/* NAV */}
                <nav id="nav">
                    <a href="/" className="nav-logo brand">OfferFetch</a>
                    <ul className="nav-links">
                        <li><a href="#features">Features</a></li>
                        <li><a href="#how">How it works</a></li>
                        <li><a href="https://github.com/chernov-ilia/offerfetch" target="_blank" rel="noreferrer">GitHub</a></li>
                        <li><Link to="/register" className="nav-cta">Get started</Link></li>
                    </ul>
                </nav>

                {/* HERO */}
                <section className="hero">
                    <p className="hero-label">Job search tracker</p>
                    <h1 className="hero-title brand">
                        Your search.<br/>
                        <em>Organized.</em>
                    </h1>
                    <p className="hero-sub">
                        Track applications, resumes, and cover letters — all in one place. No spreadsheets. No chaos.
                    </p>
                    <div className="hero-actions">
                        <Link to="/register" className="btn-primary brand">Start for free</Link>
                        <a href="https://github.com/chernov-ilia/offerfetch" target="_blank" rel="noreferrer" className="btn-ghost">
                            View on GitHub
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </a>
                    </div>
                </section>

                <div className="divider" />

                {/* FEATURES */}
                <section className="features" id="features">
                    <p className="section-label">What you can do</p>
                    <div className="features-grid">
                        {[
                            { num: '01', icon: '📋', title: 'Track applications', desc: 'Log every application with company, role, salary, source, and location. See everything at a glance.' },
                            { num: '02', icon: '🔄', title: 'Status history', desc: 'Every status change is recorded with a timestamp. Know exactly where each application stands.' },
                            { num: '03', icon: '📄', title: 'Resumes & cover letters', desc: 'Attach the exact resume and cover letter you sent. Never wonder what version you used.' },
                            { num: '04', icon: '💬', title: 'Notes & comments', desc: 'Leave timestamped notes on any application. Keep the full picture in one place.' },
                            { num: '05', icon: '🏢', title: 'Company profiles', desc: 'Store company info, website, and logo alongside your applications.' },
                            { num: '06', icon: '📍', title: 'Location & work type', desc: 'Tag each role as remote, hybrid, or onsite. Filter by city and state.' },
                        ].map((f) => (
                            <div className="feature-card" key={f.num}>
                                <p className="feature-num brand">{f.num}</p>
                                <div className="feature-icon">{f.icon}</div>
                                <h3 className="feature-title brand">{f.title}</h3>
                                <p className="feature-desc">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="divider" />

                {/* HOW IT WORKS */}
                <section className="how" id="how">
                    <p className="section-label">How it works</p>
                    <div className="how-grid">
                        <div className="how-steps">
                            {[
                                { num: '01', title: 'Create an account', desc: 'Sign up in seconds. No credit card, no setup — just start tracking.' },
                                { num: '02', title: 'Add your applications', desc: 'Log each job you apply to with company, role, salary range, and where you found it.' },
                                { num: '03', title: 'Attach your documents', desc: 'Upload the resume and cover letter you used. Never lose track of what you sent.' },
                                { num: '04', title: 'Update as you go', desc: 'Move applications through statuses and leave notes along the way.' },
                            ].map((s) => (
                                <div className="how-step" key={s.num}>
                                    <span className="step-num brand">{s.num}</span>
                                    <div>
                                        <h3 className="step-title brand">{s.title}</h3>
                                        <p className="step-desc">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="how-visual">
                            <div className="visual-header">
                                <span className="visual-logo">OFFERFETCH</span>
                                <span className="visual-badge">● 4 active</span>
                            </div>
                            <div className="visual-cards">
                                {[
                                    { company: 'Stripe', role: 'Frontend Engineer', status: 'Interview', cls: 'status-interview' },
                                    { company: 'Linear', role: 'Product Designer', status: 'Applied', cls: 'status-applied' },
                                    { company: 'Vercel', role: 'DX Engineer', status: 'Offer', cls: 'status-offer' },
                                    { company: 'Notion', role: 'Full Stack Dev', status: 'Rejected', cls: 'status-rejected' },
                                ].map((c) => (
                                    <div className="visual-card" key={c.company}>
                                        <div>
                                            <p className="vc-company">{c.company}</p>
                                            <p className="vc-role brand">{c.role}</p>
                                        </div>
                                        <span className={`vc-status ${c.cls}`}>{c.status}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="visual-footer">
                                {[{ num: '12', label: 'Applications' }, { num: '3', label: 'Interviews' }, { num: '1', label: 'Offer' }].map((s) => (
                                    <div key={s.label}>
                                        <p className="vf-num brand">{s.num}</p>
                                        <p className="vf-label">{s.label}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="cta-section">
                    <div className="cta-inner">
                        <div>
                            <h2 className="cta-title brand">Ready to take control<br/>of your job search?</h2>
                            <p className="cta-sub">Free. Open source. No nonsense.</p>
                        </div>
                        <Link to="/register" className="btn-white brand">Get started free</Link>
                    </div>
                </section>

                {/* FOOTER */}
                <footer className="landing-footer">
                    <div className="footer-left">
                        <a href="/" className="footer-logo brand">OfferFetch</a>
                        <span className="footer-copy">Built by Ilia Chernov</span>
                    </div>
                    <ul className="footer-links">
                        <li>
                            <a href="https://github.com/chernov-ilia/offerfetch" target="_blank" rel="noreferrer">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                                </svg>
                                GitHub
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/chernov-ilia/" target="_blank" rel="noreferrer">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                LinkedIn
                            </a>
                        </li>
                    </ul>
                </footer>
            </div>
            </div>
        </PageTransition>
    );
}