import * as yup from "yup";
export const schemaRegister = yup.object({
  name: yup
    .string()
    .required("Username is Required")
    .min(3, "Username at least 3 Character"),
  email: yup
    .string()
    .email("Enter vaild Email ex:test@test.com")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
  rePassword: yup
    .string()
    .oneOf([yup.ref("password")], "Password and Repassword Must be Match")
    .required("Repassword is Required"),
  phone: yup
    .string()
    .required("Phone is Required")
    .matches(
      /^01[0-2|5]{1}[0-9]{8}$/,
      "Enter Valid Number ex:[01(0,1,2,5)....]"
    ),
});

export const schemaLogin = yup.object({
  email: yup
    .string()
    .email("Enter vaild Email ex:test@test.com")
    .required("Email is Required"),
  password: yup.string().required("Password is Required"),
});

export const shemaChecout = yup.object({
  details: yup.string().required("Details is Required"),
  phone: yup
    .string()
    .required("Phone is Required")
    .matches(
      /^01[0-2|5]{1}[0-9]{8}$/,
      "Enter Valid Number ex:[01(0,1,2,5)....]"
    ),
  city: yup.string().required("City is Required"),
});

export const schemaForget = yup.object({
  email: yup
    .string()
    .email("Enter vaild Email ex:test@test.com")
    .required("Email is Required"),
});
export const schemaRest = yup.object({
  resetCode: yup.string().required("Rest is Required"),
});
export const schemaNewPass = yup.object({
  email: yup
    .string()
    .email("Enter vaild Email ex:test@test.com")
    .required("Email is Required"),
  newPassword: yup.string().required("Password is Required"),
});
