import { Box, Checkbox, createMuiTheme, MuiThemeProvider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@material-ui/core';
import { NextPage } from 'next'
import React from 'react'
import { HeadCell, SelectableTableHead } from '../../components/SelectableTableHead';
import { useRowSelectOriginal } from '../../hooks/useRowSelectOriginal';

export type Data = {
    id: number;
    calories: number;
    carbs: number;
    fat: number;
    name: string;
    protein: number;
};

const createData = (
    id: number,
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number
): Data => {
    return {
        id,
        name,
        calories,
        fat,
        carbs,
        protein,
    };
};

const rows = [
    createData(1, "Cupcake", 305, 3.7, 67, 4.3),
    createData(2, "Donut", 452, 25.0, 51, 4.9),
    createData(3, "Eclair", 262, 16.0, 24, 6.0),
    createData(4, "Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData(5, "Gingerbread", 356, 16.0, 49, 3.9),
    createData(6, "Honeycomb", 408, 3.2, 87, 6.5),
    createData(7, "Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData(8, "Jelly Bean", 375, 0.0, 94, 0.0),
    createData(9, "KitKat", 518, 26.0, 65, 7.0),
    createData(10, "Lollipop", 392, 0.2, 98, 0.0),
    createData(11, "Marshmallow", 318, 0, 81, 2.0),
    createData(12, "Nougat", 360, 19.0, 9, 37.0),
    createData(13, "Oreo", 437, 18.0, 63, 4.0),
];

const headCells: HeadCell[] = [
    { id: 'Dessert', label: 'Dessert' },
    { id: 'Categories', label: 'Categories' },
    { id: 'Fat(g)', label: 'Fat(g)' },
    { id: 'Carbs', label: 'Carbs(g)' },
    { id: 'Dessert4', label: 'Dessert4' }
]

const theme = createMuiTheme({
    palette: {
        secondary: { main: '#11cb5f' }
    },
});

const SelectableTable: NextPage = () => {
    const {
        selectedRowIds,
        isSelected,
        isSelectedAll,
        isIndeterminate,
        toggleSelected,
        toggleSelectedAll,
    } = useRowSelectOriginal(rows.map((row) => row.id));

    return (
        <Box>
            <Typography>
                Selectable Table Sample
            </Typography>
            <TableContainer component={Paper}>
                <MuiThemeProvider theme={theme}>
                    <Table>
                        <SelectableTableHead
                            onSelectAllClick={toggleSelectedAll}
                            headCells={headCells}
                            checked={isSelectedAll}
                            indeterminate={isIndeterminate}
                        />
                        <TableBody>
                            {rows.map((row) => {
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
                                        <TableCell>{row.name}</TableCell>
                                        <TableCell>{row.calories}</TableCell>
                                        <TableCell>{row.fat}</TableCell>
                                        <TableCell>{row.carbs}</TableCell>
                                        <TableCell>{row.protein}</TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </MuiThemeProvider>
            </TableContainer>
            <Box>
                <Typography>selectedRowIds</Typography>
                <Typography>{JSON.stringify(selectedRowIds)}</Typography>
            </Box>
        </Box>
    );
}

export default SelectableTable
