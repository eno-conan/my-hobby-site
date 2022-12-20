import { Console } from 'console';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaRecordsGroupByDay } from '../../../../prisma/functions/record';
import { getDateInfo } from '../../../hooks/getDateInfo';

interface IResRecord {
    count: number;
    createdDate: string
    targetYearMonth?: string
}

/**
 * Next.js の API 定義
 * 
 * @param req リクエスト
 * @param res レスポンス
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { method, body } = req;

    switch (method) {
        case 'GET':
            // 日付ごとの記録数を取得
            const dateInfo = getDateInfo(1);
            const records = await prismaRecordsGroupByDay(dateInfo!);
            let resRecords: IResRecord[] = [];
            records.map((rcd, idx) => {
                const resObj: IResRecord = { count: 0, createdDate: '' }
                // 1件目のみ、対象月を設定
                if (idx == 0) {
                    resObj.targetYearMonth = `(${dateInfo})`
                }
                resObj.count = rcd._count.id
                resObj.createdDate = rcd.createdAtDate
                resRecords.push(resObj);
            })
            res.status(200).json(resRecords);
            break;
        case 'POST':
            if (!body) return res.status(400).end('No body');
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}