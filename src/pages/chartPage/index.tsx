import React from 'react'
import { Line, } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js"
import { Container } from '@material-ui/core';
import { Stack } from '@mui/material';
import CommonBreadcrumbs from '../../components/CommonBreadcrumbs';
import CommonMeta from '../../components/CommonMeta';
import CommonHeadline from '../../components/CommonHeadline';
import useRecord from '../../hooks/useRecord';
import { NextPage } from 'next';

// チャートの設定
Chart.register(...registerables)

const options: {} = {
    plugins: {  // 'legend' now within object 'plugins {}'
        legend: {
            labels: {
                color: "green",  // not 'fontColor:' anymore
                font: {
                    size: 14 // 'size' now within object 'font {}'
                }
            }
        },
        scales: {                          // 軸設定
            xAxes: [                           // Ｘ軸設定
                {
                    scaleLabel: {                 // 軸ラベル
                        display: true,                // 表示設定
                        labelString: '横軸ラベル',    // ラベル
                        fontColor: "red",             // 文字の色
                        fontSize: 16                  // フォントサイズ
                    },
                    gridLines: {                   // 補助線
                        color: "rgba(255, 0, 0, 0.2)", // 補助線の色
                    },
                    ticks: {                      // 目盛り
                        fontColor: "red",             // 目盛りの色
                        fontSize: 14                  // フォントサイズ
                    }
                }
            ],
        },
    },
    maintainAspectRatio: true,
    responsive: true,
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

    const currentDate = new Date().toLocaleDateString();
    console.log(currentDate)
    const yearMonth = currentDate.substring(0, 7);
    console.log(yearMonth)

    // データがある場合に設定
    if (originalRecords) {
        console.log(originalRecords);
        originalRecords.map((cntData, idx) => {
            if (idx == 0) {
                targetYearMonth = cntData.targetYearMonth
            }
            // yyyy/、部分はカット
            labels.push(cntData.createdDate.substring(5))
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
                borderColor: "rgb(80, 192, 80)",
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
                        {/* データがない場合は、ないことを示す */}
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
