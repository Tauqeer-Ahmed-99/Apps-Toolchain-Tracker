"use client";

import React, { PropsWithChildren, useEffect } from "react";
import { KindeProvider } from "@kinde-oss/kinde-auth-nextjs";
import routes from "@/routes";
import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";

const AuthProvider = ({ children }: PropsWithChildren) => {
  return <KindeProvider>{children}</KindeProvider>;
};

export default AuthProvider;
