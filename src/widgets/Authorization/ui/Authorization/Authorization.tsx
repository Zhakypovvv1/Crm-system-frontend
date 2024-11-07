import ShareForm from "../../../../shared/ui/shareForm/shareForm";
import { NavLink } from "react-router-dom";
import { formConfig } from "../../../../shared/config/formConfig";
import { AuthThunk } from "../../../../shared/slicer/auth/authSlicer";
import { useAppDispatch } from "../../../../shared/hooks/redux-hooks";
import s from "./Authorization.module.scss";
import Title from "antd/es/typography/Title";

const Authorization = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (formData: Record<string, unknown>) => {
    dispatch(AuthThunk(formData));
  };
  return (
    <div className={s.container}>
      <Title>Authorization</Title>
      <ShareForm type="login" handleSubmit={handleSubmit} config={formConfig} />
      <NavLink style={{ textDecoration: "none" }} to="/auth/register">
        Регистрация
      </NavLink>
    </div>
  );
};

export default Authorization;
