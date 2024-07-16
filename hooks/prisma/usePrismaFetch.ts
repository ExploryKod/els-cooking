import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const usePrismaFetch = async <T extends Tables>(tableName: T) => {
    try {
        const query = await (prisma as any)[tableName].findMany();

        return query as Entities[T];

    } catch (error) {
        console.error('Error fetching entries:', error);
        throw new Error(`Error fetching entries from table ${tableName}: ${error}`);
    } finally {
        await prisma.$disconnect();
    }
};
