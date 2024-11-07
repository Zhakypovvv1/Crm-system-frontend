import { Outlet } from "react-router-dom";
import AppFooter from "../../widgets/Footer/ui/Footer/AppFooter";
import AppHeader from "../../widgets/Header/ui/Header/AppHeader";
import Sidebar from "../../widgets/Sidebar/ui/Sidebar/Sidebar";
import s from "./AppLayout.module.scss";
import { Layout } from "antd";

const AppLayout = () => {
  return (
    <>
      <Layout className={s.layout}>
        <Sidebar />
        <Layout className={s.siteLayout}>
          <AppHeader />
          <div className={s.content}>
            <Outlet />
          </div>
          <AppFooter />
        </Layout>
      </Layout>
    </>
  );
};

export default AppLayout;
