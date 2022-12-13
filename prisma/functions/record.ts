import { Prisma, Record } from '@prisma/client';
import prisma from './client';

export const prismaRecordsFindMany = async (): Promise<any[] | Record[]> => {
    const records = await prisma.record.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            githubRepo: true,
            detail: false,
            finished: true,
            createdAt: false,
            updatedAt: false
        },
        orderBy: { updatedAt: Prisma.SortOrder.desc }
    }
    );
    return records!;
};

export const prismaRecordFindOne = async (id: any): Promise<Record> => {
    const checkedRecord = await prisma.record.findUnique({
        where: {
            id: Number(id),
        }
    });
    return checkedRecord!;
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