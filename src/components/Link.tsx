import React, { PropsWithChildren } from "react";
import NextLink, { LinkProps } from "next/link";

const Link = ({ children, ...props }: LinkProps & PropsWithChildren) => {
  return (
    <NextLink {...props} style={{ textDecoration: "none", color: "inherit" }}>
      {children}
    </NextLink>
  );
};

export default Link;
