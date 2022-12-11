import {
    Box,
    Checkbox,
    Container,
    createMuiTheme,
    Divider,
    MuiThemeProvider,
    Table,
    TableBody, TableCell,
    TableContainer, Typography
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CommonDrawer from '../components/CommonDrawer'
import CommonHeadline from '../components/CommonHeadline'
import CommonMeta from '../components/CommonMeta'
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { NextPage } from 'next'
import useRecord from '../hooks/useRecord'
import { Record } from '../../types'
import { Stack } from '@mui/material'
import { HeadCell, SelectableTableHead } from '../components/SelectableTableHead'
import { useRowSelect } from '../hooks/useRowSelect'
import LoadingPart from '../components/LoadingPart'
import { useRouter } from 'next/router';

// const theme = createMuiTheme({
//     palette: {
//         secondary: { main: '#11cb5f' }
//     },
// });

let originalRecordsSample: any[] = [
    {
        id: 13,
        title: 'プルダウンの初期値',
        description: 'プルダウンの初期値確認',
        githubRepo: '',
        detail: '',
        finished: false,
        createdAt: '',
        updatedAt: ''
    }
]

const headCells: HeadCell[] = [
    { id: 'title', label: 'title' },
    { id: 'description', label: 'description' },
    { id: 'githubRepo', label: 'githubRepo' },
    { id: 'finished', label: 'finished' },
    // { id: 'updated_at', label: 'updated_at' },
]

// 記録検索画面の作成
const searchRecordPage: NextPage = () => {

    // 取得データを設定
    const {
        originalRecords,
        originalRecordCount,
        isLoading: isLoadingRecords,
        refetch: refetchRecords,
    } = useRecord();
    if (originalRecords) {
        originalRecordsSample = originalRecords;
    }
    const {
        selectedRowIds,
        isSelected,
        isSelectedAll,
        isIndeterminate,
        toggleSelected,
        toggleSelectedAll,
    } = useRowSelect(originalRecordsSample.map((row) => row.id));

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [inputValue, setInputValue] = useState("");
    const [recordCount, setRecordCount] = useState(originalRecordCount);
    const [showRecords, setShowRecords] = useState<any>();

    // ページ更新
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
            const filteredList = originalRecords!.filter((rcd: Record) =>
                Object.values(rcd).some(
                    (info: any) => (
                        info.toString().toUpperCase().indexOf(value.toString().toUpperCase()) !== -1
                    )
                )
            );
            setRecordCount(filteredList.length);
            setShowRecords(filteredList);
            return;
        }
        setRecordCount(originalRecordCount);
        setShowRecords(originalRecords);
        return;
    };

    // 入力文字の更新実施
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
        search(e.target.value);
    };

    // 未完了・完了の文言設定
    const getStatus = (finished: Boolean) => {
        if (finished) {
            return 'Finished'
        } else {
            return '-'
        }
    }

    // 詳細画面へ遷移
    const router = useRouter();
    const checkRecord = () => {
        if (selectedRowIds.length == 1) {
            router.push({
                pathname: `/targetRecord/${selectedRowIds[0]}`,
                query: {
                    id: selectedRowIds[0],
                    host: window.location.href.split('/searchRecordPage')[0]
                }
            }, `/targetRecord/${selectedRowIds[0]}`);
        } else {
            alert('詳細表示する場合は、1件のみ選択')
        }
    }

    // ローディング中の表示
    if (!originalRecords) {
        return (
            <LoadingPart />
        );
    }

    return (
        <>
            <CommonDrawer />
            <CommonMeta title={"記録検索"} />
            <Container maxWidth="md">
                <Stack spacing={2} pb={4}>
                    <CommonHeadline headLine='記録検索' />
                    <div>
                        <span style={{ marginRight: "5px" }}>条件</span>
                        <input type="text" value={inputValue} onChange={handleChange} />
                    </div>
                </Stack>
                <button onClick={checkRecord}>checkRecord</button>
            </Container>
            <Divider />
            <Container maxWidth="lg">
                <TableContainer component={Paper}>
                    <Table>
                        <SelectableTableHead
                            onSelectAllClick={toggleSelectedAll}
                            headCells={headCells}
                            checked={isSelectedAll}
                            indeterminate={isIndeterminate}
                        />
                        <TableBody>
                            {(() => {
                                if (inputValue) {
                                    return (<>
                                        {showRecords
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row: any) => {
                                                const isItemSelected = isSelected(row.id);
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        onClick={() => toggleSelected(row.id)}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox checked={isItemSelected} />
                                                        </TableCell>
                                                        <TableCell>{row.title}</TableCell>
                                                        <TableCell>{row.description}</TableCell>
                                                        <TableCell>{row.githubRepo}</TableCell>
                                                        <TableCell>{getStatus(row.finished)}</TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </>
                                    );
                                } else {
                                    return (<>
                                        {originalRecordsSample
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row) => {
                                                const isItemSelected = isSelected(row.id);
                                                return (
                                                    <TableRow
                                                        hover
                                                        role="checkbox"
                                                        tabIndex={-1}
                                                        key={row.id}
                                                        onClick={() => toggleSelected(row.id)}
                                                        selected={isItemSelected}
                                                    >
                                                        <TableCell padding="checkbox">
                                                            <Checkbox checked={isItemSelected} />
                                                        </TableCell>
                                                        <TableCell>{row.title}</TableCell>
                                                        <TableCell>{row.description}</TableCell>
                                                        <TableCell>{row.githubRepo}</TableCell>
                                                        <TableCell>{getStatus(row.finished)}</TableCell>
                                                        {/* <TableCell>{row.updatedAt}</TableCell> */}
                                                        {/* .toLocaleString('en-US') */}
                                                    </TableRow>
                                                );
                                            })}
                                    </>
                                    );
                                }
                            })()}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 100]}
                        component="div"
                        count={originalRecordCount}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    // labelDisplayedRows={({ from, to, page }) => {
                    //     return `Page: ${page + 1}`;
                    // }}
                    />
                    {/* <Box>
                    <Typography>selectedRowIds</Typography>
                    <Typography>{JSON.stringify(selectedRowIds)}</Typography>
                </Box> */}
                </TableContainer>
            </Container>
        </>
    )
}

export default searchRecordPage
