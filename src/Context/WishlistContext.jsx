/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstanse";
import toast from "react-hot-toast";

export const WishlistContext = createContext("");
const localData = localStorage.getItem("userToken");
const userData = localData ? localData : null;
function WishlistContextProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const [wishlistAll, setWhishlist] = useState(null);
  const [wishlistCount, setWhishlistCount] = useState(0);
  const [fill, setFill] = useState([]);
  const headers = {
    token: `${userData}`,
  };

  async function handleFill(id) {
    try {
      setFill((fill) => [...fill, id]);
      const res = await axiosInstance.post(
        "/api/v1/wishlist",
        {
          productId: `${id}`,
        },
        {
          headers,
        }
      );
      setFill(res.data.data);
      setWhishlistCount(res.data.data.length);
      if (res.status === 200) {
        toast.success(`IT'S BEEN ADD SUSSECCESFULLY ❤️`, {
          position: "top-center",
          duration: 1500,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (userData) {
      getWishlist();
    }
  }, [userData]);
  async function getWishlist() {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/api/v1/wishlist", { headers });

      setWhishlist(data.data);
      setFill(data.data.map((el) => el.id));
      setWhishlistCount(data.data.length);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteWhislist(id) {
    try {
      setFill((fill) => fill.filter((el) => el !== id));
      const res = await axiosInstance.delete(`/api/v1/wishlist/${id}`, {
        headers,
      });
      console.log(res);

      getWishlist();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <WishlistContext.Provider
      value={{
        getWishlist,
        loading,
        wishlistAll,
        fill,
        handleFill,
        deleteWhislist,
        setFill,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistContextProvider;
