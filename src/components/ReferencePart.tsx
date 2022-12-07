import React from 'react'
import { REFER_LINK_DISPLAY_VALUE } from '../consts/inputField'
import { Box, TextField, Switch, Grid } from '@material-ui/core'
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Link, Stack, Typography } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Control, FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { RecordForm } from '../hooks/inputRecordForm';

interface Props {
    index: number;
    register: UseFormRegister<RecordForm>;
    errors: Partial<FieldErrorsImpl<RecordForm>>
    remove: (index: number) => void;
}

const ReferencePart = ({ index, register, errors, remove }: Props) => {

    const fieldsWidth: number[] = [6, 5]
    return (
        <Grid2 container spacing={2}>
            {fieldsWidth.map((width: number, idx: number) => {
                return (
                    <>
                        <Grid2 xs={width} alignItems='left'>
                            <Box component='span'>
                                {idx == 0 ? (
                                    <>
                                        <TextField
                                            label='linkTitle'
                                            variant='outlined'
                                            fullWidth
                                            {...register(`reference.${index}.linkTitle`)} />
                                        <ErrorMessage errors={errors} name={`reference.${index}.linkTitle`} />
                                    </>)
                                    :
                                    (<>
                                        <TextField
                                            label='linkUrl'
                                            variant='outlined'
                                            fullWidth
                                            {...register(`reference.${index}.linkUrl`)} />
                                        <ErrorMessage errors={errors} name={`reference.${index}.linkUrl`} />
                                    </>)}
                            </Box>
                        </Grid2>
                    </>
                )
            })}
            <Grid2 xs={1} alignItems='right' paddingTop={3}>
                <Button onClick={() => remove(index)}><ClearIcon titleAccess='remove reference' /></Button>
            </Grid2>
        </Grid2>
    )

    // return (
    //     <>
    //         <Stack spacing={2}>
    //             <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={20}>
    //                 <h3>{REFER_LINK_DISPLAY_VALUE}</h3>
    //             </Box>
    //             <Box sx={{ color: 'primary.success', pl: 4 }}>
    //                 {fields.map((field: any, index: number) => {
    //                     return (
    //                         <>
    //                             <div key={field.id}>
    //                                 {referenceField(index)}
    //                             </div>
    //                         </>
    //                     )
    //                 })}
    //             </Box>
    //         </Stack>
    //         <Box sx={{ color: 'primary.success', pt: 2, pl: 4 }}>
    //             <Button onClick={() => append({ linkTitle: '', linkUrl: '' })}><AddIcon titleAccess='Add reference' /></Button>
    //         </Box>
    //     </>
    // )
}

export default ReferencePart
