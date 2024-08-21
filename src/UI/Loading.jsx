import { memo } from "react";
import { ColorRing } from "react-loader-spinner";

function Loading() {
  return (
    <div className="flex items-center justify-center fixed inset-0 z-20 bg-white">
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    </div>
  );
}

export default memo(Loading);
