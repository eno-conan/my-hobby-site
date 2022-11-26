import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Grid from '@material-ui/core/Grid';
import Grid2 from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import CommonMeta from '../components/CommonMeta';
import CommonDrawer from '../components/CommonDrawer';
import { GetServerSideProps } from 'next';
import { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { UserForm, useUserForm } from '../hooks/useUserForm';
import { InputField } from '../components/InputField';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { IQiitaArticle, sampleArticles, tags } from '../consts/qiita';
import Box from '@mui/material/Box';
import { Divider } from '@material-ui/core';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { Stack } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';

// デザイン適用
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

// データ取得
const LatestArticles = async () => {
    const response = await fetch('http://localhost:3000/api/qiita');
    const res = await response.json();
    return res;
}

const Qiita = (props: any) => {
    const [articles, setArticles] = useState(sampleArticles);
    const { handleSubmit, errors, fieldValues }: UserForm = useUserForm()

    const handleValid: any = (data: any, event: any) => alert("OK")
    const handleInvalid: any = (errors: any, event: any) => alert("INVALID")
    const [currency, setCurrency] = React.useState('EUR');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrency(event.target.value);
    };

    function handleClick() {
        setArticles(props.articles);
    }

    return (
        <>
            <CommonMeta title={"Qiita"} />
            <CommonDrawer />
            {/* <form onSubmit={handleSubmit(handleValid, handleInvalid)} noValidate>
                <div>名前:</div>
                <InputField {...fieldValues.name} errors={errors.name} />
                <div>メール:</div>
                <InputField {...fieldValues.email} errors={errors.email} />
                <button>submit</button>
            </form> */}
            <Container maxWidth="sm">
                <div>
                    <h3>Hello</h3>
                </div>
                <Grid2 container spacing={2}>
                    <Grid2 xs={6} alignItems="center">
                        <Box component="span" sx={{ p: 6 }}>
                            <TextField
                                id="outlined-select-currency"
                                select
                                label="Select Tag"
                                value={currency}
                                onChange={handleChange}
                                helperText="Please select searchTag"
                            >
                                {tags.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Box>
                    </Grid2>
                    <Grid2 xs={6}>
                        <Box component="span" sx={{ p: 2 }}>
                            <TextField
                                id="outlined-multiline-static"
                                label="target date"
                                placeholder="yyyy/mm/dd"
                            />
                        </Box>
                    </Grid2>
                </Grid2>
                <Grid2 container spacing={2}>
                    <Grid2 xs={10}>
                        {/* <Item></Item> */}
                    </Grid2>
                    <Grid2 xs={2}>
                        <Item>
                            <Button onClick={handleClick} variant="text">取得</Button>
                        </Item>
                    </Grid2>
                </Grid2>
                <Divider />
                <div>
                    {/* この部分のレイアウトは要検討 */}
                    <Grid container spacing={2}>
                        {
                            props.articles.map((book: IQiitaArticle) => (
                                <Grid item xs={12} sm={6}>
                                    <Paper>
                                        <Card sx={{ height: 200 }}>
                                            <CardContent>
                                                <Typography gutterBottom variant="inherit" component="div">
                                                    {book.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" component="div">
                                                    <Link href={book.url} legacyBehavior>
                                                        <a target="_blank">ページを表示</a>
                                                    </Link>
                                                </Typography>
                                                <IconButton aria-label="add to favorites">
                                                    <FavoriteIcon fontSize="small" titleAccess='number of likes' />
                                                </IconButton>
                                                {book.likesCount}
                                                <IconButton aria-label="add to favorites">
                                                    <SaveIcon fontSize="small" titleAccess='number of stocks' />
                                                </IconButton>
                                                {book.stocksCount}
                                            </CardContent>
                                            <CardActions>
                                            </CardActions>
                                        </Card>
                                    </Paper>
                                </Grid>
                            ))
                        }
                    </Grid>
                </div>
                {/* <div>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" }, // <-- 画面幅によって切り替える。
                            alignItems: { xs: 'center', md: 'flex-start' }, // <-- 画面幅によって切り替える。
                            color: "white",
                            bgcolor: { xs: "darkred", md: "blue" },
                        }}
                    >
                        <Box>1</Box>
                        <Box>2</Box>
                    </Box>
                </div> */}
            </Container>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const res: any = await LatestArticles();
    return { props: { articles: res } };
};

export default Qiita