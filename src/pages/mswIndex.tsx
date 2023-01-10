import type { GetServerSideProps } from "next";
import React, { useEffect, useState } from "react";
import type { Source } from "../../types";

type Props = {
    data: Source;
};

const MswIndex = (props: any) => {
    const { status, data } = useFetchData();
    if (status === 'loading') {
        return <p>Loading...</p>;
    }
    if (status === 'error') {
        return <p>There was an error fetching the data!</p>;
    }
    return (
        <>
            {data && data.map((d: any) => (
                d.title
            ))}
        </>
    );
};

interface IResData {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
}

function useFetchData() {
    const [status, setStatus] = useState('idle');
    const [data, setData] = useState<IResData[]>();
    useEffect(() => {
        setStatus('loading');
        fetch('https://jsonplaceholder.typicode.com/todos/')
            .then((res) => {
                if (!res.ok) {
                    throw new Error(res.statusText);
                }
                return res;
            })
            .then((res) => res.json())
            .then((data) => {
                setStatus('success');
                setData(data);
            })
            .catch(() => {
                setStatus('error');
            });
    }, []);
    return {
        status,
        data,
    };
}

// ServerSidePropsでmswは機能しないかもしれない
// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//     const data = await fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
//         res.json()
//     )
//     return {
//         props: {
//             data: data,
//         },
//     };
// };

export default MswIndex;
