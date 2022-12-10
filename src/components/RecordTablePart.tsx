import { Container, Divider } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { columns, IData } from '../../types/searchRecordPage'
import Link from 'next/link';

interface Props {
    page: number;
    rowsPerPage: number;
    inputValue: string;
    showRecords: any;
    records: any;
}

const RecordTablePart = ({ page, rowsPerPage, inputValue, showRecords, records }: Props) => {
    return (
        <>
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
                        {(() => {
                            if (inputValue) {
                                return (
                                    <>
                                        {showRecords && showRecords
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
                                    </>
                                );
                            } else {
                                return (
                                    <>
                                        {records && records
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row: any) => {
                                                return (
                                                    <TableRow role="checkbox"
                                                        tabIndex={-1} hover key={row.description}>
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
                                    </>
                                );
                            }
                        })()}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default RecordTablePart