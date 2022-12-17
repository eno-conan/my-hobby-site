import React from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MaterialLink from '@mui/material/Link';

interface Props {
    subDirArr: string[]
}

const CommonBreadcrumbs = ({ subDirArr }: Props) => {
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <MaterialLink underline="hover" color="inherit" href="/">
                Top
            </MaterialLink>
            {subDirArr.map((ele, idx) => (
                // 最下層は自身のページなのでリンク機能はなし
                <div key={idx}>
                    {idx + 1 == subDirArr.length ?
                        (
                            <>
                                <MaterialLink underline="hover" color="inherit">
                                    {ele}
                                </MaterialLink>
                            </>
                        )
                        :
                        (
                            <>
                                <MaterialLink underline="hover" color="inherit" href={`/${ele}`}>
                                    {ele}
                                </MaterialLink>
                            </>
                        )
                    }
                </div>
            )
            )}
        </Breadcrumbs>
    )
}

export default CommonBreadcrumbs
