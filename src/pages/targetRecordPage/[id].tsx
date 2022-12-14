import { Container, Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react'
import CommonDrawer from '../../components/CommonDrawer';
import CommonMeta from '../../components/CommonMeta';
import { Stack } from '@mui/material'
import CommonHeadline from '../../components/CommonHeadline';
import styles from '../../styles/Home.module.css'
import Link from 'next/link';
import MuiLink from "@material-ui/core/Link";
import inputRecordForm from '../../hooks/inputRecordForm';
import { useFieldArray } from 'react-hook-form';
import MainPart from '../../components/MainPart';
import ReferencePart from '../../components/ReferencePart';
import Button from '@mui/material/Button';
import useSWR from 'swr';
import { fetcher } from '../../hooks/fetcher';
import Router from "next/router";

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

    // 未完了・完了の文言設定
    const arrangeFormat = (content: string | boolean) => {
        if (content) {
            return content
        } else {
            return '-'
        }
    }

    // 項目ごとの表示構成
    const viewItem = (itemLabel: string, item: string | boolean) => {
        return (
            <>
                <Grid item xs={4}>{itemLabel}</Grid>
                <Grid item xs={8}>{arrangeFormat(item)}</Grid>
            </>
        )
    }

    // 追加部分
    // タイトル・概要・詳細に関するフォームルールを取得
    const { control, register, handleSubmit, setValue, getValues, errors, reset, setFocus } = inputRecordForm();
    const { fields, append, remove } = useFieldArray({ control, name: 'reference' });
    // text/markdownの状態管理
    const [writeMarkdown, setWriteMarkdown] = React.useState(false);
    // markDownを使用した場合の値を保持
    const [valueUseMarkdown, setValueUseMarkdown] = useState('');
    // // 入力完了の画面表示を制御
    const [update, setUpdate] = useState(false);
    // URLからドメイン取得
    const parsedUrl = new URL(window.location.href);
    const { data, error } = useSWR(
        `${parsedUrl.origin}/api/githubRepos`,
        fetcher
    );

    // データ確認用のメソッド
    const checkData = () => {
        if (update) {
            setUpdate(false)
        } else {
            setUpdate(true)
            setValue('title', info.title)
            setValue('description', info.description)
            setValue('githubRepo', info.githubRepo)
            setValue('detail', info.detail)
            setValue('reference', info.refs)
        }
    }

    // 入力内容送信
    const sendRegisterInfo = () => {
        // 詳細情報はtextかmarkdownで設定値を切替
        let detailInfo: string = '';
        if (writeMarkdown) {
            detailInfo = valueUseMarkdown;
        } else {
            detailInfo = getValues().detail
        }
        // 送信情報の設定
        const sendInfo = {
            id: info.id,
            title: getValues().title,
            description: getValues().description,
            githubRepo: getValues().githubRepo,
            detail: detailInfo,
            finished: false,
            refs: getValues().reference
        };
        const method = 'POST';
        const body = JSON.stringify(sendInfo);
        const headers = {
            'Accept': 'application/json'
        };
        // 送信
        fetch(`/api/record/${info.id}`, { method, headers, body })
            .then((res) => res.json())
            .then(console.info).catch(console.error);
        alert('更新完了')
        Router.push({ pathname: '/searchRecordPage', query: { name: 'UpdateSuccess' } }, '/searchRecordPage');
    }
    // 追加部分

    return (
        <>
            <CommonDrawer />
            <CommonMeta title={"記録詳細"} />
            <Container maxWidth='md'>
                <Stack spacing={2} pb={4}>
                    <CommonHeadline headLine='記録詳細' />
                </Stack>
                <Grid container spacing={2} justifyContent='center' alignItems='center'>
                    <Stack spacing={2} pt={4}>
                        <button onClick={checkData}>更新画面に切り替え</button>
                    </Stack>
                </Grid>

                {(() => {
                    // 送信完了を表示
                    if (!update) {
                        return (
                            <>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}><h1>Main</h1></Grid>
                                    {viewItem('Title', info.title)}
                                    {viewItem('Description', info.description)}
                                    {viewItem('githubRepo', info.githubRepo)}
                                    {viewItem('Detail', info.detail)}
                                    {viewItem('Finished', info.finished)}
                                    <Grid item xs={12}><h1>Links</h1></Grid>
                                    {info.refs.length > 0 ?
                                        (<>
                                            <Grid item xs={4}><h3>LinkTitle</h3></Grid>
                                            <Grid item xs={8}><h3>LinkUrl</h3></Grid>
                                            {info.refs.map((ref: any) => (
                                                <>
                                                    <Grid item xs={4}>{ref.linkTitle}</Grid>
                                                    <Grid item xs={8}>
                                                        <Link href={ref.linkUrl} passHref>
                                                            <MuiLink target="_blank" rel="noopener noreferrer">
                                                                {ref.linkUrl}
                                                            </MuiLink>
                                                        </Link>
                                                    </Grid>
                                                </>
                                            ))}
                                        </>)
                                        :
                                        (<><Grid item xs={4}>No Refs</Grid></>)}
                                </Grid>
                            </>
                        )
                    } else {
                        // 未送信の場合はフォーム表示
                        return (
                            <>
                                {/* <Stack direction='row' justifyContent='center' pt={4}>
                                    Coding Now...
                                </Stack> */}
                                {/* 主な事項を記載する箇所 */}
                                <MainPart
                                    register={register} errors={errors} setValueUseMarkdown={setValueUseMarkdown} setWriteMarkdown={setWriteMarkdown} data={data} />
                                {/* 参照リンクの記載箇所 */}
                                <ReferencePart register={register} errors={errors} fields={fields} append={append} remove={remove} />
                                {/* 送信 */}
                                <Stack direction='row' justifyContent='right' pb={4}>
                                    <Button variant='contained' color='success' onClick={handleSubmit(d => sendRegisterInfo())}>
                                        Create Record
                                    </Button>
                                </Stack>
                            </>);
                    }
                })()}

            </Container>
        </>
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
