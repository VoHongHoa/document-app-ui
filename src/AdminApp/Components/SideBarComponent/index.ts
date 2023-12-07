import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";

export type TSideBarData = {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  path: string;
  children?: TSideBarData[];
};

export const sidebarItem: TSideBarData[] = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    path: "/admin",
  },
  {
    title: "Users",
    icon: PersonIcon,
    path: "/admin/users",
    children: [
      {
        icon: PersonIcon,
        path: "/admin/users/create",
        title: "Create",
      },
    ],
  },
  {
    title: "Documents",
    icon: DocumentScannerIcon,
    path: "/admin/documents",
  },
  {
    title: "Roles",
    icon: SafetyDividerIcon,
    path: "/admin/roles",
  },
];
