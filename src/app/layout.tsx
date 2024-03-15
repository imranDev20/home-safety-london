import { theme } from "@/shared/theme";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./_components/global/header";
import Footer from "./_components/global/footer";
import TopLoader from "./_components/common/top-loader";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CssVarsProvider theme={theme}>
      <CssBaseline />
      <html lang="en">
        <body className={inter.className}>
          <TopLoader />
          <Header />

          <Suspense>{children}</Suspense>

          <Footer />
        </body>
      </html>
    </CssVarsProvider>
  );
}
