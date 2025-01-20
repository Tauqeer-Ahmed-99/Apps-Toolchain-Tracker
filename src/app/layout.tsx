import AuthProvider from "@/providers/AuthProvider";
import NavbarProvider from "@/providers/NavbarProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import * as React from "react";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <InitColorSchemeScript attribute="class" />
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider>
              <NavbarProvider>{props.children}</NavbarProvider>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
