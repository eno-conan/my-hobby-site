export interface IQiitaArticle {
    url: string;
    title: string;
    likesCount: number;
    stocksCount: number;
}

export const sampleArticles: IQiitaArticle[] = [
    { url: '', title: '', likesCount: 0, stocksCount: 0 }
]

export const tags = [
    {
        value: '',
        label: '',
    },
    {
        value: 'AWS',
        label: 'AWS',
    },
    {
        value: 'Terraform',
        label: 'Terraform',
    },
    {
        value: 'next.js',
        label: 'next.js',
    },
    {
        value: 'React',
        label: 'React',
    },
];