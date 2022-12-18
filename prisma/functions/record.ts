import { Prisma, Record } from '@prisma/client';
import prisma from './client';

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
            updatedAt: false
        },
        orderBy: { updatedAt: Prisma.SortOrder.desc }
    }
    );
    return records;
};

// ある記事に関する情報を取得する
export const prismaRecordFindOne = async (id: any): Promise<Record[]> => {
    const checkedRecord = await prisma.record.findMany({
        where: {
            id: Number(id),
        }
    });
    return checkedRecord;
};

export const prismaRecordsGroupByDay = async (): Promise<any[]> => {
    const records = await prisma.record.groupBy({
        by: ['createdAtDate'],
        _count: {
            id: true,
        },
    });
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

/* 記録を更新 */
export const prismaRecordUpdate = async (id: number, param: Record): Promise<Record> => {
    const record = await prisma.record.update({
        where: { id: id },
        data: param,
    });
    return record;
};