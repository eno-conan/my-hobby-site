import React from 'react'
import { Box, Grid } from '@material-ui/core'
import Grid2 from '@mui/material/Unstable_Grid2';
import { Link, Stack, Typography } from '@mui/material';

const TemplateDownload = () => {
    return (
        <>
            <Stack direction='row' justifyContent='right' paddingBottom={2}>
                <Grid2 container>
                    <Grid item xs={12} sm={12}></Grid>
                    <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={16}>
                        <Link href="/template.md" download>
                            <Typography fontSize="18px">テンプレートダウンロード</Typography>
                        </Link>
                    </Box>
                </Grid2>
            </Stack>
        </>
    )
}

export default TemplateDownload
