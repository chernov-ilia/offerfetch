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
    return prisma.$transaction(async (tx) => {
        const application = await tx.application.create({ data });

        await tx.applicationUpdate.create({
            data: {
                applicationId: application.id,
                statusId: application.currentStatusId,
                description: 'Application created'
            }
        });

        return application;
    });
};

const update = async (id, userId, data) => {
    return prisma.$transaction(async (tx) => {
        const application = await tx.application.updateMany({
            where: { id, userId },
            data
        });

        if (data.currentStatusId) {
            await tx.applicationUpdate.create({
                data: {
                    applicationId: id,
                    statusId: data.currentStatusId,
                    description: data.statusDescription || null
                }
            });
        }

        return application;
    });
};

const archive = async (id, userId) => {
    return prisma.application.updateMany({
        where: { id, userId },
        data: { isArchived: true }
    });
};

module.exports = { getAll, getById, create, update, archive };