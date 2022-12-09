import prisma from './client';
import { RecordRef } from '@prisma/client';

export const prismaRecordRefsFindMany = async (): Promise<RecordRef[]> => {
    const recordRefs = await prisma.recordRef.findMany();
    return recordRefs;
};

/* 記録を新規保存 */
export const prismaRecordRefsCreate = async (
    param: Omit<RecordRef, 'id'>,
): Promise<RecordRef> => {
    const recordRefs = await prisma.recordRef.create({
        data: param,
    });
    return recordRefs;
};