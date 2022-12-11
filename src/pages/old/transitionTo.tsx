import type { NextPage } from "next";
import Link from "next/link";

const transitionTo = () => {
    return (
        <div>
            <div>Next.js + TypeScript + NProgress example.</div>
            <div>This is about page.</div>
            <Link href="/transitionFrom">index</Link>
        </div>
    );
}

export default transitionTo
