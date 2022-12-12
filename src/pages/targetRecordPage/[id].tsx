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

const TargetRecord: NextPage = (props: any) => {
    const [recordData, setRecordData] = useState<any>();
    // 実装パターン2で使用する部分
    if (props.status) {
        ErrorHandling();// 同じ画面が表示されるが、データは残ってない
        return (
            <>
                <ErrorHandling />
            </>
        )
    }
    const info = props.recordInfo;
    useEffect(() => {
        setRecordData(info)
    })

    // データ確認用のメソッド
    const checkData = () => {
        console.log(recordData)
    }

    // 未完了・完了の文言設定
    const arrangeFormat = (content: string) => {
        if (content) {
            return content
        } else {
            return '-'
        }
    }


    return (
        <div>
            <CommonDrawer />
            <CommonMeta title={"記録詳細"} />
            <Container maxWidth="md">
                <Stack spacing={2} pb={4}>
                    <CommonHeadline headLine='記録詳細' />
                </Stack>
                <Grid container spacing={2}>
                    <Grid item xs={12}><h1>Main</h1></Grid>
                    <Grid item xs={4}>Title</Grid>
                    <Grid item xs={8}>{info.title}</Grid>
                    <Grid item xs={4}>Description</Grid>
                    <Grid item xs={8}>{info.description}</Grid>
                    <Grid item xs={4}>githubRepo</Grid>
                    <Grid item xs={8}>{arrangeFormat(info.githubRepo)}</Grid>
                    <Grid item xs={4}>detail</Grid>
                    <Grid item xs={8}>{info.detail}</Grid>
                    <Grid item xs={4}>Finished</Grid>
                    <Grid item xs={8}>{arrangeFormat(info.finished)}</Grid>
                    <Grid item xs={12}><h1>Links</h1></Grid>
                    <Grid item xs={4}><h3>LinkTitle</h3></Grid>
                    <Grid item xs={8}><h3>LinkUrl</h3></Grid>
                    {info.refs.map((ref: any) => (
                        <>
                            <Grid item xs={4}>{ref.linkTitle}</Grid>
                            <Grid item xs={8}>{ref.linkUrl}</Grid>
                        </>
                    ))}
                </Grid>
                <Stack spacing={2} pt={4}>
                    <button onClick={checkData}>更新ボタンをここに作る予定</button>
                </Stack>
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
