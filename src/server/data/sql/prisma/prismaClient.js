const { PrismaClient } = require("@prisma/client");

const prismaClient = new PrismaClient(); // Singleton

module.exports = { prismaClient };