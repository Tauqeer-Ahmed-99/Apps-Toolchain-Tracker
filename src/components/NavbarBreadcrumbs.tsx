"use client";

import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { usePathname } from "next/navigation";
import { toTitleCase } from "@/lib/utils";

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  [`& .${breadcrumbsClasses.separator}`]: {
    color: theme.palette.action.disabled,
    margin: 1,
  },
  [`& .${breadcrumbsClasses.ol}`]: {
    alignItems: "center",
  },
}));

export default function NavbarBreadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = pathname.split("/");

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs.map((breadcrumb, index, breadcrumbs) => (
        <Typography
          key={breadcrumb + index}
          variant="body1"
          sx={
            index + 1 === breadcrumbs.length
              ? { color: "text.primary", fontWeight: 600 }
              : undefined
          }
        >
          {toTitleCase(breadcrumb)}
        </Typography>
      ))}
    </StyledBreadcrumbs>
  );
}
