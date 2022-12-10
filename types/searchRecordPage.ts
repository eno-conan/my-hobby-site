export interface IData {
    title: string;
    description: string;
    githubRepo: string;
    updated_at: number;
    finished: boolean;
}

export interface Column {
    id: 'title' | 'description' | 'githubRepo' | 'updated_at' | 'finished';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

export const columns: readonly Column[] = [
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