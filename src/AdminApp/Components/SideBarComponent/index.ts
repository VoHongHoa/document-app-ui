import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import CollectionsIcon from "@mui/icons-material/Collections";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import SafetyDividerIcon from "@mui/icons-material/SafetyDivider";
import CategoryIcon from "@mui/icons-material/Category";
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
    title: "Categories",
    icon: CategoryIcon,
    path: "/admin/categories",
  },
  {
    title: "Collections",
    icon: CollectionsIcon,
    path: "/admin/collections",
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
