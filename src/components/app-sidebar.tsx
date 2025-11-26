import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
} from "../components/ui/sidebar";

import { menu } from "@/data-const/menu";
import { NavMain } from "./nav-main";
import { HeartPulse } from "lucide-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="border-b-2 ">
        <SidebarMenuButton
          className="group  pointer-events-none"
          size="lg"
          asChild
        >
          <div>
            <HeartPulse className="shrink-0 " />

            <span className="group-data-[state=collapsed]:opacity-0 group-data-[state=collapsed]:-translate-x-4 transition-all duration-200">
              Clinica
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menu} />
      </SidebarContent>
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}
