import { Navigate } from "react-router-dom";
import Register from "../../../Register/ui/Register/Register";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/Provider/store/store";

const RegisterToken = () => {
  const token = useSelector((state: RootState) => state.getToken.token);
  console.log(token);
  return <>{token ? <Navigate to="/" /> : <Register />}</>;
};

export default RegisterToken;
