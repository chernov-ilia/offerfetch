// Application detail page.
// Shows full application info, status history and comments.

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getApplication, updateApplication } from '../api/applications';
import { getComments, createComment, deleteComment } from '../api/comments';
import usePageTitle from '../hooks/usePageTitle';
import PageTransition from '../components/PageTransition';

const STATUS_COLORS = {
    'Wishlist':     { bg: '#F5F5F5', text: '#888' },
    'Applied':      { bg: 'rgba(99,179,237,0.12)', text: '#63b3ed' },
    'Phone Screen': { bg: 'rgba(246,173,85,0.12)', text: '#f6ad55' },
    'Interview':    { bg: 'rgba(246,173,85,0.15)', text: '#ed8936' },
    'Offer':        { bg: 'rgba(74,222,128,0.12)', text: '#4ade80' },
    'Rejected':     { bg: 'rgba(252,129,74,0.12)', text: '#fc814a' },
    'Withdrawn':    { bg: '#F5F5F5', text: '#aaa' },
};

const STATUSES = [
    { id: 1, name: 'Wishlist' },
    { id: 2, name: 'Applied' },
    { id: 3, name: 'Phone Screen' },
    { id: 4, name: 'Interview' },
    { id: 5, name: 'Offer' },
    { id: 6, name: 'Rejected' },
    { id: 7, name: 'Withdrawn' },
];

const inputStyle = {
    width: '100%', padding: '11px 14px',
    background: '#F7F5F2', border: '1px solid #E5E5E5',
    borderRadius: 8, fontSize: 14, color: '#1A1A1A',
    outline: 'none', fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s', resize: 'vertical',
};

