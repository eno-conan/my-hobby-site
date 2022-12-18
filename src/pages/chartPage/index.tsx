import React, { useEffect, useState } from 'react'
import { Bar, Line, Radar } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js"
import { Container } from '@material-ui/core';
import { Stack, } from '@mui/material';
import CommonBreadcrumbs from '../../components/CommonBreadcrumbs';
import CommonMeta from '../../components/CommonMeta';
import CommonHeadline from '../../components/CommonHeadline';
import useRecord from '../../hooks/useRecord';

Chart.register(...registerables)

const options: {} = {
    maintainAspectRatio: false,
    responsive: false,
}

// パンくずリストのための階層配列
const subDirArr = ['chartPage']

// グラフのラベル
const labels: string[] = []
// データ情報
const countData: number[] = []

const index = () => {
    // 取得データを設定
    const {
        originalRecords,
    } = useRecord(`/api/recordChart`);

    if (originalRecords) {
        originalRecords.map((cntData) => {
            labels.push(cntData.createdDate)
            countData.push(cntData.count)
        })
        console.log(labels)
    }
    const chartData = {
        labels: labels,
        datasets: [
            {
                label: "記録数",
                data: countData,
                borderColor: "rgb(75, 192, 192)",
            },
        ],
    }

    return (
        <>
            <Container maxWidth='md'>
                {/* メタ情報の設定 */}
                <CommonMeta title={'記録数'} />
                <Stack pt={4}>
                    {/* パンくずリスト */}
                    <CommonBreadcrumbs subDirArr={subDirArr} />
                </Stack>
                <CommonHeadline headLine='記録数チャート' />
                {originalRecords && originalRecords.length > 0 ?
                    (
                        <>
                            <Line height={400} width={800} data={chartData} options={options} />
                        </>
                    )
                    :
                    (<></>)}
            </Container>
        </>
    )
}

export default index
