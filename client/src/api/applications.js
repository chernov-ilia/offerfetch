// Applications API calls.

import client from './client';

export const getApplications = () => client.get('/applications');
export const getApplication = (id) => client.get(`/applications/${id}`);
export const createApplication = (data) => client.post('/applications', data);
export const updateApplication = (id, data) => client.put(`/applications/${id}`, data);
export const archiveApplication = (id) => client.patch(`/applications/${id}/archive`);