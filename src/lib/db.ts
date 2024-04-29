// Initialize Prisma client and declare global variable for PrismaClient instance
import { PrismaClient } from '@prisma/client';

// Declare global variable to hold PrismaClient instance
declare global {
    var prisma: PrismaClient | undefined;
}

// Export Prisma client instance or create a new one if not already defined
export const db = globalThis.prisma || new PrismaClient();

// Set Prisma client instance to global object in non-production environment
if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
