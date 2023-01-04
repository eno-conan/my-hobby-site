import { Box, Container, Grid } from '@material-ui/core';
import { NextPage } from 'next';
import React, { useEffect, useState } from 'react'
import CommonMeta from '../../components/CommonMeta';
import { Stack } from '@mui/material'
import CommonHeadline from '../../components/CommonHeadline';
import Link from 'next/link';
import MuiLink from "@material-ui/core/Link";
import inputRecordForm from '../../hooks/inputRecordForm';
import { useFieldArray } from 'react-hook-form';
import ReferencePart from '../../components/ReferencePart';
import Button from '@mui/material/Button';
import useSWR from 'swr';
import Router from "next/router";
import SentPart from '../../components/SentPart';
import sendRecord from '../../hooks/sendRecord';
import ErrorHandling from '../../components/ErrorHandling';
import CommonBreadcrumbs from '../../components/CommonBreadcrumbs';
import { marked } from "marked";
import xss from "xss";
import Grid2 from '@mui/material/Unstable_Grid2';
import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import { DESCRIPTION_DISPLAY_VALUE, DESCRIPTION_LITERAL_LENGTH, DETAIL_DISPLAY_VALUE, FINISHED_STATUS_VALUE, GITHUB_REPO_DISPLAY_VALUE, MAIN_ITEM_DISPLAY_VALUE, NO_REFER_LINK_DISPLAY_VALUE, REFER_LINK_DISPLAY_VALUE, TITLE_DISPLAY_VALUE, TITLE_LITERAL_LENGTH } from '../../consts/inputField';
import FieldNamePart from '../../components/FieldNamePart';
import TextPart from '../../components/TextPart';
import DetailPart from '../../components/DetailPart';
import { ErrorMessage } from '@hookform/error-message';

