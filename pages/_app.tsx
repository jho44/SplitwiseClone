import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Montserrat, Lato } from "next/font/google";
import "tailwindcss/tailwind.css";
import "./globals.css";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const lato = Lato({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <main className={`${montserrat.className} ${lato.className}`}>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default App;
