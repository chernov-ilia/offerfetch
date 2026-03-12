// Companies model.
// Handles all database operations for companies.

const prisma = require('../config/db');

const getAll = async (userId) => {
    return prisma.company.findMany({
        where: { userId },
        orderBy: { companyName: 'asc' }
    });
};

const getById = async (id, userId) => {
    return prisma.company.findFirst({
        where: { id, userId }
    });
};

const create = async (data) => {
    return prisma.company.create({ data });
};

const update = async (id, userId, data) => {
    return prisma.company.updateMany({
        where: { id, userId },
        data
    });
};

const remove = async (id, userId) => {
    return prisma.company.deleteMany({
        where: { id, userId }
    });
};

module.exports = { getAll, getById, create, update, remove };