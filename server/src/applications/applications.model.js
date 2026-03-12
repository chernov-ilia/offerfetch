// Applications model.
// Handles all database operations for applications.

const prisma = require('../config/db');

const getAll = async (userId) => {
    return prisma.application.findMany({
        where: { userId, isArchived: false },
        include: {
            company: true,
            currentStatus: true,
            workType: true,
            city: {
                include: { state: true }
            }
        },
        orderBy: { dateCreated: 'desc' }
    });
};

const getById = async (id, userId) => {
    return prisma.application.findFirst({
        where: { id, userId },
        include: {
            company: true,
            currentStatus: true,
            workType: true,
            city: {
                include: { state: true }
            },
            updates: {
                include: { status: true },
                orderBy: { dateUpdated: 'desc' }
            },
            resumes: {
                include: { resume: true }
            },
            coverLetters: {
                include: { coverLetter: true }
            },
            comments: {
                orderBy: { dateCreated: 'desc' }
            }
        }
    });
};

const create = async (data) => {
    return prisma.application.create({ data });
};

const update = async (id, userId, data) => {
    return prisma.application.updateMany({
        where: { id, userId },
        data
    });
};

const archive = async (id, userId) => {
    return prisma.application.updateMany({
        where: { id, userId },
        data: { isArchived: true }
    });
};

module.exports = { getAll, getById, create, update, archive };