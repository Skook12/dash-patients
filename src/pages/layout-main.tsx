import { Outlet } from "react-router";
import MainContent from "../core-components/main-component";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/core-components/header";
import { AppProvider } from "@/contexts/app-context";

export default function LayoutMain() {
  return (
    <>
      <AppProvider>
        <SidebarProvider className="p-5">
          <AppSidebar />
          <SidebarInset>
            <Header />
            <MainContent>
              <Outlet />
            </MainContent>
          </SidebarInset>
        </SidebarProvider>
      </AppProvider>
    </>
  );
}
