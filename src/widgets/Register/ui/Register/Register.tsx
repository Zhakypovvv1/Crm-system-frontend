import ShareForm from "../../../../shared/ui/shareForm/shareForm";
import { NavLink } from "react-router-dom";
import { registerThunk } from "../../../../shared/slicer/auth/registerSlicer";
import { formConfig } from "../../../../shared/config/formConfig";
import { useAppDispatch } from "../../../../shared/hooks/redux-hooks";
import s from "./Register.module.scss";
import Title from "antd/es/typography/Title";

const Register = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (formData: Record<string, unknown>) => {
    dispatch(registerThunk(formData));
  };
  return (
    <section>
      <div className={s.container}>
        <Title>Register</Title>
        <ShareForm
          type="register"
          handleSubmit={handleSubmit}
          config={formConfig}
        />
        <NavLink style={{ textDecoration: "none" }} to="/auth/authorization">
          Войти
        </NavLink>
      </div>
    </section>
  );
};

export default Register;
