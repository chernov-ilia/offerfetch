// Companies API calls.

import client from './client';

export const getCompanies = () => client.get('/companies');
export const getCompany = (id) => client.get(`/companies/${id}`);
export const createCompany = (data) => client.post('/companies', data);
export const updateCompany = (id, data) => client.put(`/companies/${id}`, data);
export const deleteCompany = (id) => client.delete(`/companies/${id}`);