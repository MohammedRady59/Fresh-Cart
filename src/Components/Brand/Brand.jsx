import { memo, useState } from "react";

import Model from "../../UI/Model";
import Loading from "../../UI/Loading";
import useAuthGetQuery from "../../hooks/useAuthGetQuery";

function Brand() {
  let [isOpen, setIsOpen] = useState(false);
  const [idBrand, setIdbrand] = useState(null);

  function handleOpen(id) {
    setIsOpen(!isOpen);
    setIdbrand(id);
  }
  const { data, isPending } = useAuthGetQuery({
    queryKey: ["brand"],
    url: "/api/v1/brands",
  });
  if (isPending) return <Loading />;
  return (
    <div>
      <h2 className="text-3xl text-green-400 text-center py-4">All Brands</h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-4 py-4 px-2">
        {data.data.map((el, idx) => (
          <div
            className="border-2 hover:shadow-xl cursor-pointer duration-500 ease-out transition-all bg-white  p-2 "
            onClick={() => handleOpen(el._id)}
            key={el._id}
            data-aos="fade-up"
            data-aos-delay={idx * 100}
          >
            <img
              src={el.image}
              alt={el.slug}
              loading="lazy"
              className="block w-full   object-cover "
            />
            <h3 className="py-2 font-semibold  text-black text-center text-3xl">
              {el.name}
            </h3>
          </div>
        ))}
      </div>
      {!idBrand
        ? null
        : isOpen && (
            <Model isOpen={isOpen} idBrand={idBrand} handleOpen={handleOpen} />
          )}
    </div>
  );
}

export default memo(Brand);
