import { memo, useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";
import Loading from "../../UI/Loading";
import { Link } from "react-router-dom";

function Carts() {
  const {
    getCartItem,
    updateItem,
    deleteItem,
    cartDetail,
    setCartDetails,
    loading,
    setLoading,
  } = useContext(CartContext);
  async function getProudct() {
    const itemCart = await getCartItem();
    setCartDetails(itemCart.data);
  }
  async function updates(id, countNum) {
    try {
      setLoading(true);
      if (countNum > 0) {
        const res = await updateItem(id, countNum);
        setCartDetails(res.data.data);
      } else {
        deletes(id);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  async function deletes(id) {
    const res = await deleteItem(id);
    setCartDetails(res.data.data);
  }
  useEffect(() => {
    getProudct();
  }, []);

  return (
    <>
      <h2 className="text-3xl text-green-400 text-center py-4">
        Shopping Cart
      </h2>
      {loading ? (
        <Loading />
      ) : (
        <>
          <h2 className="text-lg font-light text-center py-4 text-slate-500">
            Total Cart Price: {cartDetail?.totalCartPrice} EGP
          </h2>

          {cartDetail ? (
            <div>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Qty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetail?.products?.map((el, idx) => (
                      <tr
                        key={idx}
                        className="bg-white border-b   hover:bg-gray-50"
                        data-aos="fade-right"
                      >
                        <td className="p-4">
                          <img
                            src={el.product.imageCover}
                            className="w-16 md:w-32 max-w-full max-h-full"
                            alt={el.product.title}
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 ">
                          {el.product.title}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <button
                              onClick={() =>
                                updates(el.product.id, el.count - 1)
                              }
                              className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 2"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 1h16"
                                />
                              </svg>
                            </button>
                            <div>
                              <span>{el.count}</span>
                            </div>
                            <button
                              onClick={() =>
                                updates(el.product.id, el.count + 1)
                              }
                              className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200"
                              type="button"
                            >
                              <span className="sr-only">Quantity button</span>
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 18 18"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M9 1v16M1 9h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900">
                          {el.price * el.count} EGP
                        </td>
                        <td className="px-6 py-4">
                          <span
                            onClick={() => deletes(el.product.id)}
                            className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="my-5">
                <Link
                  className="bg-green-400 py-2 px-2 text-white m-2 rounded-md "
                  to="/checkout"
                >
                  Check out
                </Link>
              </div>
            </div>
          ) : (
            "Cart is empty"
          )}
        </>
      )}
    </>
  );
}

export default memo(Carts);
