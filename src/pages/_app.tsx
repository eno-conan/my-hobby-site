import '../styles/globals.css'
import type { AppProps } from 'next/app'
import useTransition from '../hooks/useTransition';
// import worker from '../mocks/browser';

export default function App({ Component, pageProps }: AppProps) {
  // if (process.env.NODE_ENV === 'development') {
  //   const MockServer = () => worker;
  //   MockServer();
  // }
  // 画面のローディング機能
  useTransition();
  return <Component {...pageProps} />
}
