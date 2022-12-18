import React, { useEffect, useState } from 'react'
import { Bar, Line, Radar } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js"
import { Container } from '@material-ui/core';
import { Stack, } from '@mui/material';
import CommonBreadcrumbs from '../../components/CommonBreadcrumbs';
import CommonMeta from '../../components/CommonMeta';
import CommonHeadline from '../../components/CommonHeadline';
import useRecord from '../../hooks/useRecord';
import { NextPage } from 'next';

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
// 対象月の情報設定
let targetYearMonth: string = '';
const chartPage: NextPage = () => {
    // データ取得
    const {
        originalRecords,
    } = useRecord(`/api/recordChart`);

    // データがある場合に設定
    if (originalRecords) {
        originalRecords.map((cntData, idx) => {
            if (idx == 0) {
                targetYearMonth = cntData.targetYearMonth
            }
            labels.push(cntData.createdDate)
            countData.push(cntData.count)
        })
    }
    // 表示データの設定
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
                <CommonHeadline headLine={`記録数グラフ(${targetYearMonth})`} />
                {originalRecords && originalRecords.length > 0 ?
                    (
                        <><Line height={400} width={1000} data={chartData} options={options} /></>
                    )
                    :
                    (<>
                        <Stack pt={4}>
                            今月の記録データがありません
                        </Stack>
                    </>
                    )
                }
            </Container>
        </>
    )
}

export default chartPage
