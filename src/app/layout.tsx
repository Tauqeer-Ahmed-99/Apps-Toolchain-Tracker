import * as React from "react";
import AuthProvider from "@/providers/AuthProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import NavBarDataWrapper from "@/components/NavBarDataWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Apps Service Tracker",
  description:
    "This App helps in tracking servcies and tools used by an application.",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <InitColorSchemeScript attribute="class" />
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <ThemeProvider>
              <NavBarDataWrapper>{props.children}</NavBarDataWrapper>
            </ThemeProvider>
          </AppRouterCacheProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
