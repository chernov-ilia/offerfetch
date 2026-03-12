// Modal for creating a new application.

import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createApplication } from '../api/applications';
import { getCompanies, createCompany } from '../api/companies';
import { motion, AnimatePresence } from 'framer-motion';

export default function NewApplicationModal({ onClose }) {
    const queryClient = useQueryClient();

    const [title, setTitle] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [newCompanyName, setNewCompanyName] = useState('');
    const [isNewCompany, setIsNewCompany] = useState(false);
    const [currentStatusId, setCurrentStatusId] = useState(2); // Applied by default
    const [workTypeId, setWorkTypeId] = useState('');
    const [salaryMin, setSalaryMin] = useState('');
    const [salaryMax, setSalaryMax] = useState('');
    const [source, setSource] = useState('');
    const [appUrl, setAppUrl] = useState('');

    const { data: companies = [] } = useQuery({
        queryKey: ['companies'],
        queryFn: () => getCompanies().then(r => r.data),
    });

    const mutation = useMutation({
        mutationFn: async (data) => {
            let finalCompanyId = data.companyId;

            if (isNewCompany && newCompanyName) {
                const res = await createCompany({ companyName: newCompanyName });
                finalCompanyId = res.data.id;
            }

            return createApplication({ ...data, companyId: finalCompanyId });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['applications']);
            queryClient.invalidateQueries(['companies']);
            onClose();
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            title,
            companyId: Number(companyId),
            currentStatusId: Number(currentStatusId),
            workTypeId: workTypeId ? Number(workTypeId) : null,
            salaryMin: salaryMin ? Number(salaryMin) : null,
            salaryMax: salaryMax ? Number(salaryMax) : null,
            source: source || null,
            appUrl: appUrl || null,
        });
    };

    const inputStyle = {
        width: '100%', padding: '11px 14px',
        background: '#F7F5F2', border: '1px solid #E5E5E5',
        borderRadius: 8, fontSize: 14, color: '#1A1A1A',
        outline: 'none', fontFamily: "'DM Sans', sans-serif",
        transition: 'border-color 0.2s',
    };

    const labelStyle = {
        display: 'block', fontSize: 12, fontWeight: 500,
        color: '#1A1A1A', marginBottom: 6,
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                style={{
                    position: 'fixed', inset: 0, zIndex: 200,
                    background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: 24,
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.97 }}
                    transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    onClick={e => e.stopPropagation()}
                    style={{
                        background: '#fff', borderRadius: 16,
                        padding: 40, width: '100%', maxWidth: 520,
                        maxHeight: '90vh', overflowY: 'auto',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                        <h2 style={{ fontFamily: "'Unbounded', sans-serif", fontSize: 18, fontWeight: 500, letterSpacing: '-0.02em', color: '#1A1A1A' }}>
                            New application
                        </h2>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: 20, color: '#888', cursor: 'pointer', lineHeight: 1 }}>
                            ×
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

                        {/* Role */}
                        <div>
                            <label style={labelStyle}>Job title *</label>
                            <input
                                style={inputStyle}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder="e.g. Frontend Engineer"
                                required
                                onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                                onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                            />
                        </div>

                        {/* Company */}
                        <div>
                            <label style={labelStyle}>Company *</label>
                            {!isNewCompany ? (
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <select
                                        style={{ ...inputStyle, flex: 1 }}
                                        value={companyId}
                                        onChange={e => setCompanyId(e.target.value)}
                                        onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                                        onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                                    >
                                        <option value="">Select company</option>
                                        {companies.map(c => (
                                            <option key={c.id} value={c.id}>{c.companyName}</option>
                                        ))}
                                    </select>
                                    <button
                                        type="button"
                                        onClick={() => setIsNewCompany(true)}
                                        style={{
                                            padding: '11px 14px', background: 'none',
                                            border: '1px solid #E5E5E5', borderRadius: 8,
                                            fontSize: 13, color: '#888', cursor: 'pointer',
                                            whiteSpace: 'nowrap', transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={e => { e.target.style.borderColor = '#1A1A1A'; e.target.style.color = '#1A1A1A'; }}
                                        onMouseLeave={e => { e.target.style.borderColor = '#E5E5E5'; e.target.style.color = '#888'; }}
                                    >
                                        + New
                                    </button>
                                </div>
                            ) : (
                                <div style={{ display: 'flex', gap: 8 }}>
                                    <input
                                        style={{ ...inputStyle, flex: 1 }}
                                        value={newCompanyName}
                                        onChange={e => setNewCompanyName(e.target.value)}
                                        placeholder="Company name"
                                        autoFocus
                                        onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                                        onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setIsNewCompany(false)}
                                        style={{
                                            padding: '11px 14px', background: 'none',
                                            border: '1px solid #E5E5E5', borderRadius: 8,
                                            fontSize: 13, color: '#888', cursor: 'pointer',
                                            transition: 'all 0.2s',
                                        }}
                                        onMouseEnter={e => { e.target.style.borderColor = '#1A1A1A'; e.target.style.color = '#1A1A1A'; }}
                                        onMouseLeave={e => { e.target.style.borderColor = '#E5E5E5'; e.target.style.color = '#888'; }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Status + Work type */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Status *</label>
                                <select
                                    style={inputStyle}
                                    value={currentStatusId}
                                    onChange={e => setCurrentStatusId(e.target.value)}
                                    onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                                    onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                                >
                                    <option value={1}>Wishlist</option>
                                    <option value={2}>Applied</option>
                                    <option value={3}>Phone Screen</option>
                                    <option value={4}>Interview</option>
                                    <option value={5}>Offer</option>
                                    <option value={6}>Rejected</option>
                                    <option value={7}>Withdrawn</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Work type</label>
                                <select
                                    style={inputStyle}
                                    value={workTypeId}
                                    onChange={e => setWorkTypeId(e.target.value)}
                                    onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                                    onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                                >
                                    <option value="">Not specified</option>
                                    <option value={1}>Remote</option>
                                    <option value={2}>Hybrid</option>
                                    <option value={3}>Onsite</option>
                                </select>
                            </div>
                        </div>

                        {/* Salary */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={labelStyle}>Salary min</label>
                                <input
                                    style={inputStyle}
                                    type="number"
                                    value={salaryMin}
                                    onChange={e => setSalaryMin(e.target.value)}
                                    placeholder="80000"
                                    onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                                    onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Salary max</label>
                                <input
                                    style={inputStyle}
                                    type="number"
                                    value={salaryMax}
                                    onChange={e => setSalaryMax(e.target.value)}
                                    placeholder="120000"
                                    onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                                    onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                                />
                            </div>
                        </div>

                        {/* Source + URL */}
                        <div>
                            <label style={labelStyle}>Source</label>
                            <input
                                style={inputStyle}
                                value={source}
                                onChange={e => setSource(e.target.value)}
                                placeholder="e.g. LinkedIn, HH, Referral"
                                onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                                onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>Job URL</label>
                            <input
                                style={inputStyle}
                                value={appUrl}
                                onChange={e => setAppUrl(e.target.value)}
                                placeholder="https://..."
                                onFocus={e => e.target.style.borderColor = '#1A1A1A'}
                                onBlur={e => e.target.style.borderColor = '#E5E5E5'}
                            />
                        </div>

                        {mutation.isError && (
                            <p style={{ fontSize: 13, color: '#fc814a' }}>Something went wrong. Try again.</p>
                        )}

                        <button
                            type="submit"
                            disabled={mutation.isPending || (!companyId && !newCompanyName)}
                            style={{
                                fontFamily: "'Unbounded', sans-serif",
                                fontSize: 12, fontWeight: 500,
                                background: '#1A1A1A', color: '#F7F5F2',
                                border: 'none', borderRadius: 8,
                                padding: '14px 24px', cursor: 'pointer',
                                letterSpacing: '0.02em', marginTop: 4,
                                opacity: mutation.isPending ? 0.6 : 1,
                                transition: 'background 0.2s',
                            }}
                            onMouseEnter={e => e.target.style.background = '#333'}
                            onMouseLeave={e => e.target.style.background = '#1A1A1A'}
                        >
                            {mutation.isPending ? 'Creating...' : 'Create application'}
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}