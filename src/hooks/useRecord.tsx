import React, { useCallback } from 'react'
import useSWR from 'swr';
import { Record } from '../../types';
import { fetcher } from './fetcher';

const useRecord = () => {
    const { data, error, mutate } = useSWR<Record[]>(
        `/api/record`,
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
