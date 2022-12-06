import type { NextApiRequest, NextApiResponse } from 'next'

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
    const body = req.body;
    res.status(200).json(JSON.parse(req.body));
}