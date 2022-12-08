import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2';
import { RecordForm } from '../hooks/inputRecordForm';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { Box, TextField } from '@material-ui/core'
import { ErrorMessage } from '@hookform/error-message';


interface Props {
    register: UseFormRegister<RecordForm>;
    errors: Partial<FieldErrorsImpl<RecordForm>>
    label: any;
}


const TextPart = ({ register, errors, label }: Props) => {

    return (
        <>
            <Grid2 xs={12} md={12}>
                <Box component='span'>
                    <TextField
                        variant='outlined'
                        fullWidth
                        id={label}
                        multiline
                        // label={label}
                        {...register(label)}
                    >
                    </TextField>
                </Box>
                <Box sx={{ bgcolor: 'error.main', borderRadius: 2 }}>
                    <ErrorMessage errors={errors} name={label} />
                </Box>
            </Grid2>
        </>
    );
}

export default TextPart
