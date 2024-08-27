import Navbar from "@/components/Fragments/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { Poppins } from "next/font/google";
import { useRouter } from "next/router";

const popins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const disableNavbar = ["auth", "admin"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();
  return (
    <SessionProvider session={session}>
      {!disableNavbar.includes(pathname.split("/")[1]) && <Navbar />}

      <div className={popins.className}>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
