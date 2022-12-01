import { Container } from '@material-ui/core'
import React, { useState } from 'react'
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

// ステータス（完了と未完了だけでよき？）・タイトル・概要の頭N文字・gitHubRepo・更新日時
interface Column {
    id: 'title' | 'description' | 'GithubRepo' | 'updated_at';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'title', label: 'Title', minWidth: 170 },
    { id: 'description', label: 'ISO\u00a0description', minWidth: 100 },
    {
        id: 'GithubRepo',
        label: 'GithubRepo',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    },
    {
        id: 'updated_at',
        label: 'updated_at\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value: number) => value.toLocaleString('en-US'),
    }
];

interface IData {
    title: string;
    description: string;
    GithubRepo: number;
    updated_at: number;
}

function createData(
    title: string,
    description: string,
    GithubRepo: number,
    updated_at: number,
): IData {
    return { title, description, GithubRepo, updated_at };
}

const rows = [
    createData('India', 'IN', 1324171354, 3287263),
    createData('China', 'CN', 1403500365, 9596961),
    createData('Italy', 'IT', 60483973, 301340),
    createData('United States', 'US', 327167434, 9833520),
    createData('Canada', 'CA', 37602103, 9984670),
    createData('Australia', 'AU', 25475400, 7692024),
    createData('Germany', 'DE', 83019200, 357578),
    createData('Ireland', 'IE', 4857000, 70273),
    createData('Mexico', 'MX', 126577691, 1972550),
    createData('Japan', 'JP', 126317000, 377973),
    createData('France', 'FR', 67022000, 640679),
    createData('United Kingdom', 'GB', 67545757, 242495),
    createData('Russia', 'RU', 146793744, 17098246),
    createData('Nigeria', 'NG', 200962417, 923768),
    createData('Brazil', 'BR', 210147125, 8515767),
];

// 記録検索画面の作成
const searchRecord = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [inputValue, setInputValue] = useState("");
    const [records, setRecords] = React.useState<Array<IData>>(rows);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const search = (value: string) => {
        if (value !== "") {
            const filteredList = rows.filter((rcd: IData) =>
                Object.values(rcd).some(
                    (info: string) =>
                        info.toString().toUpperCase().indexOf(value.toUpperCase()) !== -1
                )
            );
            setRecords(filteredList);
            return;
        }

        setRecords(rows);
        return;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        search(e.target.value);
    };
    return (
        <div>
            <CommonDrawer />
            <CommonMeta title={"記録検索"} />
            <Container maxWidth="md">
                <CommonHeadline headLine='記録検索' />
                <h3>検索条件</h3>
                <h5>GitHubのリポジトリ</h5>
                <h5>タイトル</h5>
                <h5>参照リンクのタイトル</h5>
                <div>
                    <span style={{ marginRight: "5px" }}>検索フォーム</span>
                    <input type="text" value={inputValue} onChange={handleChange} />
                </div>
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
                                {records
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
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
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage} />
                </Paper>
            </Container>
        </div>
    )
}

export default searchRecord
