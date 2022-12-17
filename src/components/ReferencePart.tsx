import React from 'react'
import { REFER_LINK_DISPLAY_VALUE } from '../consts/inputField'
import { Box, TextField } from '@material-ui/core'
import Button from '@mui/material/Button';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Stack } from '@mui/material';
import { ErrorMessage } from '@hookform/error-message';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { FieldArrayWithId, FieldErrorsImpl, UseFieldArrayAppend, UseFormRegister } from 'react-hook-form';
import { RecordForm } from '../hooks/inputRecordForm';

interface Props {
    register: UseFormRegister<RecordForm>;
    errors: Partial<FieldErrorsImpl<RecordForm>>;
    fields: FieldArrayWithId<RecordForm, "reference", "id">[];
    append: UseFieldArrayAppend<RecordForm>;
    remove: (index: number) => void;
}

const ReferencePart = ({ register, errors, fields, append, remove }: Props) => {

    const referenceField = (index: number) => {
        return (
            <Grid2 container spacing={2}>
                <Grid2 xs={5} alignItems='left'>
                    <Box component='span'>
                        <TextField
                            label='linkTitle'
                            variant='outlined'
                            fullWidth
                            {...register(`reference.${index}.linkTitle`)} />
                        <ErrorMessage errors={errors} name={`reference.${index}.linkTitle`} />
                    </Box>
                </Grid2>
                <Grid2 xs={6} alignItems='left'>
                    <Box component='span'>
                        <TextField
                            label='linkUrl'
                            variant='outlined'
                            fullWidth
                            {...register(`reference.${index}.linkUrl`)} />
                        <ErrorMessage errors={errors} name={`reference.${index}.linkUrl`} />

                    </Box>
                </Grid2>
                <Grid2 xs={1} alignItems='right' paddingTop={3}>
                    <Button onClick={() => remove(index)}><ClearIcon titleAccess='remove reference' /></Button>
                </Grid2>
            </Grid2>
        )

    }

    return (
        <>
            <Stack spacing={2}>
                <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={20}>
                    <h3>{REFER_LINK_DISPLAY_VALUE}</h3>
                </Box>
                <Box sx={{ color: 'primary.success', pl: 4 }}>
                    {fields.map((_field: any, index: number) => (
                        <div key={index}>
                            {referenceField(index)}
                        </div>
                    ))}
                </Box>
            </Stack>
            <Box sx={{ color: 'primary.success', pt: 2, pl: 4 }}>
                <Button onClick={() => append({ linkTitle: '', linkUrl: '' })}><AddIcon titleAccess='Add reference' /></Button>
            </Box>
        </>
    )
}

export default ReferencePart
