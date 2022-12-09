import prisma from './client';
import { Record } from '@prisma/client';

export const prismaRecordsFindMany = async (): Promise<Record[]> => {
    const records = await prisma.record.findMany();
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