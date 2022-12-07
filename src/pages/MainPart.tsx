import React from 'react'
import { DESCRIPTION_DISPLAY_VALUE, GITHUB_REPO_DISPLAY_VALUE, MAIN_ITEM_DISPLAY_VALUE, TITLE_DISPLAY_VALUE } from '../consts/inputField'
import DetailPart from './DetailPart'
import TextPart from './TextPart'
import { Box, FormControlLabel, FormGroup, Switch } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2';
import { MenuItem, TextField } from '@material-ui/core'
import { RecordForm } from '../hooks/inputRecordForm'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

interface Props {
    register: UseFormRegister<RecordForm>;
    errors: Partial<FieldErrorsImpl<RecordForm>>
    setValueUseMarkdown: React.Dispatch<
        React.SetStateAction<string>
    >;
    data: any;
}

const MainPart = ({ register, errors, setValueUseMarkdown, data }: Props) => {
    const fieldNamePart = (fieldName: string) => {
        return (
            <>
                <Grid2 xs={12} md={12}>
                    {fieldName}
                </Grid2>
            </>)
    }

    const pullDownField = (fieldName: string, label: any, data: any) => {
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
    return (
        <>
            <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={20}>
                <h3>{MAIN_ITEM_DISPLAY_VALUE}</h3>
            </Box>
            <Grid2 container spacing={2} paddingLeft={4}>
                {/*題名・概要 */}
                <TextPart
                    register={register} errors={errors} fieldName={TITLE_DISPLAY_VALUE} label={'title'} />
                <TextPart
                    register={register} errors={errors} fieldName={DESCRIPTION_DISPLAY_VALUE} label={'description'} />
                {/* リポジトリ・詳細 */}
                {pullDownField(GITHUB_REPO_DISPLAY_VALUE, 'githubRepo', data)}
                <DetailPart register={register} errors={errors} setValueUseMarkdown={setValueUseMarkdown} />
            </Grid2>
        </>
    )
}

export default MainPart
