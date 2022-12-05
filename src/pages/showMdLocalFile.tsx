import fs from 'fs'
import { NextPage, GetStaticProps } from 'next'
import ReactMarkdwon from 'react-markdown'

type StaticProps = {
    terms: string
}

const Terms: NextPage<StaticProps> = (props) => {
    const { terms } = { ...props }
    return (
        <>
            <main>
                <ReactMarkdwon skipHtml={true}>{terms}</ReactMarkdwon>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const terms = fs.readFileSync(process.cwd() + '/docs/terms.md', 'utf8')
    return {
        props: {
            terms: terms,
        }
    }
}

export default Terms
