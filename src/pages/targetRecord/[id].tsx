import { Container, Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react'
import CommonDrawer from '../../components/CommonDrawer';
import CommonMeta from '../../components/CommonMeta';
import { Stack } from '@mui/material'
import CommonHeadline from '../../components/CommonHeadline';
import styles from '../../styles/Home.module.css'
import Link from 'next/link';

function ErrorHandling() {
    return (
        <>
            <main className={styles.main}>
                <h1>
                    予期せぬエラーが発生しました
                </h1>
                <h1 className={styles.nextaction}>
                    <Link href="/searchRecordPage">記録一覧に戻る</Link>
                </h1>
            </main>
        </>
    )
}

// interface IRecordData{
//         id: number;
//         title: 'dfafaf',    description: 'fdafa',
//         githubRepo: 'eno-conan/Nuxtjs_pinia_vitest',
//         detail: 'fadfasfasfafafa',    finished: false,
//         createdAt: 2022-12-11T03:33:35.630Z,
//         updatedAt: 2022-12-11T03:33:35.630Z
// }

const TargetRecord: NextPage = (props: any) => {
    const [recordData, setRecordData] = useState<any>();
    // 実装パターン2で使用する部分
    if (props.status) {
        ErrorHandling();// 同じ画面が表示されるが、データは残ってない
        // return (
        //     <>
        //         {/* <ErrorHandling /> */}
        //     </>
        // )
    }
    const info = props.recordInfo[0];
    useEffect(() => {
        setRecordData(info)
    })

    const checkData = () => {
        console.log(recordData)
    }
    return (
        <div>
            <CommonDrawer />
            <CommonMeta title={"記録詳細"} />
            <Container maxWidth="md">
                <Stack spacing={2} pb={4}>
                    <CommonHeadline headLine='記録詳細' />
                </Stack>
                <Grid container>
                    <Grid item xs={6}>Title</Grid>
                    <Grid item xs={6}>{info && info.title}</Grid>
                    <Grid item xs={12}>C</Grid>
                </Grid>
                <button onClick={checkData}>CheckData</button>
            </Container>
        </div>
    )
}

export default TargetRecord

//サーバーサイドレンダリング
export async function getServerSideProps(context: { query: { id: any, host: any }; }) {
    //対象記録のID
    const targetId = context.query.id;
    // ホストを取得（fetchが絶対パスのため）
    const hostName = context.query.host;
    const method = 'GET';
    const headers = {
        'Accept': 'application/json'
    };
    // 結果を格納
    let response;
    try {
        response = await fetch(`${hostName}/api/record/${targetId}`, { method, headers });
    } catch (err: any) {
        // エラーハンドリング
        // 実装パターン1(何もメッセージなしで遷移はUX的にどうなの？)
        // return {
        //     redirect: {
        //         destination: '/searchRecordPage',
        //         permanent: false,
        //     }
        // };
        // 実装パターン2
        return { props: { status: err.message } };
    }

    return {
        props: {
            recordInfo: await response.json(),
        }
    }
}
