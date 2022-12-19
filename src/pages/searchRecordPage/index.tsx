import {
    Box,
    Button,
    Checkbox,
    Container,
    createMuiTheme,
    createTheme,
    Divider,
    Grid,
    MuiThemeProvider,
    Table,
    TableBody, TableCell,
    TableContainer,
    TextField,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CommonHeadline from '../../components/CommonHeadline'
import CommonMeta from '../../components/CommonMeta'
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { NextPage } from 'next'
import useRecord from '../../hooks/useRecord'
import { Alert, Stack } from '@mui/material'
import { HeadCell, SelectableTableHead } from '../../components/SelectableTableHead'
import { useRowSelect } from '../../hooks/useRowSelect'
import LoadingPart from '../../components/LoadingPart'
import { useRouter } from 'next/router';
import Snackbar from "@material-ui/core/Snackbar";
import CommonBreadcrumbs from '../../components/CommonBreadcrumbs';

const theme = createTheme({
    palette: {
        secondary: { main: '#44CC33' }
    },
});

let originalRecordsSample: any[] = []

const headCells: HeadCell[] = [
    { id: 'title', label: 'title' },
    { id: 'description', label: 'description' },
    { id: 'githubRepo', label: 'githubRepo' },
    { id: 'finished', label: 'finished' },
    // { id: 'updated_at', label: 'updated_at' },
]

// パンくずリストのための階層配列
const subDirArr = ['searchRecordPage']

// 記録検索画面の作成
const searchRecordPage: NextPage = () => {
    // 更新処理が完了したときに、メッセージを表示したい
    const router = useRouter();

    // 取得データを設定
    let {
        originalRecords,
        originalRecordCount,
    } = useRecord(`/api/record`);

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
    const [showRecords, setShowRecords] = useState<any>(originalRecordsSample);

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
    const search = async () => {
        const method = 'GET';
        const headers = {
            'Accept': 'application/json'
        };
        try {
            const hostName = window.location.href.split('/searchRecordPage')[0];
            // 結果格納用の変数定義
            let response = await fetch(`${hostName}/api/record/?condition=${inputValue}`, { method, headers });
            let filteredData;
            if (response.ok) {
                // フィルタリング後のデータを画面に表示
                filteredData = await (await response).json();
                setShowRecords(filteredData);
                setRecordCount(filteredData.length);
            }
        } catch (err: any) {
            // エラーハンドリング
            console.log(err)
        }
    };

    // 詳細画面へ遷移
    const checkRecord = () => {
        if (selectedRowIds.length == 1) {
            router.push({
                pathname: `/targetRecordPage/${selectedRowIds[0]}`,
                query: {
                    id: selectedRowIds[0],
                    host: window.location.href.split('/searchRecordPage')[0],
                    fromView: 'searchRecord'
                }
            }, `/targetRecordPage/${selectedRowIds[0]}`);
        } else {
            alert('詳細表示する場合は、1件のみ選択')
        }
    }

    // 更新結果を画面に表示
    const messageUpdateResult = () => {
        return (<>
            {router.query.status && router.query.status.length > 0 ? (
                <>
                    <Snackbar
                        open={true}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >
                        {/* 記事の更新について、成功・失敗でメッセージを切り替え */}
                        {router.query.status == 'UpdateSuccess' ?
                            (<><Alert severity="success">記事の更新が完了しました</Alert></>)
                            :
                            (<><Alert severity="error">記事の更新に失敗しました</Alert></>)
                        }
                    </Snackbar>
                </>
            ) : (
                <></>
            )}
        </>)
    }

    // レコードの検索・詳細確認の操作を行う部分
    const recordCheckOperate = () => {
        return (<>
            <Grid container spacing={2}>
                <Grid xs={12}>
                    <Box pb={2}>
                        {/* Failed prop type: The prop `xs` of `Grid` must be used on `item`. */}
                        <span style={{ marginRight: "5px" }}>検索条件</span>
                    </Box>
                </Grid>
                <Grid xs={3}>
                    <Box pb={2}>
                        <TextField id="outlined-basic" variant="outlined" value={inputValue} onChange={(event) => setInputValue(event.target.value)} />
                    </Box>
                </Grid>
                <Grid xs={3}>
                    <Box pt={1}>
                        <Button variant="contained" onClick={search} fullWidth={false} >検索</Button>
                    </Box>
                </Grid>
                <Grid xs={3}>
                    <Box pt={1}>
                        <Button variant="contained" onClick={checkRecord} fullWidth={false} >詳細確認</Button>
                    </Box>
                </Grid>
            </Grid>
        </>)
    }

    // テーブルのBody部分を表示
    const tableBody = () => {
        return (<>
            {(() => {
                if (showRecords.length > 0) {
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
                                        <TableCell>{arrangeViewContent(row.githubRepo)}</TableCell>
                                        <TableCell>{arrangeViewContent(row.finished)}</TableCell>
                                    </TableRow>
                                );
                            })}
                    </>
                    );
                } else {
                    return (
                        <>
                            {originalRecords && originalRecords
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
                                            <TableCell>{arrangeViewContent(row.githubRepo)}</TableCell>
                                            <TableCell>{arrangeViewContent(row.finished)}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </>
                    );
                }
            })()}
        </>)
    }

    {/* テーブルのページング機能 */ }
    const tablePagingSetting = () => {
        return (<> {(() => {
            if (showRecords.length > 0) {
                return (
                    <>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={recordCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                    </>
                );
            } else {
                return (
                    <>
                        <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={originalRecordCount}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /></>
                );
            }
        })()}</>)
    }

    // 未完了・完了の文言を設定
    const arrangeViewContent = (finished: Boolean) => {
        if (finished) {
            return 'Finished'
        } else {
            return '-'
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
            {/* <CommonDrawer /> */}
            <Container maxWidth="md">
                <Stack pt={4}>
                    {/* パンくずリスト */}
                    <CommonBreadcrumbs subDirArr={subDirArr} />
                </Stack>
                <CommonMeta title={"記録検索"} />
                <Stack spacing={2} pb={4}>
                    <CommonHeadline headLine='記録検索' />
                    {/* 詳細画面における更新後の、更新結果を画面表示 */}
                    {messageUpdateResult()}
                </Stack>
                {/* レコードの検索・詳細確認の操作を行う部分 */}
                {recordCheckOperate()}
            </Container>
            <Divider />
            <Container fixed>
                <MuiThemeProvider theme={theme}>
                    <TableContainer component={Paper}>
                        <Table>
                            <SelectableTableHead
                                onSelectAllClick={toggleSelectedAll}
                                headCells={headCells}
                                checked={isSelectedAll}
                                indeterminate={isIndeterminate}
                            />
                            <TableBody>
                                {/* テーブルのBody部分を表示 */}
                                {tableBody()}
                            </TableBody>
                        </Table>
                        {/* テーブルのページング機能 */}
                        {tablePagingSetting()}
                    </TableContainer>
                </MuiThemeProvider>
            </Container>
        </>
    )
}

export default searchRecordPage
