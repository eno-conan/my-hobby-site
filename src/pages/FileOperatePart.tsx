import React from 'react'
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { RecordForm } from '../hooks/inputRecordForm';
import FileDragDrop from './FileDragDrop'
import FileTemplateDownload from './FileTemplateDownload'


interface Props {
    setValue: UseFormSetValue<RecordForm>;
    // errors: Partial<FieldErrorsImpl<RecordForm>>
    // setValueUseMarkdown: React.Dispatch<
    //     React.SetStateAction<string>
    // >;
    // data: any;
}

{/* ファイルアップロード・ダウンロード機能 */ }
const FileOperatePart = ({ setValue }: Props) => {
    return (
        <>
            <FileTemplateDownload />
            <FileDragDrop setValue={setValue} />
        </>
    )
}

export default FileOperatePart
