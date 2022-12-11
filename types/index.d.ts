import { Record, RecordRef, Dummy, Prisma } from '@prisma/client';

type Record = Record;
type RecordRef = RecordRef;
type Dummy = Dummy

// type RefWithRecord = RecordRef & {
//   record: Record;
// };
// type RecordWithRefs = Record & {
//   refs: RecordRef[];
// };
// interface IRecordData{
//         id: number;
//         title: 'dfafaf',    description: 'fdafa',
//         githubRepo: 'eno-conan/Nuxtjs_pinia_vitest',
//         detail: 'fadfasfasfafafa',    finished: false,
//         createdAt: 2022-12-11T03:33:35.630Z,
//         updatedAt: 2022-12-11T03:33:35.630Z
// }