export default function ApplicationPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [comment, setComment] = useState('');

    usePageTitle('Application');

    const { data: app, isLoading } = useQuery({
        queryKey: ['application', id],
        queryFn: () => getApplication(id).then(r => r.data),
    });

    const { data: comments = [] } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => getComments(id).then(r => r.data),
    });

    const updateStatus = useMutation({
        mutationFn: (statusId) => updateApplication(id, { currentStatusId: statusId }),
        onSuccess: () => {
            queryClient.invalidateQueries(['application', id]);
            queryClient.invalidateQueries(['applications']);
        },
    });

    const addComment = useMutation({
        mutationFn: () => createComment(id, { body: comment }),
        onSuccess: () => {
            queryClient.invalidateQueries(['comments', id]);
            setComment('');
        },
    });

    const removeComment = useMutation({
        mutationFn: (commentId) => deleteComment(id, commentId),
        onSuccess: () => queryClient.invalidateQueries(['comments', id]),
    });

    if (isLoading) return (
        <div style={{ minHeight: '100vh', background: '#F7F5F2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#888', fontSize: 14 }}>Loading...</p>
        </div>
    );

    if (!app) return null;

    const statusColor = STATUS_COLORS[app.currentStatus?.statusName] || STATUS_COLORS['Wishlist'];

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
                    <button
                        onClick={() => navigate('/dashboard')}
                        style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', gap: 8,
                            fontSize: 13, color: '#888', transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = '#1A1A1A'}
                        onMouseLeave={e => e.currentTarget.style.color = '#888'}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Dashboard
                    </button>
                    <span style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 14, fontWeight: 600, letterSpacing: '-0.02em' }}>
            OfferFetch
          </span>
                    <div style={{ width: 80 }} />
                </nav>

                <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 48px' }}>

                    {/* HEADER */}
                    <div style={{ marginBottom: 40 }}>
                        <p style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>
                            {app.company?.companyName}
                        </p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                            <h1 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 28, fontWeight: 300, letterSpacing: '-0.03em', color: '#1A1A1A' }}>
                                {app.title}
                            </h1>
                            <span style={{
                                fontSize: 12, fontWeight: 500, padding: '6px 14px',
                                borderRadius: 20, background: statusColor.bg, color: statusColor.text,
                                whiteSpace: 'nowrap',
                            }}>
                {app.currentStatus?.statusName}
              </span>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 24 }}>

                        {/* LEFT */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                            {/* Details */}
                            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E5E5', padding: 28 }}>
                                <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 13, fontWeight: 500, color: '#1A1A1A', marginBottom: 20, letterSpacing: '-0.01em' }}>
                                    Details
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                                    {[
                                        { label: 'Work type', value: app.workType?.workTypeName || '—' },
                                        { label: 'Source', value: app.source || '—' },
                                        { label: 'Salary', value: app.salaryMin ? `$${app.salaryMin.toLocaleString()} — $${app.salaryMax?.toLocaleString()}` : '—' },
                                        { label: 'Applied', value: new Date(app.dateCreated).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
                                    ].map(item => (
                                        <div key={item.label}>
                                            <p style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4, fontWeight: 500 }}>{item.label}</p>
                                            <p style={{ fontSize: 14, color: '#1A1A1A' }}>{item.value}</p>
                                        </div>
                                    ))}
                                </div>
                                {app.appUrl && (
                                    <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid #F0F0F0' }}>
                                        <a href={app.appUrl} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: '#63b3ed', textDecoration: 'none' }}>
                                            View job posting →
                                        </a>
                                    </div>
                                )}
                            </div>

                            {/* Comments */}
                            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E5E5', padding: 28 }}>
                                <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 13, fontWeight: 500, color: '#1A1A1A', marginBottom: 20, letterSpacing: '-0.01em' }}>
                                    Notes
                                </h2>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
                  <textarea
                      style={{ ...inputStyle, minHeight: 80 }}
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Add a note..."
                      onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                      onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                  />
                                    <button
                                        onClick={() => comment.trim() && addComment.mutate()}
                                        disabled={!comment.trim() || addComment.isPending}
                                        style={{
                                            alignSelf: 'flex-end',
                                            fontFamily: "'Unbounded', sans-serif",
                                            fontSize: 11, fontWeight: 500,
                                            background: '#1A1A1A', color: '#F7F5F2',
                                            border: 'none', borderRadius: 6,
                                            padding: '10px 18px', cursor: 'pointer',
                                            letterSpacing: '0.02em', opacity: !comment.trim() ? 0.4 : 1,
                                            transition: 'background 0.2s',
                                        }}
                                        onMouseEnter={e => { if (comment.trim()) e.target.style.background = '#333'; }}
                                        onMouseLeave={e => e.target.style.background = '#1A1A1A'}
                                    >
                                        Add note
                                    </button>
                                </div>

                                {comments.length === 0 ? (
                                    <p style={{ fontSize: 13, color: '#aaa' }}>No notes yet</p>
                                ) : (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                        {comments.map(c => (
                                            <div key={c.id} style={{ padding: '14px 16px', background: '#F7F5F2', borderRadius: 8, position: 'relative' }}>
                                                <p style={{ fontSize: 14, color: '#1A1A1A', lineHeight: 1.6, marginBottom: 6 }}>{c.body}</p>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <p style={{ fontSize: 11, color: '#aaa' }}>
                                                        {new Date(c.dateCreated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                    <button
                                                        onClick={() => removeComment.mutate(c.id)}
                                                        style={{ background: 'none', border: 'none', fontSize: 11, color: '#ccc', cursor: 'pointer', transition: 'color 0.2s' }}
                                                        onMouseEnter={e => e.target.style.color = '#fc814a'}
                                                        onMouseLeave={e => e.target.style.color = '#ccc'}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                            {/* Update status */}
                            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E5E5', padding: 28 }}>
                                <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 13, fontWeight: 500, color: '#1A1A1A', marginBottom: 16, letterSpacing: '-0.01em' }}>
                                    Update status
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {STATUSES.map(s => {
                                        const isActive = app.currentStatus?.statusName === s.name;
                                        const color = STATUS_COLORS[s.name];
                                        return (
                                            <button
                                                key={s.id}
                                                onClick={() => !isActive && updateStatus.mutate(s.id)}
                                                style={{
                                                    width: '100%', padding: '10px 14px',
                                                    background: isActive ? color.bg : 'transparent',
                                                    border: `1px solid ${isActive ? 'transparent' : '#F0F0F0'}`,
                                                    borderRadius: 8, cursor: isActive ? 'default' : 'pointer',
                                                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                                    transition: 'all 0.15s',
                                                }}
                                                onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = '#F7F5F2'; }}
                                                onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
                                            >
                        <span style={{ fontSize: 13, color: isActive ? color.text : '#555', fontWeight: isActive ? 500 : 400 }}>
                          {s.name}
                        </span>
                                                {isActive && <span style={{ fontSize: 10, color: color.text }}>●</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Status history */}
                            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E5E5', padding: 28 }}>
                                <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 13, fontWeight: 500, color: '#1A1A1A', marginBottom: 16, letterSpacing: '-0.01em' }}>
                                    History
                                </h2>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                    {app.updates?.map(u => {
                                        const color = STATUS_COLORS[u.status?.statusName] || STATUS_COLORS['Wishlist'];
                                        return (
                                            <div key={u.id} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                                                <div style={{ width: 8, height: 8, borderRadius: '50%', background: color.text, marginTop: 5, flexShrink: 0 }} />
                                                <div>
                                                    <p style={{ fontSize: 13, color: '#1A1A1A', fontWeight: 500 }}>{u.status?.statusName}</p>
                                                    <p style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>
                                                        {new Date(u.dateUpdated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                    </p>
                                                    {u.description && <p style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{u.description}</p>}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </PageTransition>
    );
}