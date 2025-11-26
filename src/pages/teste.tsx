import Container from "../components/container";

import { useAppContext } from "@/contexts/app-context";
import { useEffect } from "react";

export default function PageTest() {
  const { setPageTitle } = useAppContext();

  useEffect(() => {
    setPageTitle("Teste");
  }, [setPageTitle]);

  return <Container className="space-y-3"></Container>;
}
