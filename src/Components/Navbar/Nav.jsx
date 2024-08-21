import { Link } from "react-router-dom";
import { memo, useContext, useState } from "react";

import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Menu,
  Heart,
} from "lucide-react";

import logo from "../../assets/images/freshcart-logo.svg";
import { WishlistContext } from "../../Context/WishlistContext";
const localUser = localStorage.getItem("userToken");
const userData = localUser ? localUser : null;
function Nav() {
  const { wishlistCount } = useContext(WishlistContext);

  const [open, setopen] = useState(false);
  function handleopen() {
    setopen(!open);
  }
  function HandleLogout() {
    localStorage.removeItem("userToken");
    location.replace("/login");
  }

  return (
    <>
      <nav className=" py-2 px-4 md:px-0  bg-gray-200 text-[17px] md:fixed z-30 inset-x-0 top-0 transition-all duration-500 ease-in relative">
        <div className="flex container  md:justify-between  flex-col md:flex-row ">
          <div className="flex gap-2 md:items-center flex-col md:flex-row ">
            <img src={logo} className="w-[120px]" alt="Logo" loading="lazy" />
            <div>
              <div
                className="md:hidden absolute right-0 px-4 md:px-0 top-[9px]"
                onClick={handleopen}
              >
                <Menu />
              </div>
              {userData ? (
                <ul
                  className={`md:flex gap-2 items-center flex-col md:flex-row  ${
                    open ? "flex" : "hidden"
                  }`}
                >
                  <li className=" text-gray-400">
                    <Link to="home">Home</Link>
                  </li>
                  <li className=" text-gray-400">
                    <Link to="cart">Cart</Link>
                  </li>

                  <li className=" text-gray-400">
                    <Link to="prodcts">Proudcts</Link>
                  </li>
                  <li className=" text-gray-400">
                    <Link to="categore">Categories</Link>
                  </li>
                  <li className=" text-gray-400">
                    <Link to="brand">Brands</Link>
                  </li>
                </ul>
              ) : null}
            </div>
          </div>

          <div
            className={` md:flex gap-2 flex-col md:flex-row ${
              open ? "flex" : "hidden"
            }`}
          >
            <div className="flex gap-2  justify-center items-center flex-row">
              {userData ? (
                <span>
                  <Link to="wishlist" className="relative">
                    <Heart className="text-red-600 " fill="red" />
                    <span className="absolute top-0 left-2 text-sm text-white  ">
                      {wishlistCount}
                    </span>
                  </Link>
                </span>
              ) : null}
              <span className="">
                <Facebook />
              </span>
              <span className="">
                <Twitter />
              </span>
              <span className="">
                <Linkedin />
              </span>
              <span className="">
                <Instagram />
              </span>
              <span className="">
                <Youtube />
              </span>
            </div>
            <div>
              <ul className="flex gap-2 items-center flex-col md:flex-row">
                {!userData ? (
                  <>
                    <li>
                      <Link to="login" className=" text-gray-400">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="register" className=" text-gray-400">
                        Register
                      </Link>
                    </li>
                  </>
                ) : (
                  <span
                    className=" cursor-pointer text-gray-400"
                    onClick={HandleLogout}
                  >
                    Logout
                  </span>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default memo(Nav);
