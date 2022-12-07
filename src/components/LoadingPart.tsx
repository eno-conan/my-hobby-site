import { CircularProgress, Container, Grid } from '@mui/material'
import React from 'react'

const LoadingPart = () => {
    return (
        <div>
            <Container maxWidth='md'>
                <Grid container alignItems='center' justifyContent='center' direction="column">
                    <h1></h1>
                    <h1></h1>
                    <h1></h1>
                    <h2>Loading...</h2>
                    <Grid item xs={12}>
                        <CircularProgress />
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}

export default LoadingPart
