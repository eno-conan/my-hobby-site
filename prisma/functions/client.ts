
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default prisma

// import { PrismaClient } from '@prisma/client';
// export const prisma = new PrismaClient();
// 22/12/10：There are already 10 instances of Prisma Client actively running修正したいけど、修正するとテストが通らなくなる・・・
// (https://zenn.dev/kanasugi/articles/368d0b39c94daf)