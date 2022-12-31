import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form';
import { RecordForm } from '../hooks/inputRecordForm';
import DetailMarkdownPart from './DetailMarkdownPart';
import TextPart from './TextPart';

interface Props {
    register: UseFormRegister<RecordForm>;
    errors: Partial<FieldErrorsImpl<RecordForm>>
    valueUseMarkdown: string;
    setValueUseMarkdown: React.Dispatch<
        React.SetStateAction<string>>;
}

const DetailPart = ({ register, errors, valueUseMarkdown, setValueUseMarkdown }: Props) => {
    // TextとMarkDownの切り替え
    const [flg, setFlg] = useState(false);
    // 切り替え
    const handleChange = (event: any) => {
        if (event.target.checked) {
            setFlg(true)
        } else {
            setFlg(false);
        }
    };
    return (
        <>
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
                        <DetailMarkdownPart valueUseMarkdown={valueUseMarkdown} setValueUseMarkdown={setValueUseMarkdown} />
                    </Grid2>
                </>
                :
                <>
                    <TextPart
                        register={register} label={'detail'} />
                </>
            }
        </>
    )
}

export default DetailPart
