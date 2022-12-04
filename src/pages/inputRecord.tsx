import { GetServerSideProps, NextPage } from 'next';
import { Box, Container, Divider, MenuItem, TextField, Switch } from '@material-ui/core'
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import { experimentalStyled as styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
import React, { useState } from 'react'
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
import CommonInputField from '../components/CommonInputField';

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

    const { data, error } = useSWR(
        'http://localhost:3000/api/githubRepos',
        fetcher
    );

    // タイトル・概要・詳細に関するフォームルールを取得
    const { fields, append, remove, register, handleSubmit, getValues, errors } = inputRecordForm();
    // switchButtonの表示・非表示
    const [checked, setChecked] = useState(false);
    // switchの状態管理
    const [state, setState] = React.useState({
        checkedA: false,
    });

    // TextとMarkDownの切り替え
    const handleChange = (event: any) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    // 各入力項目の表示方法を設定
    // 引数の1つに、テキストボックスか選択肢かを設定してTextFieldの内容を動的に設定できるようにする
    const inputField = (fieldName: string, label: any, multiline: boolean, selectField: boolean, width: number[]) => {
        return (
            <>
                <Grid2 xs={width[0]} md={width[0]}>
                    <Box component="span">
                        {fieldName}
                    </Box>
                </Grid2>
                <Grid2 xs={width[1]} md={width[1]}>
                    <Box component="span">
                        <TextField
                            id={label}
                            label={label}
                            variant="outlined"
                            multiline={multiline}
                            fullWidth
                            {...register(label)}
                        />
                        <ErrorMessage errors={errors} name={label} />
                    </Box>
                </Grid2>
            </>
        );
    }

    // 入力した内容を表示
    const sendRegistInfo = () => {
        const method = 'POST';
        const headers = {
            'Accept': 'application/json'
        };
        const sendInfo = {
            title: getValues().title,
            description: getValues().description,
            githubRepo: getValues().githubRepo,
            detail: getValues().detail,
            reference: getValues().reference
        };
        const body = JSON.stringify(sendInfo);
        fetch('http://localhost:3000/api/record', { method, headers, body })
            .then((res) => res.json())
            .then(console.log).catch(console.error);
    }

    if (!data) return (
        <Container maxWidth="md">
            <h4>Loading...</h4>
        </Container>
    );
    return (
        <>
            <CommonDrawer />
            <CommonMeta title={"記録追加"} />
            <Container maxWidth="md">
                <CommonHeadline headLine='記録追加' />
                <Grid2 container spacing={2}>
                    {/* 項目の一覧に関する配列使ったらもっとみやすくなるかも */}
                    {inputField("Record Title (character limit:1-100)", "title", false, false, [6, 12])}
                    {/* <CommonInputField fieldName={''} label={'title'} multiline={false} selectField={false} register={register} errors={errors} /> */}
                    {inputField("Description (character limit:1-300)", "description", false, false, [6, 12])}
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
                            {...register('githubRepo')}
                        >
                            {data && data.map((option: any) => (
                                <MenuItem key={option.reponame} value={option.reponame}>
                                    {option.reponame}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid2>
                    <Grid2 xs={12} md={12}>
                        <FormGroup row>
                            <FormControlLabel
                                control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                                label="Write Markdown"
                            />
                        </FormGroup>
                    </Grid2>
                    {state.checkedA ? <>
                        <Grid2 xs={12} md={12}>
                            Detail (character limit:1-1000)
                        </Grid2>
                        <Grid2 xs={12} md={12}>
                            {/* 記載と表示で別ファイルにしようかな */}
                            <WriteMarkdown />
                        </Grid2>
                    </> : <>
                        {inputField(" Detail (character limit:1-1000)", "detail", false, false, [6, 12])}
                    </>}
                </Grid2>
                <div>
                    <h3>参照リンク追加</h3>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id}>
                                <Grid2 container spacing={2}>
                                    <Grid2 xs={5} alignItems="left">
                                        <Box component="span">
                                            <TextField
                                                id="outlined-basic"
                                                label="linkTitle"
                                                variant="outlined"
                                                multiline={false}
                                                fullWidth
                                                {...register(`reference.${index}.linkTitle`)} />
                                            <ErrorMessage errors={errors} name={`reference.${index}.linkTitle`} />
                                        </Box>
                                    </Grid2>
                                    <Grid2 xs={5} alignItems="left">
                                        <Box component="span">
                                            <TextField
                                                id="outlined-basic"
                                                label="linkUrl"
                                                variant="outlined"
                                                multiline={false}
                                                fullWidth
                                                {...register(`reference.${index}.linkUrl`)} />
                                            <ErrorMessage errors={errors} name={`reference.${index}.linkTitle`} />
                                        </Box>
                                    </Grid2>
                                    <Button onClick={() => remove(index)}><ClearIcon titleAccess='remove reference' /></Button>
                                </Grid2>
                            </div>
                        )
                    })}
                </div>
                <Button onClick={() => append({ linkTitle: '', linkUrl: '' })}><AddIcon titleAccess='Add reference' /></Button>
                <Divider />
                <Stack direction="row" spacing={2} justifyContent="right">
                    <Button color="secondary">Clearとか？</Button>
                    <Button variant="contained" color="success" onClick={handleSubmit(d => sendRegistInfo())}>
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

