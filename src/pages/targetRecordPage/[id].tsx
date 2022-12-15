import { Container, Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react'
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
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MaterialLink from '@mui/material/Link';
import SentPart from '../../components/SentPart';

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
    // // URLからドメイン取得
    const [host, setHost] = useState('');
    const [finished, setFinished] = useState(true);
    useEffect(() => {
        setHost(new URL(window.location.href).origin);
    }, []);
    const { data, error } = useSWR(
        `${host}/api/githubRepos`,
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
            // マークダウン記述に備えて内容を設定しておく
            // setValueUseMarkdown(info.detail)
            // この1行だけでは何も表示されない
            setValue('reference', info.refs)
        }
    }

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

    // 詳細表示
    const recordDetailView = () => {
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
            </>)
    }

    // 更新する場合の表示
    const recordUpdateView = () => {
        return (
            <>
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
            </>)
    }

    // 入力内容送信
    const sendRegisterInfo = () => {
        // 詳細情報はtextかmarkdownで設定値を切替
        const detailInfo: string = writeMarkdown ? valueUseMarkdown : getValues().detail;

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
            .then((res) => {
                if (!res.ok) {
                    console.log(res.status)
                    Router.push({ pathname: '/searchRecordPage', query: { status: 'UpdateFailed' } }, '/searchRecordPage');
                }
                Router.push({ pathname: '/searchRecordPage', query: { status: 'UpdateSuccess' } }, '/searchRecordPage');
            }
            ).catch(console.error);
    }

    // 入力画面から遷移した場合は、送信完了を表示
    if (props.fromView == 'inputRecord' && finished) {
        return (
            <SentPart setFinished={setFinished} />
        )
    }

    return (
        <>
            {/* <CommonDrawer /> */}
            <CommonMeta title={"記録詳細"} />
            <Container maxWidth='md'>
                <Stack pt={4}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <MaterialLink underline="hover" color="inherit" href="/">
                            Top
                        </MaterialLink>
                        <MaterialLink
                            underline="hover"
                            color="inherit"
                            href="/searchRecordPage"
                        >
                            Search-Record
                        </MaterialLink>
                        <MaterialLink
                            underline="hover"
                            color="inherit"
                        >
                            Detail(Here)
                        </MaterialLink>
                    </Breadcrumbs>
                </Stack>
                <Stack spacing={2} pb={4}>
                    <CommonHeadline headLine='記録詳細' />
                </Stack>
                <Grid container spacing={2} justifyContent='center' alignItems='center'>
                    <Stack spacing={2} pt={4}>
                        <button onClick={checkData}>更新画面に切り替え</button>
                    </Stack>
                </Grid>

                {(() => {
                    if (!update) {
                        // 詳細表示
                        return (
                            <>
                                {recordDetailView()}
                            </>
                        )
                    } else {
                        // 更新の場合はフォーム表示
                        return (
                            <>
                                {recordUpdateView()}
                            </>);
                    }
                })()}
            </Container>
        </>
    )
}

export default TargetRecord

//サーバーサイドレンダリング
export async function getServerSideProps(context: { query: { id: any, host: any, fromView: string }; }) {
    //対象記録のID
    const targetId = context.query.id;
    // ホストを取得（fetchが絶対パスのため）
    const hostName = context.query.host;
    const pageName = context.query.fromView;
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
        return { props: { status: err.message } };
    }

    return {
        props: {
            recordInfo: await response.json(),
            fromView: pageName
        }
    }
}
