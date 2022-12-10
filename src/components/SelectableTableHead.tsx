import { Checkbox, TableHead, TableRow, TableCell } from "@material-ui/core";

export type HeadCell = {
    id: string;
    label: string;
};

type SelectableTableHeadProps = {
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    headCells: HeadCell[];
    checked: boolean;
    indeterminate: boolean;
};

export const SelectableTableHead: React.VFC<SelectableTableHeadProps> = ({
    onSelectAllClick,
    headCells,
    checked,
    indeterminate,
}) => {
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={indeterminate}
                        checked={checked}
                        onChange={onSelectAllClick}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell key={headCell.id} padding={"normal"}>
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};