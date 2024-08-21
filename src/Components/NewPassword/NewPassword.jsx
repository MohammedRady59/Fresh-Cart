import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstanse";
import { memo, useState } from "react";
import { schemaNewPass } from "../../Validation";
import { useFormik } from "formik";
import InputErrormsg from "../../UI/InputErrormsg";
import { Newpass } from "../../data";
import Button from "../../UI/Button";

function NewPassword() {
  /* State */
  const [loading, setIsLoading] = useState(false);

  /* Hanndle */
  async function handleLogin(values) {
    console.log(values);
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.put(
        "/api/v1/auth/resetPassword",
        values
      );
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
      newPassword: "",
    },
    validationSchema: schemaNewPass,
    onSubmit: handleLogin,
  });
  const renderRest = Newpass.map((el, idx) => (
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
    <>
      <div className="max-w-4xl mx-auto py-2">
        <div>
          <h1 className="text-3xl font-semibold "> New Password For Email</h1>
        </div>
        <form className="py-6" onSubmit={formik.handleSubmit}>
          {renderRest}
          <Button type="submit" isloading={loading}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}

export default memo(NewPassword);
