import React from 'react'
import Grid2 from '@mui/material/Unstable_Grid2';
import { RecordForm } from '../hooks/inputRecordForm';
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { Box, TextField } from '@material-ui/core'
import { ErrorMessage } from '@hookform/error-message';


interface Props {
    register: UseFormRegister<RecordForm>;
    errors: Partial<FieldErrorsImpl<RecordForm>>
    fieldName: string;
    label: any;
}


const TextPart = ({ register, errors, fieldName, label }: Props) => {
    // フィールド名表示用のメソッド
    const fieldNamePart = (fieldName: string) => {
        return (
            <>
                <Grid2 xs={12} md={12}>
                    {fieldName}
                </Grid2>
            </>)
    }

    return (
        <>
            <Box component='span' fontSize={18}>
                {fieldNamePart(fieldName)}
            </Box>
            <Grid2 xs={12} md={12}>
                <Box component='span'>
                    <TextField
                        variant='outlined'
                        fullWidth
                        id={label}
                        label={label}
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
