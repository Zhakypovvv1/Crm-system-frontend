import ShareForm from "../../../../shared/ui/shareForm/shareForm";
import { NavLink } from "react-router-dom";
import { formConfig } from "../../../../shared/config/formConfig";
import { AuthThunk } from "../../../../shared/slicer/auth/authSlicer";
import { useAppDispatch } from "../../../../shared/hooks/redux-hooks";

const Authorization = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (formData: Record<string, unknown>) => {
    dispatch(AuthThunk(formData));
    console.log(formData);
  };
  return (
    <section>
      <div className="container">
        <ShareForm
          type="login"
          handleSubmit={handleSubmit}
          config={formConfig}
        />
        <NavLink to="/auth/register">Регистрация</NavLink>
      </div>
    </section>
  );
};

export default Authorization;
