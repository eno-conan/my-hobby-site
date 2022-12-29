import { useCallback } from 'react'
import useSWR from 'swr';
import { fetcher } from './fetcher';

const useRecord = (path: string) => {
    const { data, error, mutate } = useSWR<any[]>(
        path,
        fetcher,
    );

    // refetchの役割は？
    const refetch = useCallback(() => mutate(), [mutate]);

    return {
        originalRecords: data,
        originalRecordCount: data?.length || 0,
        isLoading: !error && !data,
        error,
        refetch,
    };
}

export default useRecord
