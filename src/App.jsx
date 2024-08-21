import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home.jsx";
import Proudcts from "./Components/Products/Proudcts";
import Categore from "./Components/Categore/Categore";
import Brand from "./Components/Brand/Brand";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register";
import Carts from "./Components/Carts/Carts.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DetailProu from "./Components/ProudctDetails/DetailProu.jsx";
import ProtectRouter from "./Auth/ProtectRouter.jsx";
import CartContectProvider from "./Context/CartContext.jsx";
import Checkout from "./Components/Checkout/Checkout.jsx";
import Allorders from "./Components/Allorders/Allorders.jsx";
import WishlistContextProvider from "./Context/WishlistContext.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import ForgetPasss from "./Components/ForgetPassword/ForgetPasss.jsx";
import RestPass from "./Components/Restpass/RestPass.jsx";
import NewPassword from "./Components/NewPassword/NewPassword.jsx";
import "aos/dist/aos.css";
import { useEffect } from "react";
import Aos from "aos";
const queryClient = new QueryClient();

const localData = localStorage.getItem("userToken");
const userData = localData ? localData : null;
const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      {
        path: "home",
        element: (
          <ProtectRouter notAllow={userData} path={"login"}>
            <Home />
          </ProtectRouter>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectRouter notAllow={userData} path={"login"}>
            <Checkout />
          </ProtectRouter>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectRouter notAllow={userData} path={"login"}>
            <Allorders />
          </ProtectRouter>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectRouter notAllow={userData} path={"login"}>
            <Carts />
          </ProtectRouter>
        ),
      },
      {
        path: "prodcts",
        element: (
          <ProtectRouter notAllow={userData} path={"login"}>
            <Proudcts />
          </ProtectRouter>
        ),
      },
      {
        path: "categore",
        element: (
          <ProtectRouter notAllow={userData} path={"login"}>
            <Categore />
          </ProtectRouter>
        ),
      },
      {
        path: "prodctdetail/:id",
        element: (
          <ProtectRouter notAllow={userData} path={"login"}>
            <DetailProu />
          </ProtectRouter>
        ),
      },
      {
        path: "brand",
        element: (
          <ProtectRouter notAllow={userData} path={"login"}>
            <Brand />
          </ProtectRouter>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectRouter notAllow={userData} path={"login"}>
            <Wishlist />
          </ProtectRouter>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectRouter notAllow={!userData} path={"home"}>
            <Login />
          </ProtectRouter>
        ),
      },
      {
        path: "forgetPassword",
        element: (
          <ProtectRouter notAllow={!userData} path={"home"}>
            <ForgetPasss />
          </ProtectRouter>
        ),
      },
      {
        path: "resetCode",
        element: (
          <ProtectRouter notAllow={!userData} path={"home"}>
            <RestPass />
          </ProtectRouter>
        ),
      },
      {
        path: "newPassword",
        element: (
          <ProtectRouter notAllow={!userData} path={"home"}>
            <NewPassword />
          </ProtectRouter>
        ),
      },
      {
        path: "register",
        element: (
          <ProtectRouter notAllow={!userData} path={"home"}>
            <Register />
          </ProtectRouter>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  useEffect(() => {
    Aos.init({
      duration: 1000, // مدة التأثيرات بالميلي ثانية
      easing: "ease-in-out", // نوع التحريك
    });
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CartContectProvider>
          <WishlistContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster />
          </WishlistContextProvider>
        </CartContectProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
