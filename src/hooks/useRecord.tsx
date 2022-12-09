import React, { useCallback, useEffect, useState } from 'react'
import useSWR from 'swr';
import { Record } from '../../types';
import { fetcher } from './fetcher';


// interface Props {
//     setShowRecords: React.Dispatch<any>;
// }

const useRecord = () => {
    // const [host, setHost] = useState('');
    // useEffect(() => {
    //     setHost(window.location.href.split('/searchRecordPage')[0]);
    // }, []);
    const { data, error, mutate } = useSWR<Record[]>(
        `/api/record`,
        fetcher,
    );

    // refetchの役割は？
    const refetch = useCallback(() => mutate(), [mutate]);

    return {
        records: data,
        isLoading: !error && !data,
        error,
        refetch,
    };
}

export default useRecord
