import React from "react";
import { Switch } from "antd";
import { useTheme } from "../../hooks/useTheme";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Switch
      checked={theme === "night"}
      onChange={toggleTheme}
      checkedChildren={<FaMoon style={{ color: "#ffd700" }} />}
      unCheckedChildren={<FaSun style={{ color: "#ff6347" }} />}
    />
  );
};

export default ThemeSwitcher;
