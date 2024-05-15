import { Inter } from "next/font/google";
import ThemeRegistry from "../_components/theme-registry";
import TopLoader from "../_components/common/top-loader";
import AdminNavigation from "./_components/admin-navigation";
import QueryProvider from "../_components/query-provider";

const inter = Inter({ subsets: ["latin"] });

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <ThemeRegistry options={{ key: "joy" }}>
        <html lang="en">
          <body className={inter.className}>
            <TopLoader />
            <AdminNavigation>{children}</AdminNavigation>
          </body>
        </html>
      </ThemeRegistry>
    </QueryProvider>
  );
}
