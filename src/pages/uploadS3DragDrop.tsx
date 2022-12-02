import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Credentials } from "aws-sdk";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";
import { useForm } from "react-hook-form";

type FormData = {
    name: string;
    email: string;
    file: File | null;
};


function tryS3() {
    // const inputRef = useRef<HTMLInputElement>(null);
    // ファイルアップロード中のローディング
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
        // accept: {
        //     'image/png': ['.png', '.jpg', '.jpeg',],
        // },
    });

    // 送信ボタンクリック→s3へのアップロード
    const onFileInputChange = async () => {

        // 認証情報取得
        const creds = new Credentials(
            process.env.NEXT_PUBLIC_S3_UPLOAD_KEY!,
            process.env.NEXT_PUBLIC_S3_UPLOAD_SECRET!,
        );

        try {
            const parallelUploads3 = new Upload({
                client: new S3Client({ region: "ap-northeast-1", credentials: creds }),
                params: { Bucket: process.env.NEXT_PUBLIC_BUCKET_NAME, Key: getValues().file!.name, Body: getValues()!.file! },
                leavePartsOnError: false,
            });

            // アップロード処理実行
            parallelUploads3.on("httpUploadProgress", (progress) => {
                console.log(progress);
            });
            await parallelUploads3.done();

            // sleep
            await setIsLoading(false);
            setValue('file', null);
            setFileName('');
            alert('ファイルのアップロードが完了しました')
        } catch (e) {
            console.log(e);
            alert('ファイルのアップロードに失敗しました')
        }
    };

    return (
        <div className="App">
            <div className="flex justify-center items-center h-screen">
                {isLoading ? (
                    <h1>アップロード中・・・</h1>
                ) : (
                    <div
                        className="rounded shadow-lg w-1/2"
                        style={{ maxWidth: "400px", minWidth: "300px" }}
                    >
                        <div className="flex justify-center">
                            <div className="my-8 flex justify-center grid">
                                <h1 className="font-bold text-gray-500 col-span-3 text-center">
                                    動画アップロード
                                </h1>
                                {/* <div className="text-gray-500 col-span-3 text-center mt-2 mb-4 text-xs">
                                    MP4の動画ファイルを選択
                                </div> */}
                                <div
                                    className="border-dashed border-2 border-gray-500 grid flex justify-cente p-4 mb-2 cursor-pointer"
                                    style={{ minWidth: "200px" }}
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    <div className="container flex justify-center mb-2">
                                    </div>
                                    <div className="container flex justify-center text-xs text-gray-500">
                                        {/* {fileName ? (<></>) : (<></>)} */}
                                        <p>
                                            <>ここにドラッグ＆ドロップしてね
                                                （再度ファイルをアップすると、前の情報は削除）</>
                                        </p>
                                    </div>
                                </div>
                                {fileName}
                                {filePreview}
                                <button onClick={onFileInputChange}>送信</button>
                                <br />
                                {/* ファイルダウンロード機能 */}
                                <h3>テンプレートファイルダウンロード</h3>
                                <a href="/test.csv" download>ここをクリック</a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default tryS3

{/* <div className="col-span-3 text-center my-1 text-gray-500">
または
</div> */}
{/* <div className="col-span-3 flex justify-center w-full">
<button
onClick={fileUpload}
className="bg-blue-500 rounded text-white font-bold py-2 px-4 w-full"
>
ファイルを選択
</button>
<input
type="file"
className="hidden"
accept=".png"
ref={inputRef}
onChange={onFileInputChange}
/>
</div> */}