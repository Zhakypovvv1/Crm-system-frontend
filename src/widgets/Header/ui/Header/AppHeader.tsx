import Search from "../../../../entities/Search/ui/Search/Search";
import ThemeSwitcher from "../../../../shared/ui/ThemeSwitcher/ThemeSwitcher";
import Profile from "../../../Profile/ui/Profile/Profile";
import s from "./AppHeader.module.scss";
import { Header } from "antd/es/layout/layout";

const AppHeader = () => {
  return (
    <Header className={s.header}>
      <Search />
      {/* <ThemeSwitcher /> */}
      <Profile />
    </Header>
  );
};

export default AppHeader;
