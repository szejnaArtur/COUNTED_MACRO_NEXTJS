import '../styles/globals.css'
import type {AppProps} from 'next/app'

import Layout from '../components/layout/layout';
import Head from "next/head";

import { NotificationContextProvider } from '../store/notification-context';

export default function App({Component, pageProps}: AppProps) {
    return (
        <NotificationContextProvider>
        <Layout>
            <Head>
                <title>Macro Counter</title>
            </Head>
            <Component {...pageProps} />
        </Layout>
        </NotificationContextProvider>
    )
}
