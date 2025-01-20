"use client";

import { toTitleCase } from "@/lib/utils";
import NavigateNextRoundedIcon from "@mui/icons-material/NavigateNextRounded";
import { Typography } from "@mui/material";
import Breadcrumbs, { breadcrumbsClasses } from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
import { useParams, usePathname, useSearchParams } from "next/navigation";

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

export default function NavbarBreadcrumbs({}: {}) {
  const pathname = usePathname();

  const queryParams = useSearchParams();

  const name = queryParams.get("name");

  const breadcrumbs = pathname.split("/");

  return (
    <StyledBreadcrumbs
      aria-label="breadcrumb"
      separator={<NavigateNextRoundedIcon fontSize="small" />}
    >
      {breadcrumbs.map((bc, index) => (
        <Typography
          key={bc + index}
          variant="body1"
          sx={
            index + 1 === breadcrumbs.length
              ? { color: "text.primary", fontWeight: 600 }
              : undefined
          }
        >
          {toTitleCase(
            index + 1 === breadcrumbs.length && name ? (name as string) : bc
          )}
        </Typography>
      ))}
    </StyledBreadcrumbs>
  );
}
