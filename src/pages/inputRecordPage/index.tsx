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
import CommonDrawer from '../../components/CommonDrawer';
import { useFieldArray } from "react-hook-form"
import LoadingPart from '../../components/LoadingPart';
import ReferencePart from '../../components/ReferencePart';
import MainPart from '../../components/MainPart';
import FileOperatePart from '../../components/FileOperatePart';
import SentPart from '../../components/SentPart';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const fetcher = (url: string) =>
    fetch(url).then(async (res) => {
        return res.json();
    });

// 記録追加確認
const InputRecordPage: NextPage = () => {
    // URLからドメイン取得
    const [host, setHost] = useState('');
    useEffect(() => {
        setHost(window.location.href.split('/inputRecordPage')[0]);
    }, []);
    // gitHubRepository一覧取得
    const { data, error } = useSWR(
        `${host}/api/githubRepos`,
        fetcher
    );

    // タイトル・概要・詳細に関するフォームルールを取得
    const { control, register, handleSubmit, setValue, getValues, errors, reset, setFocus } = inputRecordForm();
    const { fields, append, remove } = useFieldArray({ control, name: 'reference' });
    // text/markdownの状態管理
    const [writeMarkdown, setWriteMarkdown] = React.useState(false);
    // markDownを使用した場合の値を保持
    const [valueUseMarkdown, setValueUseMarkdown] = useState('');
    // 入力完了の画面表示を制御
    const [finished, setFinished] = useState(false)

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
        fetch(`/api/record`, { method, headers, body })
            .then((res) => res.json())
            .then(console.info).catch(console.error);

        //githubのプルダウンが初期化できない・・・(22/12/04) 
        // SentPartで送信完了表示から遷移したら初期化できているぞ(22/12/08)
        reset();
        setValueUseMarkdown('');
        setFinished(true);
    }

    // ローディング中の表示
    if (!data) {
        return (
            <LoadingPart />
        );
    }

    return (
        <>
            {(() => {
                // 送信完了を表示
                if (finished) return (
                    <SentPart setFinished={setFinished} />
                ); else {
                    // 未送信の場合はフォーム表示
                    return (
                        <>
                            <CommonDrawer />
                            <Container maxWidth='md'>
                                {/* メタ情報の設定 */}
                                {/* ページ見出し */}
                                <CommonMeta title={'記録追加'} />
                                {/* フォントサイズと見出しかどうかの引数設定して、FieldNamePartで統一できないか */}
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
                        </>);
                }
            })()}
        </>
    )
}

export default InputRecordPage

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const res: any = await GetRepos();
//     return { props: { repos: res } };
// };

