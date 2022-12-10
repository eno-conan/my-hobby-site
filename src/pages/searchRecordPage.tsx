import { Container, Divider } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CommonDrawer from '../components/CommonDrawer'
import CommonHeadline from '../components/CommonHeadline'
import CommonMeta from '../components/CommonMeta'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { NextPage } from 'next'
import useRecord from '../hooks/useRecord'
import { IData } from '../../types/searchRecordPage'
import { Record } from '../../types'
import { Stack } from '@mui/material'
import RecordTablePart from '../components/RecordTablePart'

// 記録検索画面の作成
const searchRecordPage: NextPage = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [inputValue, setInputValue] = useState("");
    const [showRecords, setShowRecords] = useState<any>();
    // 取得データを設定
    const {
        records,
        isLoading: isLoadingRecords,
        refetch: refetchRecords,
    } = useRecord();
    // useEffect(() => {
    //     setShowRecords(records)
    // }, []);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // 1ページあたりの表示件数変更
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // 検索機能
    const search = (value: string) => {
        if (value !== "") {
            const filteredList = records!.filter((rcd: Record) =>
                Object.values(rcd).some(
                    (info: any) => (
                        info.toString().toUpperCase().indexOf(value.toString().toUpperCase()) !== -1
                    )
                )
            );
            console.log(filteredList);
            setShowRecords(filteredList);
            return;
        }

        setShowRecords(records);
        return;
    };

    // 入力文字の更新実施
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        search(e.target.value);
    };

    return (
        <>
            <CommonDrawer />
            <CommonMeta title={"記録検索"} />
            <Container maxWidth="md">
                <Stack spacing={2} pb={4}>
                    <CommonHeadline headLine='記録検索' />
                    <h3>検索条件</h3>
                    <h5>GitHubのリポジトリ</h5>
                    <h5>タイトル</h5>
                    <h5>参照リンクのタイトル</h5>
                    <div>
                        <span style={{ marginRight: "5px" }}>検索フォーム</span>
                        <input type="text" value={inputValue} onChange={handleChange} />
                    </div>
                </Stack>
            </Container>
            <Divider />
            <Container maxWidth="lg">
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <RecordTablePart page={page} rowsPerPage={rowsPerPage} showRecords={showRecords} />
                    {(() => {
                        if (showRecords) return (
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={showRecords.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage} />
                        );
                    })()}
                </Paper>
            </Container>
        </>
    )
}

export default searchRecordPage
