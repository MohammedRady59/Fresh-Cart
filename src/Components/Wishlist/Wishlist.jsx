import { Trash2 } from "lucide-react";
import Button from "../../UI/Button";
import { memo, useContext, useEffect } from "react";
import { WishlistContext } from "../../Context/WishlistContext";
import Loading from "../../UI/Loading";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";

function Wishlist() {
  const { AddItemCart } = useContext(CartContext);

  const { getWishlist, loading, wishlistAll, deleteWhislist } =
    useContext(WishlistContext);
  useEffect(() => {
    getWishlist();
  }, []);
  async function TostAddcart(id) {
    try {
      const res = await AddItemCart(id);
      if (res.status === 200) {
        toast.success(`Proudct Added In Cart`, {
          position: "top-center",
          duration: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <h2 className="text-3xl text-green-400 text-center py-4">My Wishlist</h2>
      <>
        {loading ? (
          <Loading />
        ) : (
          <>
            {wishlistAll?.length > 0 ? (
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <tbody>
                    {wishlistAll?.map((el, idx) => (
                      <tr
                        className="bg-white border-b   hover:bg-gray-50"
                        key={idx}
                      >
                        <td className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                              <img
                                className="w-16 md:w-64 max-w-full max-h-full block"
                                src={el.imageCover}
                                alt={el.title}
                                loading="lazy"
                              />
                              <div>
                                <h2 className="text-2xl font-semibold text-black my-2">
                                  {el.title}
                                </h2>
                                <p className="text-2xl font-semibold text-green-400 my-2">
                                  {el.price} EGP
                                </p>
                                <p
                                  className="flex  items-center text-lg cursor-pointer text-red-600 gap-1 my-2"
                                  onClick={() => deleteWhislist(el.id)}
                                >
                                  {" "}
                                  <Trash2 />
                                  Remove
                                </p>
                              </div>
                            </div>
                            <div>
                              <Button
                                onClick={() => TostAddcart(el.id)}
                                className="p-2 text-2xl rounded-md bg-green-500 text-white my-2 flex items-center justify-center disabled:bg-green-400 cursor-pointer disabled:cursor-auto "
                              >
                                Add To Cart
                              </Button>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <h2 className="text-3xl text-black font-bold  py-4">
                No Wishlist Yet!
              </h2>
            )}
          </>
        )}
      </>
    </div>
  );
}

export default memo(Wishlist);
