import React from 'react'
import DragDropRef from './dragDropRef'
import TemplateDownload from './TemplateDownload'

{/* ファイルアップロード・ダウンロード機能 */ }
const FileOperatePart = () => {
    return (
        <>
            <TemplateDownload />
            <DragDropRef />
        </>
    )
}

export default FileOperatePart
