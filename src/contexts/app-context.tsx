import { createContext, useContext, useState, type ReactNode } from "react";

interface AppContextType {
  pageTitle: string;
  setPageTitle: (title: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [pageTitle, setPageTitle] = useState("Início");

  return (
    <AppContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
