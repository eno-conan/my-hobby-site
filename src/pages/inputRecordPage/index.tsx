import { NextPage } from 'next';
import { Box, Container, Divider, Grid } from '@material-ui/core'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Stack, } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CommonHeadline from '../../components/CommonHeadline';
import inputRecordForm from '../../hooks/inputRecordForm';
import CommonMeta from '../../components/CommonMeta';
import { useFieldArray } from "react-hook-form"
import LoadingPart from '../../components/LoadingPart';
import ReferencePart from '../../components/ReferencePart';
import Router from "next/router";
import sendRecord from '../../hooks/sendRecord';
import CommonBreadcrumbs from '../../components/CommonBreadcrumbs';
import FieldNamePart from '../../components/FieldNamePart';
import TextPart from '../../components/TextPart';
import Grid2 from '@mui/material/Unstable_Grid2';
import { DESCRIPTION_DISPLAY_VALUE, DESCRIPTION_LITERAL_LENGTH, DETAIL_DISPLAY_VALUE, MAIN_ITEM_DISPLAY_VALUE, TITLE_DISPLAY_VALUE, TITLE_LITERAL_LENGTH } from '../../consts/inputField';
import DetailPart from '../../components/DetailPart';
import FileTemplateDownload from '../../components/FileTemplateDownload';
import FileDragDrop from '../../components/FileDragDrop';
import { ErrorMessage } from '@hookform/error-message';
// import useSWR from 'swr';
// import { fetcher } from '../../hooks/fetcher';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// パンくずリストのための階層配列
const subDirArr = ['inputRecordPage']

// 記録追加確認
const InputRecordPage: NextPage = () => {
    // gitHubRepository一覧取得
    const [host, setHost] = useState('');
    useEffect(() => {
        setHost(new URL(window.location.href).origin);
    }, []);
    // const { data, error } = useSWR(
    //     `${host}/api/githubRepos`,
    //     fetcher
    // );

    // タイトル・概要・詳細に関するフォームルールを取得
    const { control, register, handleSubmit, setValue, getValues, errors } = inputRecordForm();
    const { fields, append, remove } = useFieldArray({ control, name: 'reference' });
    // markDownを使用した場合の値を保持
    const [valueUseMarkdown, setValueUseMarkdown] = useState('');

    // 入力内容送信
    const sendRegisterInfo = async () => {
        // 詳細情報はtextかmarkdownで設定値を切替
        let detailInfo: string = '';
        if (valueUseMarkdown) {
            detailInfo = valueUseMarkdown;
        } else {
            detailInfo = getValues().detail
        }
        // 送信情報の設定
        const sendInfo = {
            title: getValues().title,
            description: getValues().description,
            githubRepo: '',
            detail: detailInfo,
            finished: false,
            refs: getValues().reference
        };

        // 送信し、Responseを受け取る
        const response = await sendRecord(sendInfo);

        let maxId: number = 0;
        if (response.ok) {
            // レスポンスから登録した記録の記録IDを取得
            maxId = await (await response).json();
        }

        Router.push({
            pathname: `/targetRecordPage/${maxId}`,
            query: {
                id: maxId,
                host: host,
                fromView: 'inputRecord'
            }
        }, `/targetRecordPage/${maxId}`);
    }

    // ローディング中の表示
    if (!host) {
        return (
            <LoadingPart />
        );
    }

    // タイトル・概要・詳細記載箇所
    const titleDescriptionDetailArea = () => {
        return (
            <>
                <Grid2 container spacing={2} paddingLeft={4}>
                    <FieldNamePart fieldName={`${TITLE_DISPLAY_VALUE}${TITLE_LITERAL_LENGTH}`} />
                    <Grid2 xs={12} md={12}>
                        {/*題名・概要 */}
                        <TextPart
                            register={register} label={'title'} />
                        <Box sx={{ bgcolor: 'error.main', borderRadius: 2 }}>
                            <ErrorMessage errors={errors} name={'title'} />
                        </Box>
                    </Grid2>
                    <FieldNamePart fieldName={`${DESCRIPTION_DISPLAY_VALUE}${DESCRIPTION_LITERAL_LENGTH}`} />
                    <Grid2 xs={12} md={12}>
                        <TextPart
                            register={register} label={'description'} />
                        <Box sx={{ bgcolor: 'error.main', borderRadius: 2 }}>
                            <ErrorMessage errors={errors} name={'description'} />
                        </Box>
                    </Grid2>
                    {/* リポジトリ */}
                    {/* <FieldNamePart fieldName={GITHUB_REPO_DISPLAY_VALUE} /> */}
                    {/* <PulldownPart label={'githubRepo'} register={register} errors={errors} data={data} /> */}
                    {/* 詳細 */}
                    <FieldNamePart fieldName={DETAIL_DISPLAY_VALUE} />
                    <Grid2 xs={12} md={12}>
                        <DetailPart register={register} errors={errors} valueUseMarkdown={valueUseMarkdown} setValueUseMarkdown={setValueUseMarkdown} />
                    </Grid2>
                </Grid2>
            </>
        )
    }

    {/* ファイルアップロード・ダウンロード機能 */ }
    const fileUploadDownloadArea = () => {
        return (
            <>
                <FileTemplateDownload />
                <FileDragDrop setValue={setValue} />
            </>
        )
    }

    return (
        <>
            <Container maxWidth='md'>
                {/* メタ情報の設定 */}
                <CommonMeta title={'記録追加'} />
                {/* パンくずリスト */}
                <Stack pt={4}>
                    <CommonBreadcrumbs subDirArr={subDirArr} />
                </Stack>
                {/* ページ見出し */}
                <CommonHeadline headLine='記録追加' />
                {fileUploadDownloadArea()}
                <Divider />
                {/* 主要項目記載 */}
                <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={20}>
                    <h3>{MAIN_ITEM_DISPLAY_VALUE}</h3>
                </Box>
                {titleDescriptionDetailArea()}
                {/* 参照リンクの記載箇所 */}
                <ReferencePart register={register} errors={errors} fields={fields} append={append} remove={remove} />
                {/* 送信 */}
                <Stack direction='row' justifyContent='right' pb={4}>
                    <Button variant='contained' color='success' onClick={handleSubmit(d => sendRegisterInfo())}>
                        記録作成
                    </Button>
                </Stack>
            </Container>

        </>
    )
}

export default InputRecordPage

