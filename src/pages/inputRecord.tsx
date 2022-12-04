import { GetServerSideProps, NextPage } from 'next';
import { Box, Container, Divider, MenuItem, TextField, Switch } from '@material-ui/core'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
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
import {
    DESCRIPTION_DISPLAY_VALUE,
    DETAIL_DISPLAY_VALUE,
    GITHUB_REPO_DISPLAY_VALUE,
    REFER_LINK_DISPLAY_VALUE,
    TITLE_DISPLAY_VALUE
} from '../consts/inputField';

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
    const [host, setHost] = useState('');
    useEffect(() => {
        setHost(window.location.href.split('/inputRecord')[0]);
    }, []);

    const { data, error } = useSWR(
        `${host}/api/githubRepos`,
        fetcher
    );

    // タイトル・概要・詳細に関するフォームルールを取得
    const { fields, append, remove, register, handleSubmit, getValues, errors } = inputRecordForm();
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

    // 各入力項目の表示方法を設定
    const inputField = (fieldName: string, label: any, multiline: boolean, selectField: boolean, width: number[], data?: any) => {
        return (
            <>
                <Grid2 xs={width[0]} md={width[0]}>
                    <Box component='span'>
                        {fieldName}
                    </Box>
                </Grid2>
                <Grid2 xs={width[1]} md={width[1]}>
                    <Box component='span'>
                        <TextField
                            variant='outlined'
                            fullWidth
                            id={label}
                            label={label}
                            multiline={multiline}
                            select={selectField}
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
                <Grid2 xs={12} md={12}>
                    {DETAIL_DISPLAY_VALUE}
                </Grid2>
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
                        {inputField('', 'detail', false, false, [6, 12])}
                    </>
                }
            </>
        )
    }

    // 参照リンクの記載箇所
    const referenceField = (index: number) => {
        return (
            <Grid2 container spacing={2}>
                <Grid2 xs={6} alignItems='left'>
                    <Box component='span'>
                        <TextField
                            label='linkTitle'
                            variant='outlined'
                            multiline={false}
                            fullWidth
                            {...register(`reference.${index}.linkTitle`)} />
                        <ErrorMessage errors={errors} name={`reference.${index}.linkTitle`} />
                    </Box>
                </Grid2>
                <Grid2 xs={5} alignItems='left'>
                    <Box component='span'>
                        <TextField
                            label='linkUrl'
                            variant='outlined'
                            multiline={false}
                            fullWidth
                            {...register(`reference.${index}.linkUrl`)} />
                        <ErrorMessage errors={errors} name={`reference.${index}.linkTitle`} />
                    </Box>
                </Grid2>
                <Grid2 xs={1} alignItems='right' paddingTop={2}>
                    <Button onClick={() => remove(index)}><ClearIcon titleAccess='remove reference' /></Button>
                </Grid2>
            </Grid2>
        )
    }

    // 入力内容送信
    const sendRegistInfo = () => {
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
    }

    if (!data) return (
        <Container maxWidth='md'>
            <h4>Loading...</h4>
        </Container>
    );
    return (
        <>
            <CommonDrawer />
            <CommonMeta title={'記録追加'} />
            <Container maxWidth='md'>
                <CommonHeadline headLine='記録追加' />
                <Grid2 container spacing={2}>
                    {/*題名・概要・リポジトリ・詳細 */}
                    {inputField(TITLE_DISPLAY_VALUE, 'title', false, false, [6, 12])}
                    {inputField(DESCRIPTION_DISPLAY_VALUE, 'description', false, false, [6, 12])}
                    {inputField(GITHUB_REPO_DISPLAY_VALUE, 'githubRepo', false, true, [6, 12], data)}
                    {detailField(state.markdown)}
                </Grid2>
                <Stack spacing={2}>
                    <h3>{REFER_LINK_DISPLAY_VALUE}</h3>
                    {fields.map((field: any, index: number) => {
                        return (
                            <>
                                <div key={field.id}>
                                    {referenceField(index)}
                                </div>
                            </>
                        )
                    })}
                </Stack>
                <Button onClick={() => append({ linkTitle: '', linkUrl: '' })}><AddIcon titleAccess='Add reference' /></Button>
                <Divider />
                <Stack direction='row' spacing={2} justifyContent='right'>
                    {/* <Button color='secondary'>Clearとか？</Button> */}
                    <Button variant='contained' color='success' onClick={handleSubmit(d => sendRegistInfo())}>
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

