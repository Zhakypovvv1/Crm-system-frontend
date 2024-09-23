import s from "./AppFooter.module.scss";
import { Footer } from "antd/es/layout/layout";

const AppFooter = () => {
  return (
    <Footer className={s.footer}>CRM SYSTEM {new Date().getFullYear()}</Footer>
  );
};

export default AppFooter;
