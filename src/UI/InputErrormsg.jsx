import { memo } from "react";

/* eslint-disable react/prop-types */
function InputErrormsg({ msg }) {
  return (
    <span className="text-white font-semibold text-sm block bg-red-500 rounded-md p-2">
      {msg}
    </span>
  );
}

export default memo(InputErrormsg);
