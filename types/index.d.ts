import { Record, RecordRef, Dummy } from '@prisma/client';

type Record = Record;

type RefWithRecord = RecordRef & {
  record: Record;
};

type RecordRef = RecordRef;

type RecordWithRefs = Record & {
  refs: RecordRef[];
};

type Dummy = Dummy