import React from 'react'
import Head from 'next/head'
import Box from '@mui/material/Box';

// ページの見出し用Component
const CommonHeadline = ({ headLine = "Photo Application" }) => {
    return (
        <Box sx={{ color: 'primary.success', }} fontSize={22}>
            <h1>{headLine}</h1>
        </Box>
    )
}

export default CommonHeadline
