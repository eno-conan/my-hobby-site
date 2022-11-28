import { GetServerSideProps } from 'next';
import { Container, Divider, MenuItem, TextField } from '@material-ui/core'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import React, { useState } from 'react'
import CommonHeadline from '../components/CommonHeadline'
import WriteReferenceLink from './writeReferenceLink';
import { ErrorMessage } from '@hookform/error-message';
import inputRecordForm from '../hooks/inputRecordForm';
import CommonMeta from '../components/CommonMeta';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// データ取得
const GetRepos = async () => {
    const response = await fetch('http://localhost:3000/api/githubRepos');
    const res = await response.json();
    return res!;
}

// 記録追加
const InputRecord = (props: any) => {

    // タイトル・概要・詳細に関するフォームルールを取得
    const { register, handleSubmit, getValues, errors } = inputRecordForm();

    // 各入力項目の表示方法を設定
    const eachField = (content: any, label: any, registerName: any, multiline: any, maxRows: any) => {
        return (
            <>
                <Grid2 xs={6} md={6}>
                    {content}
                </Grid2>
                <Grid2 xs={12} md={12}>
                    <TextField
                        id="outlined-basic"
                        label={label}
                        variant="outlined"
                        multiline={multiline}
                        fullWidth
                        maxRows={maxRows}
                        {...register(registerName)}
                    />
                    <ErrorMessage errors={errors} name={registerName} />
                </Grid2>
            </>
        );
    }

    // 入力した内容を表示してみる
    const tmp = () => {
        const method = 'POST';
        const headers = {
            'Accept': 'application/json'
        };
        const sendInfo = {
            title: getValues().title,
            description: getValues().description,
            detail: getValues().detail
        };
        const body = JSON.stringify(sendInfo);
        fetch('http://localhost:3000/api/record', { method, headers, body })
            .then((res) => res.json())
            .then(console.log).catch(console.error);
    }

    return (
        <div>
            <CommonMeta title={"記録追加"} />
            <Container maxWidth="md">
                <CommonHeadline headLine='記録追加' />
                <Grid2 container spacing={2}>
                    {/* 項目の一覧に関する配列使ったらもっとみやすくなるかも */}
                    {eachField("Record Title (character limit:1-100)", "Record Title", "title", false, 0)}
                    {eachField("Description (character limit:1-300)", "Description", "description", true, 5)}
                    <Grid2 xs={6} md={6}>
                        Github Repository(Empty is Ok)
                    </Grid2>
                    <Grid2 xs={12} md={12}>
                        <TextField
                            id="githubRepo"
                            select
                            label="Select GitHub Repository"
                            fullWidth
                            defaultValue=""
                        >
                            {props.repos && props.repos.map((option: any) => (
                                <MenuItem key={option.reponame} value={option.reponame}>
                                    {option.reponame}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid2>
                    {eachField("Detail (character limit:1-1000)", "Detail(write MarkDown...)", "detail", true, 30)}
                </Grid2>
                <WriteReferenceLink />
                <Divider />
                <Stack direction="row" spacing={2} justifyContent="right">
                    <Button color="secondary">Clearとか？</Button>
                    <Button variant="contained" color="success" onClick={handleSubmit(d => tmp())}>
                        Success
                    </Button>
                </Stack>
            </Container>
        </div >
    )

}

export default InputRecord

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res: any = await GetRepos();
    return { props: { repos: res } };
};

