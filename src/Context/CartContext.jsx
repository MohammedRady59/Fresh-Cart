/* eslint-disable react/prop-types */
import { createContext, useState } from "react";
import axiosInstance from "../config/axiosInstanse";

export let CartContext = createContext("");
const localData = localStorage.getItem("userToken");
const userData = localData ? localData : null;

export default function CartContectProvider({ children }) {
  const [cartDetail, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const headers = {
    token: `${userData}`,
  };

  async function getCartItem() {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/v1/cart", {
        headers,
      });
      setCartDetails(res.data);
      return res.data;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function AddItemCart(id) {
    try {
      setLoading(true);
      const res = axiosInstance.post(
        "/api/v1/cart",
        {
          productId: `${id}`,
        },
        {
          headers,
        }
      );
      setCartDetails(res);
      return res;
    } catch (error) {
      return error;
    } finally {
      setLoading(false);
    }
  }

  async function updateItem(id, numCount) {
    if (numCount > 0) {
      try {
        setLoading(true);
        const res = axiosInstance.put(
          `/api/v1/cart/${id}`,
          {
            count: `${numCount}`,
          },
          {
            headers,
          }
        );
        setCartDetails(res);
        return res;
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  }
  async function deleteItem(id) {
    try {
      setLoading(true);
      const res = axiosInstance.delete(`/api/v1/cart/${id}`, {
        headers,
      });
      setCartDetails(res);
      return res;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function checkoutAll(shippingAddress) {
    try {
      console.log(cartDetail);
      setLoading(true);
      const res = await axiosInstance.post(
        `/api/v1/orders/checkout-session/${cartDetail?._id}?url=http://localhost:5173`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      );
      console.log(res.data);
      window.location.href = res.data.session.url;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  async function deleteAll() {
    try {
      setLoading(true);
      const { data } = axiosInstance.delete(`/api/v1/cart`, {
        headers,
      });
      console.log(data);
      setCartDetails(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <CartContext.Provider
      value={{
        getCartItem,
        AddItemCart,
        updateItem,
        deleteItem,
        cartDetail,
        setCartDetails,
        loading,
        setLoading,
        checkoutAll,
        deleteAll,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
