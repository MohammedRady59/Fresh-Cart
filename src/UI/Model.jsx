/* eslint-disable react/prop-types */
import { Dialog, DialogPanel } from "@headlessui/react";
import Loading from "./Loading";
import useAuthGetQuery from "../hooks/useAuthGetQuery";
import { memo } from "react";

function Model({ isOpen, handleOpen, idBrand }) {
  const { data, isPending } = useAuthGetQuery({
    queryKey: ["subbrand", idBrand],
    url: `/api/v1/brands/${idBrand}`,
  });
  if (isPending) return <Loading />;
  return (
    <Dialog open={isOpen} onClose={handleOpen} className="relative z-50">
      <div className="fixed inset-0 flex w-screen items-center bg-[#00000049] justify-center p-4">
        <DialogPanel className="max-w-lg space-y-4 border bg-white p-7 rounded-md">
          <div className="flex gap-4 items-center justify-between">
            <p className="text-xl">{data.data.name}</p>
            <img src={data.data.image} alt="" className="w-[50%]" />
          </div>
          <hr className="border-t-2 border-gray-300" />

          <div className="flex gap-4 justify-end my-2">
            <button
              className="bg-gray-400 text-white p-3 rounded-md text-xl"
              onClick={handleOpen}
            >
              Close
            </button>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}

export default memo(Model);
