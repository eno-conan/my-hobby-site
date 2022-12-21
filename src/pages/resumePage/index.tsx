import { NextPage } from 'next'
import React, { useEffect, useState, lazy, Suspense } from 'react'
import { Container } from '@material-ui/core';
import { Stack } from '@mui/material';
import CommonMeta from '../../components/CommonMeta';
import CommonBreadcrumbs from '../../components/CommonBreadcrumbs';
import CommonHeadline from '../../components/CommonHeadline';
// import MyDoc from '../../components/MyDoc';
import dynamic from "next/dynamic";
import loadable from '@loadable/component'
const MyDoc = dynamic(() => import('../../components/MyDoc'));
// const MyDoc = loadable(() => import('../../components/MyDoc'));
// const MyDoc = lazy(() => import('../../components/MyDoc'));
const renderLoader = () => <p>Loading</p>;

// パンくずリストのための階層配列
const subDirArr = ['resumePage']

const ResumePage: NextPage = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        //     ①②は自分の目的に合わせて選ぶ */ }
        //      ①:クリックするとPDFをダウンロードする */ }
        // ②:PDFをビューアーで表示する */ }
        <>
            {isClient && (
                <>
                    <Container maxWidth='md'>
                        <CommonMeta title={'記録PDF'} />
                        <Stack pt={4}>
                            {/* パンくずリスト */}
                            <CommonBreadcrumbs subDirArr={subDirArr} />
                        </Stack>
                        {/* フォントサイズと見出しかどうかの引数設定して、FieldNamePartで統一できないか */}
                        {/* ページ見出し */}
                        <CommonHeadline headLine='PDF' />
                        {/* <PDFDownloadLink document={<MyDoc />} fileName="test1.pdf">
                            {({ loading }) => (loading ? 'Loading document...' : 'クリックでPDFダウンロード')}
                        </PDFDownloadLink> */}
                        {/* <Suspense fallback={renderLoader()}> */}
                        <MyDoc />
                        {/* </Suspense> */}
                    </Container>
                </>
            )}
        </>
    );
}

export default ResumePage
