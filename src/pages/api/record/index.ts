import { Record } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'
import { prismaRecordCreate, prismaRecordFindOne, prismaRecordsFindMany } from '../../../../prisma/functions/record';
import { prismaRecordRefsCreate } from '../../../../prisma/functions/recordRef';

/**
 * 記録についてテーブルに追加などを行うAPI
 * 
 * [POST]/api/record
 * 
 * @returns 実行結果
 */
export async function registerData(): Promise<any> {
    // const targetUrl = 'https://api.github.com/user/repos';
    // const apiKey = process.env.GITHUB_API_KEY!
    // const response = await fetch(targetUrl, {
    //     method: 'GET',
    //     headers: {
    //         'Authorization': apiKey
    //     }
    // });
    // const jsonData = await response.json();
    // return jsonData.map((art: any) => {
    //     return {
    //         reponame: art.full_name
    //     }
    // });
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
            const records = await prismaRecordsFindMany();
            res.status(200).json(records);
            break;

        case 'POST':
            if (!body) return res.status(400).end('No body');
            const jsonBody = JSON.parse(body)
            // const params = JSON.parse(body) as Omit<Record, 'id'>;
            //recordテーブルへの登録内容設定 

            const cnt: number = (await prismaRecordsFindMany()).length + 1;

            // recordRefへの登録
            if (jsonBody.refs.length > 0) {
                const createRecordRefsParams = { linkTitle: 'sample', linkUrl: 'sample', recordId: cnt }
                const links = jsonBody.refs
                // 暫定対応でfor文記載（後々bulkInsertにする:22/12/10）
                for (let info of links) {
                    createRecordRefsParams.linkTitle = info.linkTitle
                    createRecordRefsParams.linkUrl = info.linkUrl
                    const recordRefs = await prismaRecordRefsCreate(createRecordRefsParams);
                }
            }

            const createRecordParams: any = {
                title: jsonBody.title,
                description: jsonBody.description,
                githubRepo: jsonBody.githubRepo,
                detail: jsonBody.detail,
                finished: jsonBody.finished,
            }
            // console.log(createRecordParams)
            const record = await prismaRecordCreate(createRecordParams);

            res.status(200).json(jsonBody);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}