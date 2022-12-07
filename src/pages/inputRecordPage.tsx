import { GetServerSideProps, NextPage } from 'next';
import { Box, Container, Divider, MenuItem, TextField, Switch, Grid } from '@material-ui/core'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Link, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import CommonHeadline from '../components/CommonHeadline';
import { ErrorMessage } from '@hookform/error-message';
import inputRecordForm from '../hooks/inputRecordForm';
import CommonMeta from '../components/CommonMeta';
import AddIcon from '@mui/icons-material/Add';
import useSWR from 'swr';
import CommonDrawer from '../components/CommonDrawer';
import WriteMarkdown from './DetailMarkdownPart';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import {
    DESCRIPTION_DISPLAY_VALUE,
    DETAIL_DISPLAY_VALUE,
    GITHUB_REPO_DISPLAY_VALUE,
    MAIN_ITEM_DISPLAY_VALUE,
    REFER_LINK_DISPLAY_VALUE,
    TITLE_DISPLAY_VALUE
} from '../consts/inputField';
import { useFieldArray } from "react-hook-form"
import FileOperatePart from './FileOperatePart';
import LoadingPart from './LoadingPart';
import ReferencePart from './ReferencePart';
import DetailPart from './DetailPart';
import TextPart from './TextPart';
import MainPart from './MainPart';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// データ取得
// const GetRepos = async () => {
//     const response = await fetch('http://localhost:3000/api/githubRepos');
//     const res = await response.json();
//     return res!;
// }

const fetcher = (url: string) =>
    fetch(url).then(async (res) => {
        return res.json();
    });

// 記録追加
const inputRecordPage: NextPage = () => {
    // URLからドメイン取得
    const [host, setHost] = useState('');
    useEffect(() => {
        setHost(window.location.href.split('/inputRecord')[0]);
    }, []);
    // gitHubRepository一覧取得
    const { data, error } = useSWR(
        `${host}/api/githubRepos`,
        fetcher
    );

    // タイトル・概要・詳細に関するフォームルールを取得
    const { control, register, handleSubmit, getValues, errors, reset, setFocus } = inputRecordForm();
    const { fields, append, remove } = useFieldArray({ control, name: 'reference' });
    // switchの状態管理
    const [state, setState] = React.useState({
        markdown: false,
    });
    // markDownを使用した場合の値管理
    const [valueUseMarkdown, setValueUseMarkdown] = useState('');

    // 参照リンク以下
    const referencePart = () => {
        return (
            <>
                <Stack spacing={2}>
                    <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={20}>
                        <h3>{REFER_LINK_DISPLAY_VALUE}</h3>
                    </Box>
                    <Box sx={{ color: 'primary.success', pl: 4 }}>
                        {fields.map((field: any, index: number) => {
                            return (
                                <>
                                    <div key={field.id}>
                                        <ReferencePart
                                            index={index}
                                            register={register}
                                            errors={errors}
                                            remove={remove}
                                        />
                                    </div>
                                </>
                            )
                        })}
                    </Box>
                </Stack>
                <Box sx={{ color: 'primary.success', pt: 2, pl: 4 }}>
                    <Button onClick={() => append({ linkTitle: '', linkUrl: '' })}><AddIcon titleAccess='Add reference' /></Button>
                </Box>
            </>
        )
    }

    // 入力内容送信
    const sendRegisterInfo = () => {
        const method = 'POST';
        const headers = {
            'Accept': 'application/json'
        };
        // 詳細情報はtextかmarkdownで設定値を切替
        let detailInfo: string = '';
        if (state.markdown) {
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
            reference: getValues().reference
        };
        const body = JSON.stringify(sendInfo);
        fetch(`${host}/api/record`, { method, headers, body })
            .then((res) => res.json())
            .then(console.log).catch(console.error);
        //githubのプルダウンが初期化できない・・・(22/12/04) 
        reset();
        setValueUseMarkdown('');
        setFocus('title');
    }

    // ローディング中の表示
    if (!data) return (
        <LoadingPart />
    );

    return (
        <>
            <CommonDrawer />
            <Container maxWidth='md'>
                <CommonMeta title={'記録追加'} />
                <CommonHeadline headLine='記録追加' />
                {/* ファイルアップロード・ダウンロード機能 */}
                <FileOperatePart />
                <Divider />
                {/* 主な事項を記載する箇所 */}
                <MainPart
                    register={register} errors={errors} setValueUseMarkdown={setValueUseMarkdown} data={data} />
                {/* 参照リンクの記載箇所 */}
                <Box>
                    {referencePart}
                </Box>
                <Stack direction='row' spacing={2} justifyContent='right'>
                    <Button variant='contained' color='success' onClick={handleSubmit(d => sendRegisterInfo())}>
                        Success
                    </Button>
                </Stack>
            </Container>
        </>
    )

}

export default inputRecordPage

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const res: any = await GetRepos();
//     return { props: { repos: res } };
// };

