import React from 'react'
import { Bar, Line, Radar } from 'react-chartjs-2';
import { Chart, registerables } from "chart.js"
import { Container } from '@material-ui/core';
import { Stack, } from '@mui/material';
import CommonBreadcrumbs from '../../components/CommonBreadcrumbs';
import CommonMeta from '../../components/CommonMeta';
import CommonHeadline from '../../components/CommonHeadline';

Chart.register(...registerables)

// パンくずリストのための階層配列
const subDirArr = ['chartPage']

const index = () => {
    const labels = [
        "小学生",
        "中学生",
        "高校生",
        "大学生",
        "20代前半",
        "20代後半",
    ]
    const data = {
        labels: labels,
        datasets: [
            {
                label: "記録数",
                data: [40, 60, 70, 40, 50, 80],
                borderColor: "rgb(75, 192, 192)",
            },
        ],
    }
    const options: {} = {
        maintainAspectRatio: false,
        responsive: false,
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
                <Line height={200} width={400} data={data} options={options} />
            </Container>
        </>
    )
}

export default index
