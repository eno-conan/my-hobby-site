import { Button } from '@material-ui/core';
import { CircularProgress, Container, Grid } from '@mui/material'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/Home.module.css'

interface Props {
    setFinished: React.Dispatch<
        React.SetStateAction<boolean>>;
}

const SentPart = ({ setFinished }: Props) => {
    const reInputRecord = () => {
        setFinished(false)
    }
    return (
        <div>
            <Container maxWidth='md'>
                <Grid container alignItems='center' justifyContent='center' direction="column">
                    <h1></h1>
                    <h1></h1>
                    <h1></h1>
                    <b className={styles.sentRecord}>
                        送信完了しました
                    </b>
                    <div className={styles.nextaction}>
                        <Button onClick={reInputRecord}>
                            <div className={styles.nextaction}>
                                詳細を確認する
                            </div>
                        </Button>
                    </div>
                    <div className={styles.nextaction}>
                        <Link href="/inputRecordPage">続けて入力する</Link>
                    </div>
                    <div className={styles.nextaction}>
                        <Link href="/searchRecordPage">一覧を表示する</Link>
                    </div>
                </Grid>
            </Container>
        </div>
    )
}

export default SentPart
