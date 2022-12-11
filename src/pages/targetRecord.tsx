import { NextPage } from 'next';
import React, { useEffect, useState } from 'react'

const TargetRecord: NextPage = (props: any) => {
    const info = props.recordInfo;
    console.log(info)
    return (
        <div>
            Hello
        </div>
    )
}

export default TargetRecord

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

    return {
        props: {
            recordInfo: await response.json(),
        }
    }
}
