import { NextApiRequest, NextApiResponse } from "next";
import { prismaRecordFindOne, prismaRecordUpdate } from "../../../../prisma/functions/record";
import { prismaRecordRefsCreate, prismaRecordRefsDelete, prismaRecordRefsFindOne, prismaRecordRefsUpdate } from "../../../../prisma/functions/recordRef";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const { method, query: { id }, body } = req;

    switch (method) {
        case 'GET':
            const recordTableData = await prismaRecordFindOne(id);
            const refTableData = await prismaRecordRefsFindOne(id);
            const response: any = {
                id: recordTableData[0].id,
                title: recordTableData[0].title,
                description: recordTableData[0].description,
                githubRepo: recordTableData[0].githubRepo,
                detail: recordTableData[0].detail,
                finished: recordTableData[0].finished,
                refs: refTableData
            }
            res.status(200).json(response);
            break;

        case 'POST':
            if (!body) return res.status(400).end('No body');
            const jsonBody = JSON.parse(body)

            // recordRefへの登録
            if (jsonBody.refs.length > 0) {
                const createRecordRefsParams = { linkTitle: 'sample', linkUrl: 'sample', recordId: jsonBody.id }
                const receiveRefs = jsonBody.refs
                const originalRecordRefs = await prismaRecordRefsFindOne(jsonBody.id);

                // もともとあって、今回ない：削除
                // もともとなくて、今回ある：追加
                // もともとあって、今回もある：更新
                let updateOrDeleteRecord = []
                for (let info of receiveRefs) {
                    if (!info.id) {
                        createRecordRefsParams.linkTitle = info.linkTitle
                        createRecordRefsParams.linkUrl = info.linkUrl
                        await prismaRecordRefsCreate(createRecordRefsParams);
                    } else {
                        updateOrDeleteRecord.push(info)
                    }
                }

                // 追加と削除実施
                for (let originalInfo of originalRecordRefs) {
                    const existResult = updateOrDeleteRecord.filter((receiveInfo: any) => (
                        receiveInfo.id == originalInfo.id
                    ));

                    if (existResult.length > 0) {
                        createRecordRefsParams.linkTitle = existResult[0].linkTitle
                        createRecordRefsParams.linkUrl = existResult[0].linkUrl
                        // console.log(existResult[0].id)
                        await prismaRecordRefsUpdate(Number(existResult[0].id), createRecordRefsParams);
                    } else {
                        // console.log(originalInfo.id)
                        await prismaRecordRefsDelete(Number(originalInfo.id));
                    }
                }

            }

            //recordテーブルへの登録内容設定 
            const createRecordParams: any = {
                title: jsonBody.title,
                description: jsonBody.description,
                githubRepo: jsonBody.githubRepo,
                detail: jsonBody.detail,
                finished: jsonBody.finished,
                updatedAt: new Date()
            }
            // 記録更新
            const record = await prismaRecordUpdate(Number(jsonBody.id), createRecordParams);
            res.status(200).json(jsonBody);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}