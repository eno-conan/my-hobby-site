import { Prisma, Record } from '@prisma/client';
import prisma from './client';

export const prismaRecordsFindMany = async (): Promise<Record[]> => {
    const records = await prisma.record.findMany(
    );
    return records;
};



/* 記録を新規保存 */
export const prismaRecordCreate = async (
    // param: Omit<Record, 'id'>,
    param: Record,
): Promise<Record> => {
    const record = await prisma.record.create({
        data: param,
    });
    return record;
};


// {
//     orderBy: {
//         updatedAt: Prisma.SortOrder.desc,
//     } as any
// }

// {
//     select: {
//         id: true,
//         title: true,
//         description: true,
//         githubRepo: true,
//         detail: false,
//         finished: true,
//         createdAt: false,
//         updatedAt: true
//     }
// }