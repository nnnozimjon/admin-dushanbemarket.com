"use client";

import "@mantine/core/styles.css";
import "./globals.css";
import { store } from "@/store";
import { MantineProvider } from "@mantine/core";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Layout } from "@/components";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const authRoutes = ["/auth"];
  const isAuth = authRoutes.includes(pathName);

  const MainLayout = isAuth ? <>{children}</> : <Layout>{children}</Layout>;
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <MantineProvider>
            {MainLayout}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              newestOnTop={true}
              pauseOnHover
            />
          </MantineProvider>
        </Provider>
      </body>
    </html>
  );
}
