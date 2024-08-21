import { memo } from "react";
import error from "../../assets/images/error.svg";
function NotFound() {
  return (
    <div>
      <img src={error} className="mx-auto my-4" alt="notFound" loading="lazy" />
      ;
    </div>
  );
}

export default memo(NotFound);
