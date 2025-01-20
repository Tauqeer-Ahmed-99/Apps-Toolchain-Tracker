import React, { PropsWithChildren } from "react";
import { ClerkProvider } from "@clerk/nextjs";

const AuthProvider = async ({ children }: PropsWithChildren) => {
  return <ClerkProvider>{children}</ClerkProvider>;
};

export default AuthProvider;
