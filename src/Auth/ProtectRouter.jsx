import { Navigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function ProtectRouter({ notAllow, path, children }) {
  if (!notAllow) return <Navigate to={`/${path}`} />;
  return children;
}

export default ProtectRouter;
