import { useFormik } from "formik";
import Button from "../../UI/Button";
import { memo, useState } from "react";
import { LoginForm } from "../../data";
import { schemaLogin } from "../../Validation";
import InputErrormsg from "../../UI/InputErrormsg";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstanse";
import { Link } from "react-router-dom";

function Login() {
  /* State */
  const [loading, setIsLoading] = useState(false);

  /* Hanndle */
  async function handleLogin(values) {
    console.log(values);
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post("/api/v1/auth/signin", values);
      console.log(data);
      localStorage.setItem("userToken", data.token);
      location.replace("/home");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      toast.error(`${error.response.data.message}`, {
        position: "bottom-center",
        duration: 1500,
      });
    } finally {
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schemaLogin,
    onSubmit: handleLogin,
  });
  /* Render */
  const renderLogin = LoginForm.map((el, idx) => (
    <div key={idx}>
      <div className="relative z-0 w-full mb-5 group">
        <input
          type={el.type}
          name={el.name}
          id={el.id}
          value={formik.values[el.name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none  focus:border-blue-600 peer"
          placeholder=" "
        />
        <label
          htmlFor={el.id}
          className="peer-focus:font-medium absolute text-sm text-black-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {el.lable}
        </label>
      </div>
      {formik.errors[el.name] && formik.touched[el.name] && (
        <InputErrormsg msg={formik.errors[el.name]} />
      )}
    </div>
  ));
  return (
    <div className="max-w-4xl mx-auto py-2" data-aos="fade-left">
      <div>
        <h1 className="text-3xl font-semibold ">Login Now</h1>
      </div>
      <form className="py-6" onSubmit={formik.handleSubmit}>
        {renderLogin}
        <Button type="submit" isloading={loading}>
          Submit
        </Button>
      </form>
      <div className="text-end my-2">
        <Link
          to="/forgetPassword"
          className="text-end  text-red-500 text-xl font-semibold"
        >
          Forget your Password ?
        </Link>
      </div>
      <div>
        <h2 className="text-center text-xl my-2 font-semibold">
          Don&#39;t have an account?{" "}
          <Link to="/register" className="text-green-400">
            Register Now
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default memo(Login);
