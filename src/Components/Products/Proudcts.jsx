import toast from "react-hot-toast";
import useAuthGetQuery from "../../hooks/useAuthGetQuery";
import { memo, useContext, useState } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import { CartContext } from "../../Context/CartContext";
import { Heart, Star } from "lucide-react";
import Button from "../../UI/Button";
import { Link } from "react-router-dom";
import Loading from "../../UI/Loading";

function Proudcts() {
  const { AddItemCart } = useContext(CartContext);
  const { fill, handleFill } = useContext(WishlistContext);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(null);

  const { data, isPending } = useAuthGetQuery({
    queryKey: ["proudct"],
    url: "/api/v1/products",
  });
  if (isPending) return <Loading />;

  async function TostAddcart(id) {
    try {
      setLoading(true);
      const res = await AddItemCart(id);
      if (res.status === 200) {
        toast.success(`Proudct Added In Cart`, {
          position: "top-center",
          duration: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  function handleSearch(e) {
    setSearchTerm(e);
  }
  const filteredProducts = searchTerm
    ? data.data.filter((el) =>
        el.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data.data;
  return (
    <>
      <form className="mx-auto md:w-1/2 mb-4">
        <label
          htmlFor="search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            onChange={(e) => handleSearch(e.target.value)}
            type="search"
            id="search"
            className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="Search Your Item"
          />
        </div>
      </form>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 gap-4 py-4    ">
        {filteredProducts?.map((el) => (
          <div
            className="overflow-hidden group  border-2 border-transparent  hover:border-2 hover:border-green-500 rounded-md p-2 cursor-pointer"
            key={el.id}
            data-aos="fade-up"
          >
            <Link to={`/prodctdetail/${el.id}`}>
              <div>
                <img
                  src={el.imageCover}
                  alt={el.title}
                  loading="lazy"
                  className="w-full block rounded-sm "
                />
              </div>
              <div className="py-2 px-1">
                <h2 className="text-green-500 font-semibold">
                  {el.category.name}
                </h2>
                <h2>{el.title.split(" ").slice(0, 2).join(" ")}</h2>
                <div className="flex justify-between items-center my-2">
                  <h3 className="font-medium">{el.price} EGP</h3>
                  <p className="flex items-center gap-2">
                    <Star fill="yellow" className="text-yellow-200" />
                    {el.ratingsAverage}
                  </p>
                </div>
              </div>
            </Link>
            <div className="flex items-center gap-3">
              <Button
                onClick={() => TostAddcart(el.id)}
                isloading={loading}
                className="w-full flex justify-center bg-green-500 p-2 text-white font-bold rounded-md translate-y-[200%] group-hover:translate-y-[0%]  duration-500 disabled:bg-green-200 "
              >
                ADD TO CART
              </Button>
              <div onClick={() => handleFill(el.id)}>
                {fill?.includes(el.id) ? (
                  <Heart className="text-red-600" fill="red" />
                ) : (
                  <Heart className="text-red-600" />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default memo(Proudcts);
/*   */
