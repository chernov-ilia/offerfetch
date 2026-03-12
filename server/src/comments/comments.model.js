// Comments model.

const prisma = require('../config/db');

const getByApplication = async (applicationId, userId) => {
    return prisma.comment.findMany({
        where: { applicationId, userId },
        orderBy: { dateCreated: 'desc' }
    });
};

const create = async (data) => {
    return prisma.comment.create({ data });
};

const remove = async (id, userId) => {
    return prisma.comment.deleteMany({
        where: { id, userId }
    });
};

module.exports = { getByApplication, create, remove };