import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2';
import { Box, Container, Divider, MenuItem, TextField } from '@material-ui/core'
import { ErrorMessage } from '@hookform/error-message';

const CommonInputField =
    (fieldName: string, label: string, multiline: boolean, selectField: boolean, register: any, errors: any) => {
        return (
            <>
                <Grid2 xs={6} md={6} alignItems="left">
                    {fieldName}
                </Grid2>
                <Grid2 xs={12} md={12} >
                    <TextField
                        variant="outlined"
                        fullWidth
                        id={label}
                        label={label}
                        multiline={multiline}
                        select={selectField}
                        {...register(label)}
                    />
                    <ErrorMessage errors={errors} name={label} />
                </Grid2>
            </>
        )
    }

export default CommonInputField
