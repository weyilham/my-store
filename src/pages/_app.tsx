import Navbar from "@/components/Layouts/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import Head from "next/head";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
        />
      </Head>
      <Navbar />
      <div className={popins.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
