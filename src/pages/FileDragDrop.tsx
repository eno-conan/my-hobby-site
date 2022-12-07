import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Credentials } from "aws-sdk";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { useForm } from "react-hook-form";
import { Box, Grid } from '@material-ui/core'
import Grid2 from '@mui/material/Unstable_Grid2';

type FormData = {
    name: string;
    email: string;
    file: File | null;
};


const FileDragDrop = () => {
    const [isLoading, setIsLoading] = useState(false);
    // ファイル選択できたら、ファイル名を画面に表示したい
    const [fileName, setFileName] = useState('');
    const { setValue, getValues, watch } = useForm<FormData>({
        defaultValues: {
            name: '',
            email: '',
            file: null,
        },
    });

    // 監視
    const watchFile = watch('file');

    // アップロードファイルのプレビュー（画像の場合のみ行う）
    const filePreview = useMemo(() => {
        // 画像かどうかでプレビュー表示を決める
        if (!watchFile || fileName.split('.')[1] !== 'png') {
            // 暫定で加えた処理
            setIsLoading(false);
            return <></>;
        }
        const url = URL.createObjectURL(watchFile);
        setIsLoading(false);
        return <img src={url} alt="" className="file-preview" />;
    }, [watchFile]);

    // ファイル情報を保持する
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            setIsLoading(true);
            const file = acceptedFiles[0];
            // アップロードしたファイルの中身を取得
            let reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function () {
                console.log(reader.result);
            };
            // ファイル名を管理
            setFileName(file.name);
            setValue('file', file);
        } else {
            // 何かする？
        }
    }, []);

    // ドロップ時の挙動と拡張子制限
    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
    });

    return (
        <div className="flex justify-center items-center h-screen">
            <Box sx={{ color: 'primary.success', pl: 2 }} fontSize={16}>
                {isLoading ? (
                    <h1>アップロード中・・・</h1>
                ) : (
                    <Grid2 container>
                        <Grid item xs={12} sm={12}>
                            <div
                                className="rounded shadow-lg w-1/2"
                                style={{ maxWidth: "400px", minWidth: "300px" }}
                            >
                                <div className="flex justify-center">
                                    <div className="my-8 flex justify-center grid">
                                        <h3 className="font-bold text-gray-500 col-span-3 text-center">
                                            記入済ファイルアップロード
                                        </h3>
                                        <div
                                            className="border-dashed border-2 border-gray-500 grid flex justify-cente p-4 mb-2 cursor-pointer"
                                            style={{ minWidth: "200px" }}
                                            {...getRootProps()}
                                        >
                                            <input {...getInputProps()} />
                                            <div className="container flex justify-center mb-2">
                                            </div>
                                            <div className="container flex justify-center text-xs text-gray-500">
                                                <p>
                                                    <>ドラッグ＆ドロップ、またはクリックしてファイルをアップロード</>
                                                </p>
                                            </div>
                                        </div>
                                        <br />
                                    </div>
                                </div>
                            </div>
                        </Grid>
                    </Grid2>
                )}
            </Box>
        </div>
    );
}

export default FileDragDrop;