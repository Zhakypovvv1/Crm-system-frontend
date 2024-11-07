import { createContext, useContext } from "react";

export const ThemeContext = createContext();
export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};
