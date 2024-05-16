import { Inter } from "next/font/google";
import ThemeRegistry from "../_components/theme-registry";
import TopLoader from "../_components/common/top-loader";
import AdminNavigation from "./_components/admin-navigation";
import QueryProvider from "../_components/query-provider";
import { SnackbarProvider } from "../_components/snackbar-provider";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <ThemeRegistry options={{ key: "joy" }}>
            <SnackbarProvider>
              <TopLoader />
              <AdminNavigation>{children}</AdminNavigation>
            </SnackbarProvider>
          </ThemeRegistry>
        </QueryProvider>
      </body>
    </html>
  );
}
