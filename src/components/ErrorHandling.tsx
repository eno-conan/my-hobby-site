import Link from 'next/link'
import React from 'react'
import styles from '../styles/Home.module.css'

const ErrorHandling = () => {
    return (
        <>
            <main className={styles.main}>
                <h1>
                    予期せぬエラーが発生しました
                </h1>
                <h1 className={styles.nextaction}>
                    <Link href="/searchRecordPage">記録一覧に戻る</Link>
                </h1>
            </main>
        </>
    )
}

export default ErrorHandling
