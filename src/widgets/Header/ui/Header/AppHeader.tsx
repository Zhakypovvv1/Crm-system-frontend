import Search from "../../../../entities/Search/ui/Search/Search";
import Profile from "../../../Profile/ui/Profile/Profile";
import s from "./AppHeader.module.scss";
import { Header } from "antd/es/layout/layout";

const AppHeader = () => {
  return (
    <Header className={s.header}>
      <Search />
      <Profile />
    </Header>
  );
};

export default AppHeader;
