import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const usePrismaCreate = async <T extends Tables>(tableName: T, entries: Entities) => {

    try {

        await (prisma as any)[tableName].create({
            data: entries,
        });

    } catch (error) {
        console.error('Error creating entry:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
};
