import { NextApiRequest, NextApiResponse } from "next";
import { prismaRecordFindOne } from "../../../../prisma/functions/record";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const {
        method,
        query: { id },
        body
    } = req;

    switch (method) {
        case 'GET':
            // console.log(id)
            console.log(await prismaRecordFindOne(id));
            // console.log(records)
            res.status(200).json({ Hello: 'Hello' });
            break;

        case 'POST':
            if (!body) return res.status(400).end('No body');
            // const jsonBody = JSON.parse(body)
            // // const params = JSON.parse(body) as Omit<Record, 'id'>;
            // //recordテーブルへの登録内容設定 

            // const cnt: number = (await prismaRecordsFindMany()).length + 1;

            // // recordRefへの登録
            // if (jsonBody.refs.length > 0) {
            //     const createRecordRefsParams = { linkTitle: 'sample', linkUrl: 'sample', recordId: cnt }
            //     const links = jsonBody.refs
            //     // 暫定対応でfor文記載（後々bulkInsertにする:22/12/10）
            //     for (let info of links) {
            //         createRecordRefsParams.linkTitle = info.linkTitle
            //         createRecordRefsParams.linkUrl = info.linkUrl
            //         const recordRefs = await prismaRecordRefsCreate(createRecordRefsParams);
            //     }
            // }

            // const createRecordParams: any = {
            //     title: jsonBody.title,
            //     description: jsonBody.description,
            //     githubRepo: jsonBody.githubRepo,
            //     detail: jsonBody.detail,
            //     finished: jsonBody.finished,
            // }
            // // const createRecordParams = { title: '', description: '', githubRepo: '', detail: '', finished: false }
            // console.log(createRecordParams)

            // const record = await prismaRecordCreate(createRecordParams);

            // res.status(200).json(jsonBody);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}