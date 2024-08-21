import { memo, useState } from "react";
import useAuthGetQuery from "../../hooks/useAuthGetQuery";
import Loading from "../../UI/Loading";
import Subcategores from "../SubCategores/Subcategores";

function Categore() {
  const [idCate, setIdCate] = useState(null);
  const [nameCate, setNameCate] = useState(null);
  const { data, isPending } = useAuthGetQuery({
    queryKey: ["categore"],
    url: "/api/v1/categories",
  });
  if (isPending) return <Loading />;
  function handleId(id, name) {
    setIdCate(id);
    setNameCate(name);
  }
  return (
    <div>
      <h2 className="text-3xl text-green-400 text-center py-4">
        My Categories
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 py-4 px-2">
        {data.data.map((el) => (
          <div
            className="border-2 hover:shadow-xl hover:scale-105 cursor-pointer duration-500 ease-out transition-all bg-white p-2"
            key={el._id}
            onClick={() => handleId(el._id, el.name)}
          >
            <img
              src={el.image}
              alt={el.slug}
              loading="lazy"
              className="block w-full h-[350px]  object-cover "
            />
            <h3 className="py-2 font-semibold  text-green-400 text-center text-3xl">
              {el.name}
            </h3>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-3xl text-green-400 text-center py-4">
          {!nameCate ? null : `  ${nameCate} subcategories`}
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-4 py-4">
          {!idCate ? null : <Subcategores id={idCate} />}
        </div>
      </div>
    </div>
  );
}

export default memo(Categore);
