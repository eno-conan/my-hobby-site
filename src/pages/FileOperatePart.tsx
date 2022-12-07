import React from 'react'
import FileDragDrop from './FileDragDrop'
import FileTemplateDownload from './FileTemplateDownload'

{/* ファイルアップロード・ダウンロード機能 */ }
const FileOperatePart = () => {
    return (
        <>
            <FileTemplateDownload />
            <FileDragDrop />
        </>
    )
}

export default FileOperatePart
