/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { getToken } from "../../config/jwt";

const ProtectedRoute = (props) => {
  const token = getToken();
  return token ? <> {props.element}</> : <Navigate to="/" />;
};

export default ProtectedRoute;
