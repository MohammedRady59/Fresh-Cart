import amazon from "../../assets/images/amazon pay.webp";
import american from "../../assets/images/american express.webp";
import paypal from "../../assets/images/paypal.webp";
import apple from "../../assets/images/apple store.svg";
import google from "../../assets/images/google-play-badge-logo.svg";
import mastercard from "../../assets/images/mastercard.png";
import { memo } from "react";
function Footer() {
  return (
    <div className="bg-gray-200 w-full text-black py-5 mt-5">
      <div className="container">
        <h2 className="text-3xl mb-3 mx-3">Get the FreshCart App</h2>
        <p className="text-lg mx-3">
          We will send you a link, open it on your phone to download the app.
        </p>
        <form className=" flex flex-col md:flex-row mx-3 gap-5 my-9">
          <input
            type="email"
            id="mail"
            className="bg-gray-50 focus:outline-none text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:focus:ring-green-500"
            placeholder="example@gmail.com"
          />
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 md:w-[200px] text-base"
          >
            Share App Link
          </button>
        </form>
        <hr />
        <div className="my-2 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row gap-3 items-center mb-7 md:mb-0">
            <span className="text-xl">Payment Partners</span>
            <div className="flex justify-center items-center gap-3">
              <img
                loading="lazy"
                src={amazon}
                className="w-[65px] h-[50px]"
                alt="imagePhoto"
              />
              <img
                loading="lazy"
                src={american}
                className="w-[60px]"
                alt="imagePhoto"
              />
              <img
                loading="lazy"
                src={mastercard}
                className="w-[60px]"
                alt="imagePhoto"
              />
              <img
                loading="lazy"
                src={paypal}
                className="w-[60px]"
                alt="imagePhoto"
              />
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-0 lg:gap-3 items-center">
            <span className="text-xl">Get deliveries with FreshCart</span>
            <div className="flex gap-3">
              <img
                loading="lazy"
                src={apple}
                className="w-[150px]"
                alt="imagePhoto"
              />
              <img
                loading="lazy"
                src={google}
                className="w-[150px]"
                alt="imagePhoto"
              />
            </div>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default memo(Footer);
