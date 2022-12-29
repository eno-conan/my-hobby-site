// import { PrismaClient } from '@prisma/client';
import prisma from './client';

/* 本リストを取得 */
export const prismaDummyFindMany = async (): Promise<any[]> => {
  const dummies = await prisma.dummy.findMany({
    /* 著者の情報も取得する */
    where: { name: 'abc' },
  });
  return dummies;
};