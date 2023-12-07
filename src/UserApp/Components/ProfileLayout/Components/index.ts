import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MoneyIcon from "@mui/icons-material/Money";

type TSideBarData = {
  title: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  path: string;
  children?: TSideBarData[];
};

export const sidebarItem: TSideBarData[] = [
  {
    title: "My Account",
    icon: ManageAccountsIcon,
    path: "/user",
  },
  {
    title: "My Document",
    icon: TextSnippetIcon,
    path: "/user/my-document",
  },
  {
    title: "My Download Document",
    icon: CloudDownloadIcon,
    path: "/user/download-document",
  },
  {
    title: "My E-Point",
    icon: MoneyIcon,
    path: "/user/my-epoint",
  },
];
