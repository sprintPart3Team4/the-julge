import type { AppProps } from "next/app";
import { AuthProvider } from "@/contexts/AuthProvider";
import NavBar from "@/components/common/navBar/NavBar";
import "@/styles/global.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* <NavBar /> */}
      <Component {...pageProps} />
    </AuthProvider>
  );
}
