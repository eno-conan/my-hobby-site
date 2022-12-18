import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaRecordsGroupByDay } from '../../../../prisma/functions/record';

interface IResRecord {
    count: number;
    createdDate: string
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
            const records = await prismaRecordsGroupByDay();
            const resRecords: IResRecord[] = [];
            records.map((rcd) => {
                const resObj: IResRecord = { count: 0, createdDate: '' }
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