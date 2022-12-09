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

interface Column {
    id: 'title' | 'description' | 'githubRepo' | 'updated_at' | 'finished';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'title', label: 'Title', minWidth: 50 },
    { id: 'description', label: 'description', minWidth: 50 },
    {
        id: 'githubRepo',
        label: 'githubRepo',
        minWidth: 50,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'updated_at',
        label: 'updated_at',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    }
];

// function createData(
//     title: string,
//     description: string,
//     githubRepo: string,
//     updated_at: dateti,
//     finished: boolean
// ): Record {
//     return { title, description, githubRepo, updated_at, finished };
// }

const rows = [
    {
        created_at: "2022-12-09T12:53:14.014Z",
        description: "2",
        detail: "3",
        finished: false,
        githubRepo: "eno-conan/next-nortion-blog",
        id: 1,
        title: "1",
        updated_at: "2022-12-09T12:53:14.014Z"
    }];

// 記録検索画面の作成
const searchRecordPage: NextPage = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [inputValue, setInputValue] = useState("");
    // 取得データを設定
    const [showRecords, setShowRecords] = React.useState<any>(rows);
    const {
        records,
        isLoading: isLoadingRecords,
        refetch: refetchRecords,
    } = useRecord();
    // useEffect(() => {
    //     setShowRecords(records);
    // }, []);
    // Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.

    // 別ページ遷移
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
        console.log(value);
        if (value !== "") {
            const filteredList = showRecords.filter((rcd: IData) =>
                Object.values(rcd).some(
                    (info: string) =>
                        console.log(info)
                    // info.toString().toUpperCase().indexOf(value.toUpperCase()) !== -1
                )
            );
            setShowRecords(filteredList);
            return;
        }

        setShowRecords(showRecords);
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
            {(() => {
                if (records) return (
                    <Container maxWidth="lg">
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {records && records
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row: any) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.description}>
                                                        {columns.map((column) => {
                                                            const value = row[column.id];
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value}
                                                                </TableCell>
                                                            );
                                                        })}
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={showRecords.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage} />
                        </Paper>
                    </Container>
                );
            })()}
        </>
    )
}

export default searchRecordPage
