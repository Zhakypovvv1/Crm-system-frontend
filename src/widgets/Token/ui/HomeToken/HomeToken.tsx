import Home from '../../../Home/ui/Home/Home';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../app/Provider/store/store';

const HomeToken = () => {
  const token = useSelector((state:RootState) => state.getToken.token);
  console.log(token);
  return <>{token ? <Home /> : <Navigate to="/auth/authorization" />}</>;
};

export default HomeToken;
