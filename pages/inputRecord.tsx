import { Container, Divider, MenuItem, MuiThemeProvider, TextField } from '@material-ui/core'
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2';
import CommonHeadline from '../components/CommonHeadline'
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import WriteReferenceLink from './writeReferenceLink';
import { GetServerSideProps } from 'next';
import { Stack } from '@mui/material';
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod';
import { ErrorMessage } from '@hookform/error-message';
import {
    SubmitErrorHandler as SubmitErrorHandlerOriginal,
    SubmitHandler as SubmitHandlerOriginal,
    useForm,
    UseFormRegisterReturn,
} from "react-hook-form"

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

// 入力項目を設定
const schema = z.object({
    title: z.string().min(5),
    description: z.string().max(3),
})

type FormValues = z.infer<typeof schema>
const defaultValues: FormValues = { title: "", description: "" } as const

const InputRecord = (props: any) => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm({
        mode: 'onSubmit',
        resolver: zodResolver(schema),
        defaultValues: defaultValues,
    });

    // 入力した内容を表示してみる
    const tmp = () => {
        console.log(getValues());
    }

    const eachField = (content: any, label: any, variant: any, registerName: any, multiline: any, maxRows: any) => {
        return (
            <>
                <Grid2 xs={6} md={6}>
                    {content}
                </Grid2>
                <Grid2 xs={12} md={12}>
                    <TextField
                        id="outlined-basic"
                        label={label}
                        variant={variant}
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

    return (
        <div>
            <Container maxWidth="md">
                <CommonHeadline headLine='記録追加' />
                <Grid2 container spacing={2}>
                    {eachField("Record Title(Character Limit:100)", "Record Title", "outlined", "title", false, 0)}
                    {eachField("Description(Character Limit:300)", "Description", "outlined", "description", true, 5)}
                    <Grid2 xs={6} md={6}>
                        GithubRepository(Empty is Ok)
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
                    {eachField("Detail(Character Limit:1000)", "Detail", "outlined", "description", true, 30)}
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

