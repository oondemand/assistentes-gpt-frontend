import { Settings, HardHat, LayoutDashboard } from "lucide-react";

export const menuItems = [
  {
    title: "Assistentes",
    icon: HardHat,
    href: "/",
  },
  // {
  //   title: "Assistentes",
  //   icon: HardHat,
  //   href: "/assistentes",
  // },
  {
    title: "Configurações",
    icon: Settings,
    subLinks: [
      {
        title: "Sistema",
        href: "/sistema",
      },
    ],
  },
];
