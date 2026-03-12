// Dashboard page.
// Shows list of all job applications.

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';
import { getApplications } from '../api/applications';
import usePageTitle from '../hooks/usePageTitle';
import PageTransition from '../components/PageTransition';
import { useNavigate } from 'react-router-dom';
import NewApplicationModal from '../components/NewApplicationModal';


const STATUS_COLORS = {
    'Wishlist':     { bg: '#F5F5F5', text: '#888' },
    'Applied':      { bg: 'rgba(99,179,237,0.12)', text: '#63b3ed' },
    'Phone Screen': { bg: 'rgba(246,173,85,0.12)', text: '#f6ad55' },
    'Interview':    { bg: 'rgba(246,173,85,0.15)', text: '#ed8936' },
    'Offer':        { bg: 'rgba(74,222,128,0.12)', text: '#4ade80' },
    'Rejected':     { bg: 'rgba(252,129,74,0.12)', text: '#fc814a' },
    'Withdrawn':    { bg: '#F5F5F5', text: '#aaa' },
};

export default function DashboardPage() {
    usePageTitle('Dashboard');
    const { logout } = useAuth();
    const [search, setSearch] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const { data: applications = [], isLoading } = useQuery({
        queryKey: ['applications'],
        queryFn: () => getApplications().then(r => r.data),
    });

    const filtered = applications.filter(app =>
        app.title.toLowerCase().includes(search.toLowerCase()) ||
        app.company.companyName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <PageTransition>
            <div style={{ minHeight: '100vh', background: '#F7F5F2', fontFamily: "'DM Sans', sans-serif" }}>

                {/* NAV */}
                <nav style={{
                    position: 'sticky', top: 0, zIndex: 100,
                    background: 'rgba(247,245,242,0.92)', backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid #E5E5E5',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '0 48px', height: 64,
                }}>
          <span style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em' }}>
            OfferFetch
          </span>
                    <button
                        onClick={logout}
                        style={{
                            background: 'none', border: '1px solid #E5E5E5', borderRadius: 6,
                            padding: '8px 16px', fontSize: 13, color: '#888', cursor: 'pointer',
                            transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.target.style.borderColor = '#1A1A1A'; e.target.style.color = '#1A1A1A'; }}
                        onMouseLeave={e => { e.target.style.borderColor = '#E5E5E5'; e.target.style.color = '#888'; }}
                    >
                        Sign out
                    </button>
                </nav>

                <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 48px' }}>

                    {/* HEADER */}
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
                        <div>
                            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#888', marginBottom: 8, fontWeight: 500 }}>
                                Your applications
                            </p>
                            <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 32, fontWeight: 300, letterSpacing: '-0.03em', color: '#1A1A1A' }}>
                                Dashboard
                            </h1>
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            style={{
                                fontFamily: "'Unbounded', sans-serif",
                                fontSize: 12, fontWeight: 500,
                                background: '#1A1A1A', color: '#F7F5F2',
                                border: 'none', borderRadius: 8,
                                padding: '14px 24px', cursor: 'pointer',
                                letterSpacing: '0.02em',
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={e => e.target.style.background = '#333'}
                            onMouseLeave={e => e.target.style.background = '#1A1A1A'}
                        >
                            + New application
                        </button>


                    </div>

                    {/* STATS */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: '#E5E5E5', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
                        {[
                            { label: 'Total', value: applications.length },
                            { label: 'Active', value: applications.filter(a => !['Rejected', 'Withdrawn', 'Offer'].includes(a.currentStatus?.statusName)).length },
                            { label: 'Interviews', value: applications.filter(a => ['Interview', 'Phone Screen'].includes(a.currentStatus?.statusName)).length },
                            { label: 'Offers', value: applications.filter(a => a.currentStatus?.statusName === 'Offer').length },
                        ].map((stat) => (
                            <div key={stat.label} style={{ background: '#F7F5F2', padding: '24px 28px' }}>
                                <p style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 28, fontWeight: 300, color: '#1A1A1A', letterSpacing: '-0.03em' }}>
                                    {stat.value}
                                </p>
                                <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{stat.label}</p>
                            </div>
                        ))}
                    </div>

                    {/* SEARCH */}
                    <div style={{ marginBottom: 24 }}>
                        <input
                            type="text"
                            placeholder="Search by role or company..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            style={{
                                width: '100%', maxWidth: 360,
                                padding: '12px 16px',
                                background: '#fff', border: '1px solid #E5E5E5',
                                borderRadius: 8, fontSize: 14, color: '#1A1A1A',
                                outline: 'none', transition: 'border-color 0.2s',
                                fontFamily: "'DM Sans', sans-serif",
                            }}
                            onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                            onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                        />
                    </div>

                    {/* TABLE */}
                    {isLoading ? (
                        <p style={{ color: '#888', fontSize: 14 }}>Loading...</p>
                    ) : filtered.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '80px 0' }}>
                            <p style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 16, fontWeight: 300, color: '#1A1A1A', marginBottom: 8 }}>
                                No applications yet
                            </p>
                            <p style={{ fontSize: 14, color: '#888' }}>Add your first application to get started</p>
                        </div>
                    ) : (
                        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E5E5', overflow: 'hidden' }}>
                            {/* Table header */}
                            <div style={{
                                display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                                padding: '12px 24px', borderBottom: '1px solid #E5E5E5',
                                fontSize: 11, fontWeight: 500, color: '#888',
                                letterSpacing: '0.1em', textTransform: 'uppercase',
                            }}>
                                <span>Role</span>
                                <span>Company</span>
                                <span>Status</span>
                                <span>Type</span>
                                <span>Date</span>
                            </div>

                            {/* Rows */}
                            {filtered.map((app, i) => {
                                const statusColor = STATUS_COLORS[app.currentStatus?.statusName] || STATUS_COLORS['Wishlist'];
                                return (
                                    <div
                                        key={app.id}
                                        onClick={() => navigate(`/applications/${app.id}`)}
                                        style={{
                                            display: 'grid', gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1fr',
                                            padding: '18px 24px',
                                            borderBottom: i < filtered.length - 1 ? '1px solid #F0F0F0' : 'none',
                                            alignItems: 'center', cursor: 'pointer',
                                            transition: 'background 0.15s',
                                        }}
                                        onMouseEnter={e => e.currentTarget.style.background = '#FAFAFA'}
                                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}

                                    >
                    <span style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 13, fontWeight: 500, color: '#1A1A1A', letterSpacing: '-0.01em' }}>
                      {app.title}
                    </span>
                                        <span style={{ fontSize: 13, color: '#555' }}>
                      {app.company?.companyName}
                    </span>
                                        <span>
                      <span style={{
                          fontSize: 11, fontWeight: 500,
                          padding: '4px 10px', borderRadius: 20,
                          background: statusColor.bg, color: statusColor.text,
                      }}>
                        {app.currentStatus?.statusName}
                      </span>
                    </span>
                                        <span style={{ fontSize: 13, color: '#888' }}>
                      {app.workType?.workTypeName || '—'}
                    </span>
                                        <span style={{ fontSize: 13, color: '#888' }}>
                      {new Date(app.dateCreated).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
                {showModal && <NewApplicationModal onClose={() => setShowModal(false)} />}
            </div>
        </PageTransition>
    );
}