import useAuthGetQuery from "../../hooks/useAuthGetQuery";
import Loading from "../../UI/Loading";

/* eslint-disable react/prop-types */
function Subcategores({ id }) {
  const { data, isPending } = useAuthGetQuery({
    queryKey: ["sub", id],
    url: `/api/v1/categories/${id}/subcategories`,
  });
  if (isPending) return <Loading />;
  return (
    <>
      {data?.data.map((el) => (
        <div key={el._id} className="hover:shadow-xl px-2">
          <h3 className="p-3 font-semibold  text-black text-center text-3xl border-2 ">
            {el.name}
          </h3>
        </div>
      ))}
    </>
  );
}

export default Subcategores;
