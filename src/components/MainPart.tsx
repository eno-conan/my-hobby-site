import React from 'react'
import { DESCRIPTION_DISPLAY_VALUE, DETAIL_DISPLAY_VALUE, GITHUB_REPO_DISPLAY_VALUE, MAIN_ITEM_DISPLAY_VALUE, TITLE_DISPLAY_VALUE } from '../consts/inputField'
import DetailPart from './DetailPart'
import TextPart from './TextPart'
import { Box } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2';
import { RecordForm } from '../hooks/inputRecordForm'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'
import FieldNamePart from './FieldNamePart'
import PulldownPart from './PulldownPart'

interface Props {
    register: UseFormRegister<RecordForm>;
    errors: Partial<FieldErrorsImpl<RecordForm>>
    valueUseMarkdown: string;
    setValueUseMarkdown: React.Dispatch<
        React.SetStateAction<string>>;
    data: any;
}

const MainPart = ({ register, errors, valueUseMarkdown, setValueUseMarkdown, data }: Props) => {

    return (
        <>
            <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={20}>
                <h3>{MAIN_ITEM_DISPLAY_VALUE}</h3>
            </Box>
            <Grid2 container spacing={2} paddingLeft={4}>
                {/*題名・概要 */}
                <FieldNamePart fieldName={TITLE_DISPLAY_VALUE} />
                <TextPart
                    register={register} errors={errors} label={'title'} />
                <FieldNamePart fieldName={DESCRIPTION_DISPLAY_VALUE} />
                <TextPart
                    register={register} errors={errors} label={'description'} />
                {/* リポジトリ・詳細 */}
                <FieldNamePart fieldName={GITHUB_REPO_DISPLAY_VALUE} />
                <PulldownPart label={'githubRepo'} register={register} errors={errors} data={data} />
                <FieldNamePart fieldName={DETAIL_DISPLAY_VALUE} />
                <DetailPart register={register} errors={errors} valueUseMarkdown={valueUseMarkdown} setValueUseMarkdown={setValueUseMarkdown} />
            </Grid2>
        </>
    )
}

export default MainPart
