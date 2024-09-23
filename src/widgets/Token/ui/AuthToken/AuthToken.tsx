import { Navigate } from "react-router-dom";
import Authorization from "../../../Authorization/ui/Authorization/Authorization";
import { useAppSelector } from "../../../../shared/hooks/redux-hooks";
import { RootState } from "../../../../app/Provider/store/store";

const AuthToken = () => {
  const token = useAppSelector((state: RootState) => state.getToken.token);
  console.log(token);
  return <>{token ? <Navigate to="/" /> : <Authorization />}</>;
};

export default AuthToken;