// パンくずリストのための階層配列
const subDirArr = ['searchRecordPage', 'targetRecordPage']

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
    const { control, register, handleSubmit, setValue, getValues, errors } = inputRecordForm();
    const { fields, append, remove } = useFieldArray({ control, name: 'reference' });
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
    // const { data, error } = useSWR(
    //     `${host}/api/githubRepos`,
    //     fetcher
    // );

    // データ確認用のメソッド
    const checkData = () => {
        if (update) {
            setUpdate(false)
        } else {
            setUpdate(true)
            setValue('title', info.title)
            setValue('description', info.description)
            // setValue('githubRepo', info.githubRepo)
            setValue('detail', info.detail)
            // マークダウン記述に備えて内容を設定しておく
            setValueUseMarkdown(info.detail)
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
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>{itemLabel}</Grid>
                <Grid item xs={8}>{arrangeFormat(item)}</Grid>
            </>
        )
    }

    // 項目ごとの表示構成
    const viewItemForDetail = (itemLabel: string, item: string, markdownFlg: boolean) => {
        return (
            <>
                <Grid item xs={1}></Grid>
                <Grid item xs={3}>{itemLabel}</Grid>
                {markdownFlg ?
                    (
                        <>
                            <Grid item xs={8}>
                                <span dangerouslySetInnerHTML={{ __html: xss(marked(item)) }} />
                            </Grid>
                        </>
                    )
                    :
                    (
                        <><Grid item xs={8}>{arrangeFormat(item)}</Grid></>
                    )}
            </>
        )
    }

    // 詳細表示
    const recordDetailView = () => {
        return (
            <>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={20}>
                            <h3>{MAIN_ITEM_DISPLAY_VALUE}</h3>
                        </Box>
                    </Grid>
                    {viewItem(TITLE_DISPLAY_VALUE, info.title)}
                    {viewItem(DESCRIPTION_DISPLAY_VALUE.split('(')[0], info.description)}
                    {viewItem(GITHUB_REPO_DISPLAY_VALUE.split('(')[0], info.githubRepo)}
                    {viewItemForDetail(DETAIL_DISPLAY_VALUE, info.detail, true)}
                    {viewItem(FINISHED_STATUS_VALUE, info.finished)}
                    <Grid item xs={12}>
                        <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={20}>
                            <h3>{REFER_LINK_DISPLAY_VALUE}</h3>
                        </Box>
                    </Grid>
                    {info.refs.length > 0 ?
                        (<>
                            <Grid item xs={1}></Grid>
                            <Grid item xs={3}><h3>リンク名</h3></Grid>
                            <Grid item xs={8}><h3>URL</h3></Grid>
                            {info.refs.map((ref: any) => (
                                <>
                                    <Grid item xs={1}></Grid>
                                    <Grid item xs={3}>{ref.linkTitle}</Grid>
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
                        (<><Grid item xs={1}></Grid>
                            <Grid item xs={4}>{NO_REFER_LINK_DISPLAY_VALUE}</Grid>
                        </>)}
                </Grid>
            </>)
    }

    // 更新する場合の表示
    const recordUpdateView = () => {
        return (
            <>
                {/* 主な事項を記載する箇所 */}
                <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={20}>
                    <h3>{MAIN_ITEM_DISPLAY_VALUE}</h3>
                </Box>
                <Grid2 container spacing={2} paddingLeft={4}>
                    {/*題名・概要 */}
                    <FieldNamePart fieldName={`${TITLE_DISPLAY_VALUE}${TITLE_LITERAL_LENGTH}`} />
                    <Grid2 xs={12} md={12}>
                        {/*題名・概要 */}
                        <TextPart
                            register={register} label={'title'} />
                        <Box sx={{ bgcolor: 'error.main', borderRadius: 2 }}>
                            <ErrorMessage errors={errors} name={'title'} />
                        </Box>
                    </Grid2>
                    <FieldNamePart fieldName={`${TITLE_DISPLAY_VALUE}${DESCRIPTION_LITERAL_LENGTH}`} />
                    <Grid2 xs={12} md={12}>
                        <TextPart
                            register={register} label={'description'} />
                        <Box sx={{ bgcolor: 'error.main', borderRadius: 2 }}>
                            <ErrorMessage errors={errors} name={'description'} />
                        </Box>
                    </Grid2>
                    <FieldNamePart fieldName={DETAIL_DISPLAY_VALUE} />
                    <Grid2 xs={12} md={12}>
                        <DetailPart register={register} errors={errors} valueUseMarkdown={valueUseMarkdown} setValueUseMarkdown={setValueUseMarkdown} />
                    </Grid2>
                </Grid2>
                {/* 参照リンクの記載箇所 */}
                <ReferencePart register={register} errors={errors} fields={fields} append={append} remove={remove} />
                {/* 送信 */}
                <Stack direction='row' justifyContent='right' pb={4}>
                    <Button variant='contained' color='success' onClick={handleSubmit(d => sendRegisterInfo())}>
                        記録更新
                    </Button>
                </Stack>
            </>)
    }

    // 入力内容送信
    const sendRegisterInfo = async () => {
        // 詳細情報はtextかmarkdownで設定値を切替
        const detailInfo: string = valueUseMarkdown ? valueUseMarkdown : getValues().detail;

        // 送信情報の設定
        const sendInfo = {
            id: info.id,
            title: getValues().title,
            description: getValues().description,
            githubRepo: '',
            detail: detailInfo,
            finished: false,
            refs: getValues().reference
        };
        // 送信し、Responseを受け取る
        const response = await sendRecord(sendInfo);

        if (response.ok) {
            Router.push({ pathname: '/searchRecordPage', query: { status: 'UpdateSuccess' } }, '/searchRecordPage');
        } else {
            Router.push({ pathname: '/searchRecordPage', query: { status: 'UpdateFailed' } }, '/searchRecordPage');
        }

    }

    // 入力画面から遷移した場合は、送信完了を表示
    if (props.fromView == 'inputRecord' && finished) {
        return (
            <SentPart setFinished={setFinished} />
        )
    }

    return (
        <>
            <CommonMeta title={"記録詳細"} />
            <Container maxWidth='md'>
                <Stack pt={4}>
                    {/* パンくずリスト */}
                    <>
                        <CommonBreadcrumbs subDirArr={subDirArr} />
                    </>
                </Stack>
                <Stack spacing={2} pb={4}>
                    <CommonHeadline headLine='記録詳細' />
                </Stack>
                <Grid2 xs={12} md={12}>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Switch onClick={checkData} color='success' />}
                            label='詳細表示 / 更新 切り替え'
                        />
                    </FormGroup>
                </Grid2>
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
