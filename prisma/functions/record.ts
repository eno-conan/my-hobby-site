import prisma from './client';
import { Record } from '@prisma/client';

export const prismaRecordsFindMany = async (): Promise<any[]> => {
    const records = await prisma.record.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            githubRepo: true,
            detail: false,
            finished: true,
            createdAt: false,
            updatedAt: true
        }
    });
    return records;
};

/* 記録を新規保存 */
export const prismaRecordCreate = async (
    param: Omit<Record, 'id'>,
): Promise<Record> => {
    const record = await prisma.record.create({
        data: param,
    });
    return record;
};