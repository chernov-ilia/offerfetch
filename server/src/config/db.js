// Prisma client instance.
// Single shared instance used across the entire application.

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

module.exports = prisma;