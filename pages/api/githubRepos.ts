import type { NextApiRequest, NextApiResponse } from 'next'
import { IQiitaArticle } from '../../consts/qiita';

/**
 * Githubのリポジトリ一覧を取得するAPI
 * 
 * [GET]/api/githubRepos
 * 
 * @returns 見つかったリポジトリ一覧
 */
export async function getData(): Promise<any> {
    const targetUrl = 'https://api.github.com/user/repos';
    const apiKey = process.env.GITHUB_API_KEY!
    const response = await fetch(targetUrl, {
        method: 'GET',
        headers: {
            'Authorization': apiKey
        }
    });
    const jsonData = await response.json();
    return jsonData.map((art: any) => {
        return {
            reponame: art.full_name
        }
    });
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
    const data = await getData();
    res.status(200).json(data);
}