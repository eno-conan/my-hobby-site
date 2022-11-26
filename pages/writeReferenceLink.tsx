import React from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Button, Container, TextField } from '@material-ui/core';
import CommonMeta from '../components/CommonMeta';
import CommonDrawer from '../components/CommonDrawer';
import CommonHeadline from '../components/CommonHeadline';
import Grid2 from '@mui/material/Unstable_Grid2';
import { Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const writeReferenceLink = () => {
    const { handleSubmit, control } = useForm();
    const { fields, append, remove } = useFieldArray({ control, name: 'todo' });

    const handleClick = (data: any) => {
        console.log(data);
    };
    return (
        <>
            <CommonMeta title={"addLinks"} />
            <CommonDrawer />
            <Container maxWidth="sm">
                <CommonHeadline headLine='参照リンクを追加' />
                <form onSubmit={handleSubmit(handleClick)}>
                    {fields.map((field, index) => {
                        return (
                            <div key={field.id}>
                                <Grid2 container spacing={2}>
                                    <Grid2 xs={5} alignItems="left">
                                        <Box component="span">
                                            <Controller
                                                name={`todo.${index}.title`}
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField variant='outlined' margin='normal' placeholder='title' fullWidth {...field} />
                                                )}
                                            />
                                        </Box>
                                    </Grid2>
                                    <Grid2 xs={5} alignItems="left">
                                        <Box component="span">
                                            <Controller
                                                name={`todo.${index}.url`}
                                                control={control}
                                                render={({ field }) => (
                                                    <TextField variant='outlined' margin='normal' placeholder='url' fullWidth {...field} />
                                                )}
                                            />
                                        </Box>
                                    </Grid2>
                                    {/* <Grid2 xs={2} alignItems="center" justifyContent="center"> */}
                                    <Button onClick={() => remove(index)}><ClearIcon titleAccess='remove reference' /></Button>
                                    {/* </Grid2> */}
                                </Grid2>
                            </div>
                        );
                    })}
                    <Button onClick={() => append({ title: '', url: '' })}><AddIcon titleAccess='Add reference' /></Button>
                    <Button type='submit'><CheckCircleIcon titleAccess='save' /></Button>
                </form>
            </Container >
        </>
    )
}

export default writeReferenceLink
