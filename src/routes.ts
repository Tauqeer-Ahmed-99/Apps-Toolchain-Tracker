import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import InfoRoundedIcon from "@mui/icons-material/InfoRounded";
import HelpRoundedIcon from "@mui/icons-material/HelpRounded";

export enum Routes {
  Auth = "/auth",
  Dashboard = "/dashboard",
  Settings = "/settings",
  About = "/about",
  Feedback = "/feedback",
}

export interface Route {
  label: string;
  path: Routes;
  isNavItem?: boolean;
  isProtected?: boolean;
  showNavbar?: boolean;
  isSecondary?: boolean;
  icon: typeof LoginRoundedIcon;
}

const routes: Route[] = [
  {
    label: "Auth",
    path: Routes.Auth,
    icon: LoginRoundedIcon,
  },
  {
    label: "Dashboard",
    path: Routes.Dashboard,
    isNavItem: true,
    isProtected: true,
    showNavbar: true,
    icon: DashboardRoundedIcon,
  },
  {
    label: "Settings",
    path: Routes.Settings,
    isNavItem: true,
    isProtected: true,
    showNavbar: true,
    isSecondary: true,
    icon: SettingsRoundedIcon,
  },
  {
    label: "About",
    path: Routes.About,
    isNavItem: true,
    isProtected: true,
    showNavbar: true,
    isSecondary: true,
    icon: InfoRoundedIcon,
  },
  {
    label: "Feedback",
    path: Routes.Feedback,
    isNavItem: true,
    showNavbar: true,
    isProtected: true,
    isSecondary: true,
    icon: HelpRoundedIcon,
  },
];

export default routes;
