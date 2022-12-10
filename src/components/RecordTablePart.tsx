import { Container, Divider } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import CommonDrawer from './CommonDrawer'
import CommonHeadline from './CommonHeadline'
import CommonMeta from './CommonMeta'
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

interface Props {
    page: number;
    rowsPerPage: number;
    showRecords: any;
}

const RecordTablePart = ({ page, rowsPerPage, showRecords }: Props) => {
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
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default RecordTablePart