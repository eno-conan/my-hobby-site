import { GetServerSideProps, NextPage } from 'next';
import { Container, Divider } from '@material-ui/core'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Stack, } from '@mui/material';
import React, { useEffect, useReducer, useState } from 'react'
import CommonHeadline from '../../components/CommonHeadline';
import inputRecordForm from '../../hooks/inputRecordForm';
import CommonMeta from '../../components/CommonMeta';
import useSWR from 'swr';
import { useFieldArray } from "react-hook-form"
import LoadingPart from '../../components/LoadingPart';
import ReferencePart from '../../components/ReferencePart';
import MainPart from '../../components/MainPart';
import FileOperatePart from '../../components/FileOperatePart';
import { fetcher } from '../../hooks/fetcher';
import Router from "next/router";
import sendRecord from '../../hooks/sendRecord';
import CommonBreadcrumbs from '../../components/CommonBreadcrumbs';

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
    const { data, error } = useSWR(
        `${host}/api/githubRepos`,
        fetcher
    );

    // タイトル・概要・詳細に関するフォームルールを取得
    const { control, register, handleSubmit, setValue, getValues, errors } = inputRecordForm();
    const { fields, append, remove } = useFieldArray({ control, name: 'reference' });
    // text/markdownの状態管理
    const [writeMarkdown, setWriteMarkdown] = React.useState(false);
    // markDownを使用した場合の値を保持
    const [valueUseMarkdown, setValueUseMarkdown] = useState('');

    // 入力内容送信
    const sendRegisterInfo = async () => {
        // 詳細情報はtextかmarkdownで設定値を切替
        let detailInfo: string = '';
        if (writeMarkdown) {
            detailInfo = valueUseMarkdown;
        } else {
            detailInfo = getValues().detail
        }
        // 送信情報の設定
        const sendInfo = {
            title: getValues().title,
            description: getValues().description,
            githubRepo: getValues().githubRepo,
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
    if (!data) {
        return (
            <LoadingPart />
        );
    }

    return (
        <>
            <Container maxWidth='md'>
                {/* メタ情報の設定 */}
                <CommonMeta title={'記録追加'} />
                <Stack pt={4}>
                    {/* パンくずリスト */}
                    <CommonBreadcrumbs subDirArr={subDirArr} />
                </Stack>
                {/* フォントサイズと見出しかどうかの引数設定して、FieldNamePartで統一できないか */}
                {/* ページ見出し */}
                <CommonHeadline headLine='記録追加' />
                {/* ファイルアップロード・ダウンロード機能 */}
                <FileOperatePart setValue={setValue} />
                <Divider />
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
            </Container>

        </>
    )
}

export default InputRecordPage

