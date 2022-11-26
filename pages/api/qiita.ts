import type { NextApiRequest, NextApiResponse } from 'next'
import { IQiitaArticle } from '../../consts/qiita';

/**
 * 最新の情報を取得するページ
 * 
 * [GET]/api/qiita
 * 
 * @returns 見つかった記事
 */
export async function getData(): Promise<IQiitaArticle[]> {
    // 前日の情報を取得
    const currentDate = formatDate();
    // const getDataUrl = `https://qiita.com/api/v2/items?page=1&per_page=5&query=created:>2022-03-20+tag:AWS+stocks:>5`;
    const getDataUrl = `https://qiita.com/api/v2/items?page=1&per_page=10&query=updated:>${currentDate}+tag:AWS+stocks:>1`;
    const response = await fetch(getDataUrl);
    const jsonData = await response.json();
    // console.log(jsonData[0])
    /*
    [
        console.log(jsonData[0].tags[0].name);
        { name: 'AWS', versions: [] },
        { name: 'Docker', versions: [] },
        { name: 'container', versions: [] },
        { name: 'コンテナ', versions: [] },
        { name: 'finch', versions: [] }
    ]
    */
    return jsonData.map((art: any) => {
        return {
            url: art.url,
            title: art.title,
            likesCount: art.likes_count,
            stocksCount: art.stocks_count
        }
    });
}


function formatDate() {
    const dt = new Date();
    const yesterday = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() - 3);
    const y = yesterday.getFullYear();
    const m = ('00' + (yesterday.getMonth() + 1)).slice(-2);
    const d = ('00' + yesterday.getDate()).slice(-2);
    console.log(y + '-' + m + '-' + d)
    return (y + '-' + m + '-' + d);
}

/**
 * Next.js の API 定義
 * 
 * @param req リクエスト
 * @param res レスポンス
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IQiitaArticle[]>
) {
    const data = await getData();
    res.status(200).json(data);
}