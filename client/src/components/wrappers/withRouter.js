import {useNavigate, useLocation} from 'react-router-dom';

export const withRouter = Component => {
  const Wrapper = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
      <Component navigate={navigate} location={location} {...props} />
    );
  };
  
  return Wrapper;
};