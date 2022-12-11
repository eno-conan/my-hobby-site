import type { NextPage } from "next";
import Link from "next/link";

const transitionFrom: NextPage = () => {
    return (
        <div>
            <div>Next.js + TypeScript + NProgress example.</div>
            <div>This is index page.</div>
            <Link href="transitionTo">about</Link>
        </div>
    );
}

export default transitionFrom
