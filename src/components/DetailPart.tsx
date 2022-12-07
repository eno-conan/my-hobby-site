import { Box, FormControlLabel, FormGroup, Switch } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { DETAIL_DISPLAY_VALUE } from '../consts/inputField';
import { RecordForm } from '../hooks/inputRecordForm';
import DetailMarkdownPart from './DetailMarkdownPart';
import TextPart from './TextPart';

interface Props {
    register: UseFormRegister<RecordForm>;
    errors: Partial<FieldErrorsImpl<RecordForm>>
    setValueUseMarkdown: React.Dispatch<
        React.SetStateAction<string>>;
    setWriteMarkdown: React.Dispatch<
        React.SetStateAction<boolean>>;
}

const DetailPart = ({ register, errors, setValueUseMarkdown, setWriteMarkdown }: Props) => {
    // TextとMarkDownの切り替え
    const [flg, setFlg] = useState(false);
    // 切り替え
    const handleChange = (event: any) => {
        if (event.target.checked) {
            setWriteMarkdown(true);
            setFlg(true)
        } else {
            setWriteMarkdown(false);
            setFlg(false);
        }
    };
    return (
        <>
            <Box component='span' fontSize={18}>
                <Grid2 xs={12} md={12}>
                    {DETAIL_DISPLAY_VALUE}
                </Grid2>
            </Box>
            <Grid2 xs={12} md={12}>
                <FormGroup row>
                    <FormControlLabel
                        control={<Switch onChange={handleChange} color='success' />}
                        label='Markdownで記述'
                    />
                </FormGroup>
            </Grid2>
            {flg ?
                <>
                    <Grid2 xs={12} md={12}>
                        <DetailMarkdownPart setValueUseMarkdown={setValueUseMarkdown} />
                    </Grid2>
                </>
                :
                <>
                    <TextPart
                        register={register} errors={errors} fieldName={''} label={'detail'} />
                </>
            }
        </>
    )
}

export default DetailPart
