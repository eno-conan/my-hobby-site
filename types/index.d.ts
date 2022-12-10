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