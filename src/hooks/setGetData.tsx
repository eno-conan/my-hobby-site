import { Record } from '@prisma/client'
import React, { useEffect } from 'react'

const setGetData = (setShowRecords: React.Dispatch<any>, records: Record[] | undefined) => {
    useEffect(() => {
        setShowRecords(records)
    }, []);
    // setShowRecords(records)
    return (
        <div>

        </div>
    )
}

export default setGetData
