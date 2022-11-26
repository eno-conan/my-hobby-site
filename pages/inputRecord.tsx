import { Container, Divider, MenuItem, MuiThemeProvider, TextField } from '@material-ui/core'
import Button from '@mui/material/Button';
import React, { useState } from 'react'
import Grid2 from '@mui/material/Unstable_Grid2';
import CommonHeadline from '../components/CommonHeadline'
import Paper from '@mui/material/Paper';
import { experimentalStyled as styled } from '@mui/material/styles';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import WriteReferenceLink from './writeReferenceLink';
import { GetServerSideProps } from 'next';
import { Stack } from '@mui/material';

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

const InputRecord = (props: any) => {
    const [repos, setRepos] = useState(['']);

    return (
        <div>
            <Container maxWidth="sm">
                <CommonHeadline headLine='記録追加' />
                <Grid2 container spacing={2}>
                    <Grid2 xs={6} md={6}>
                        Record Title(Character Limit:100)
                    </Grid2>
                    <Grid2 xs={12} md={12}>
                        <TextField id="outlined-basic" label="Record Title" variant="outlined" fullWidth />
                    </Grid2>
                    <Grid2 xs={6} md={6}>
                        Description(Character Limit:300)
                    </Grid2>
                    <Grid2 xs={12} md={12}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            maxRows={5}
                            fullWidth
                        // value={value}
                        // onChange={handleChange}
                        />
                    </Grid2>
                    <Grid2 xs={8} md={8}>
                        GithubRepository(Empty is Ok)
                    </Grid2>
                    <Grid2 xs={12} md={12}>
                        <TextField
                            id="githubRepo"
                            select
                            label="Select GitHub Repository"
                            fullWidth
                            defaultValue=""
                        // value={currency}
                        // onChange={handleChange}
                        // helperText="Please select searchTag"
                        >
                            {props.repos && props.repos.map((option: any) => (
                                <MenuItem key={option.reponame} value={option.reponame}>
                                    {option.reponame}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid2>
                    <Grid2 xs={8} md={8}>
                        Detail(Character Limit:1000)
                    </Grid2>
                    <Grid2 xs={12} md={12}>
                        <TextField
                            id="outlined-multiline-flexible"
                            label="Description"
                            multiline
                            maxRows={30}
                            fullWidth
                        // value={value}
                        // onChange={handleChange}
                        />
                        {/* <TextareaAutosize
                            maxRows={20}
                            aria-label="maximum height"
                            placeholder="詳細をここに入力してください"
                            style={{ width: 500 }}
                        /> */}
                        {/* <MuiMarkdown>abc</MuiMarkdown> */}
                        {/* <MuiThemeProvider>
                            <MarkdownEditor
                                title="Foo"
                                code="# Fancy markdown editor!"
                            />
                        </MuiThemeProvider> */}
                    </Grid2>
                </Grid2>
                <WriteReferenceLink />
                <Divider />
                <Stack direction="row" spacing={2} justifyContent="right">
                    <Button color="secondary">Secondary</Button>
                    <Button variant="contained" color="success">
                        Success
                    </Button>
                </Stack>
            </Container>
        </div>
    )
}

export default InputRecord

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res: any = await GetRepos();
    return { props: { repos: res } };
};

