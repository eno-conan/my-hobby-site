import React from 'react'
import DetailPart from './DetailPart'
import TextPart from './TextPart'
import { Box } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2';
import { MenuItem, TextField } from '@material-ui/core'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { RecordForm } from '../hooks/inputRecordForm'

interface Props {
    label: any;
    register: UseFormRegister<RecordForm>;
    errors: Partial<FieldErrorsImpl<RecordForm>>;
    data?: any;
}

// プルダウンのデータ表示
const PulldownPart = ({ label, register, errors, data }: Props) => {
    return (
        <>
            <Grid2 xs={12} md={12}>
                <Box component='span'>
                    <TextField
                        variant='outlined'
                        fullWidth
                        id={label}
                        label={label}
                        select={true}
                        defaultValue={''}
                        {...register(label)}
                    >
                        {/* Github専用だけども */}
                        {data ?
                            data.map((option: any) => (
                                <MenuItem key={option.reponame} value={option.reponame}>
                                    {option.reponame}
                                </MenuItem>
                            ))
                            :
                            <></>
                        }
                    </TextField>
                </Box>
                <Box sx={{ bgcolor: 'error.main', borderRadius: 2 }}>
                    <ErrorMessage errors={errors} name={label} />
                </Box>
            </Grid2>
        </>
    );
}

export default PulldownPart
