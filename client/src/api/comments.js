// Comments API calls.

import client from './client';

export const getComments = (applicationId) => client.get(`/applications/${applicationId}/comments`);
export const createComment = (applicationId, data) => client.post(`/applications/${applicationId}/comments`, data);
export const deleteComment = (applicationId, commentId) => client.delete(`/applications/${applicationId}/comments/${commentId}`);