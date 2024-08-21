import { memo } from "react";
import useAuthGetQuery from "../../hooks/useAuthGetQuery";
import Loading from "../../UI/Loading";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function RelateProudct({ id }) {
  const { data, isPending } = useAuthGetQuery({
    queryKey: ["related", `${id}`],
    url: `/api/v1/products?category=${id}`,
  });
  if (isPending) return <Loading />;
  return (
    <>
      <h2 className="text-4xl font-bold md:my-8 my-20 text-center">
        Related Categore
      </h2>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {data.data.map((el, idx) => (
          <div key={idx}>
            <Link to={`/prodctdetail/${el.id}`}>
              <img
                src={el.imageCover}
                alt={el.title}
                className="w-full block rounded-xl"
              />
              <p className="font-semibold text-center line-clamp-1">
                {el.title}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default memo(RelateProudct);
