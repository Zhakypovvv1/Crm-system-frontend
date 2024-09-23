import ShareForm from '../../../../shared/ui/shareForm/shareForm';
import { NavLink } from 'react-router-dom';
import { registerThunk } from '../../../../shared/slicer/auth/registerSlicer';
import { formConfig } from '../../../../shared/config/formConfig';
import { useAppDispatch } from '../../../../shared/hooks/redux-hooks';

const Register = () => {
  const dispatch = useAppDispatch();
  const handleSubmit = (formData: Record<string, unknown>) => {
    dispatch(registerThunk(formData));
  };
  return (
    <section>
      <div className="container">
        <ShareForm
          type="register"
          handleSubmit={handleSubmit}
          config={formConfig}
        />
        <NavLink to="/auth/authorization">Войти</NavLink>
      </div>
    </section>
  );
};

export default Register;
