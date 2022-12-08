import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2';
import { Box } from '@material-ui/core';

interface Props {
    fieldName: string;
}

const FieldNamePart = ({ fieldName }: Props) => {
    return (
        <>
            <Box component='span' fontSize={18}>
                <Grid2 xs={12} md={12}>
                    {fieldName}
                </Grid2>
            </Box>
        </>)
}

export default FieldNamePart
