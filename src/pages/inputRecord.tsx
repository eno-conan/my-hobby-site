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
import ClearIcon from '@mui/icons-material/Clear';
import useSWR from 'swr';
import CommonDrawer from '../components/CommonDrawer';
import WriteMarkdown from './WriteMarkdown';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import CircularProgress from '@mui/material/CircularProgress';
import {
    DESCRIPTION_DISPLAY_VALUE,
    DETAIL_DISPLAY_VALUE,
    GITHUB_REPO_DISPLAY_VALUE,
    MAIN_ITEM_DISPLAY_VALUE,
    REFER_LINK_DISPLAY_VALUE,
    TITLE_DISPLAY_VALUE
} from '../consts/inputField';
import DragDropRef from './dragDropRef';
import TemplateDownload from './templateDownload';

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
const InputRecord: NextPage = () => {
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
    const { fields, append, remove, register, handleSubmit, getValues, errors, reset, setFocus } = inputRecordForm();
    // switchの状態管理
    const [state, setState] = React.useState({
        markdown: false,
    });
    // markDownを使用した場合の値管理
    const [valueUseMarkdown, setValueUseMarkdown] = useState('');
    // TextとMarkDownの切り替え
    const handleChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // フィールド名表示用のメソッド
    const fieldNamePart = (fieldName: string) => {
        return (
            <>
                <Grid2 xs={12} md={12}>
                    {fieldName}
                </Grid2>
            </>)
    }

    // 各入力項目の表示方法を設定
    const inputField = (fieldName: string, label: any, multiline: boolean, selectField: boolean, data?: any) => {
        return (
            <>
                <Box component='span' fontSize={18}>
                    {fieldNamePart(fieldName)}
                </Box>
                <Grid2 xs={12} md={12}>
                    <Box component='span'>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id={label}
                            label={label}
                            multiline={multiline}
                            select={selectField}
                            defaultValue={''}
                            {...register(label)}
                        >
                            {/* Github専用だけども */}
                            {data ?
                                data.map((option: any) => (
                                    <MenuItem key={option.reponame} value={option.reponame}>
                                        {option.reponame}
                                    </MenuItem>
                                ))
                                :
                                <></>
                            }
                        </TextField>
                    </Box>
                    <Box sx={{ bgcolor: 'error.main', borderRadius: 2 }}>
                        <ErrorMessage errors={errors} name={label} />
                    </Box>
                </Grid2>
            </>
        );
    }

    // 詳細部分の表示
    const detailField = (markdown: boolean) => {
        return (
            <>
                <Box component='span' fontSize={18}>
                    {fieldNamePart(DETAIL_DISPLAY_VALUE)}
                </Box>
                <Grid2 xs={12} md={12}>
                    <FormGroup row>
                        <FormControlLabel
                            control={<Switch checked={state.markdown} onChange={handleChange} name='markdown' />}
                            label='Markdownで記述'
                        />
                    </FormGroup>
                </Grid2>
                {state.markdown ?
                    <>
                        <Grid2 xs={12} md={12}>
                            <WriteMarkdown setValueUseMarkdown={setValueUseMarkdown} />
                        </Grid2>
                    </>
                    :
                    <>
                        {inputField('', 'detail', false, false)}
                    </>
                }
            </>
        )
    }

    // Reference系を別クラスに
    // 参照リンクの記載箇所
    const referenceField = (index: number) => {
        const fieldsWidth: number[] = [6, 5]
        return (
            <Grid2 container spacing={2}>
                {fieldsWidth.map((width: number, idx: number) => {
                    return (
                        <>
                            <Grid2 xs={width} alignItems='left'>
                                <Box component='span'>
                                    {idx == 0 ? (
                                        <>
                                            <TextField
                                                label='linkTitle'
                                                variant='outlined'
                                                fullWidth
                                                {...register(`reference.${index}.linkTitle`)} />
                                            <ErrorMessage errors={errors} name={`reference.${index}.linkTitle`} />
                                        </>)
                                        :
                                        (<>
                                            <TextField
                                                label='linkUrl'
                                                variant='outlined'
                                                fullWidth
                                                {...register(`reference.${index}.linkUrl`)} />
                                            <ErrorMessage errors={errors} name={`reference.${index}.linkUrl`} />
                                        </>)}
                                </Box>
                            </Grid2>
                        </>
                    )
                })}
                <Grid2 xs={1} alignItems='right' paddingTop={3}>
                    <Button onClick={() => remove(index)}><ClearIcon titleAccess='remove reference' /></Button>
                </Grid2>
            </Grid2>
        )
    }

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
                                        {referenceField(index)}
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

    // ファイルアップロード・ダウンロード機能
    const fileUploadDownloadPart = () => {
        return (
            <>
                <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={16}>
                    {TemplateDownload}
                </Box>
                <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={16}>
                    {DragDropRef}
                </Box>
            </>)
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
        <Container maxWidth='md'>
            <Grid container spacing={4} alignItems='center' justifyContent='center' direction="column">
                <h1></h1>
                <h1></h1>
                <h1></h1>
                <h2>Loading...</h2>
                <Grid item xs={12}>
                    <CircularProgress />
                </Grid>
            </Grid>
        </Container>
    );
    return (
        <>
            <CommonDrawer />
            <Container maxWidth='md'>
                <CommonMeta title={'記録追加'} />
                <CommonHeadline headLine='記録追加' />
                {/* ファイルアップロード・ダウンロード機能 */}
                <Box>
                    {fileUploadDownloadPart}
                </Box>
                <Divider />
                {/* 入力箇所 */}
                <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={20}>
                    <h3>{MAIN_ITEM_DISPLAY_VALUE}</h3>
                </Box>
                <Grid2 container spacing={2} paddingLeft={4}>
                    {/*題名・概要・リポジトリ・詳細 */}
                    {/* 汚いから修正したい */}
                    {inputField(TITLE_DISPLAY_VALUE, 'title', false, false)}
                    {inputField(DESCRIPTION_DISPLAY_VALUE, 'description', false, false)}
                    {inputField(GITHUB_REPO_DISPLAY_VALUE, 'githubRepo', false, true, data)}
                    {detailField(state.markdown)}
                </Grid2>
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

export default InputRecord

// export const getServerSideProps: GetServerSideProps = async (context) => {
//     const res: any = await GetRepos();
//     return { props: { repos: res } };
// };

