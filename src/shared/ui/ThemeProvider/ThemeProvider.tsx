import { useState, useLayoutEffect } from "react";
import { ThemeContext } from "../../hooks/useTheme";

const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "day");

  useLayoutEffect(() => {
    localStorage.setItem("theme", theme);
    document.body.className = `theme-${theme}`;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "day" ? "night" : "day"));
  };
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
