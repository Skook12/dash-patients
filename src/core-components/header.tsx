import { SidebarTrigger } from "@/components/ui/sidebar";
import Container from "../components/container";
import { ModeToggle } from "@/components/mode-togle";
import { useAppContext } from "@/contexts/app-context";

export default function Header() {
  const { pageTitle } = useAppContext();
  return (
    <Container
      as="header"
      className="flex items-center justify-between border-b-2 p-5"
    >
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <div className="h-6 border-r border-border" />
        <h1 className="text-xl font-semibold">{pageTitle}</h1>
      </div>
      <ModeToggle />
    </Container>
  );
}
