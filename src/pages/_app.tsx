import '../styles/globals.css'
import type { AppProps } from 'next/app'
import useTransition from '../hooks/useTransition';

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  require("../../.mocks");
}

export default function App({ Component, pageProps }: AppProps) {
  // 画面のローディング機能
  useTransition();
  return <Component {...pageProps} />
}
