import React, { useEffect, useState } from 'react'
import useSWR from 'swr';
import LoadingPart from '../components/LoadingPart';
import { fetcher } from '../hooks/fetcher';

const targetRecord = (props: any) => {
    const info = props.recordInfo;
    console.log(info)
    return (
        <div>
            Hello
        </div>
    )
}

export default targetRecord

//サーバーサイドレンダリング
export async function getServerSideProps(context: { query: { id: any, host: any }; }) {

    //検索キーワード
    const targetId = context.query.id;
    const hostName = context.query.host;

    const method = 'GET';
    const headers = {
        'Accept': 'application/json'
    };
    const response = await fetch(`${hostName}/api/record/${targetId}`, { method, headers });

    // ローディング中の表示
    if (!response) {
        return (
            <LoadingPart />
        );
    }

    return {
        props: {
            recordInfo: await response.json(),
        }
    }
}
