import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2';
import { RecordForm } from '../hooks/inputRecordForm';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { Box, TextField } from '@material-ui/core'
import { ErrorMessage } from '@hookform/error-message';


interface Props {
    register: UseFormRegister<RecordForm>;
    // errors: Partial<FieldErrorsImpl<RecordForm>>;
    label: any;
}


const TextPart = ({ register, label }: Props) => {

    return (
        <>
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
        </>
    );
}

export default TextPart
