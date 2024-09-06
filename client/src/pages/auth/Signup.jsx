import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage, Field } from "formik";
import Logo from "../../assets/LOGO.png";
import { GoogleLogin } from "@react-oauth/google";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import CustomSingleFileInput from "../../components/CustomSingleFileInput";
import SignupBg from "../../assets/SignupBg.jpg";
import toast from "react-hot-toast";
import InputWithIcon from "../../components/InputWithIcon";
import { css } from "@emotion/react";
import { ClipLoader } from "react-spinners";

import {
  AiOutlineLock,
  AiOutlineUser,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineCode,
} from "react-icons/ai";
import { commonRequests } from "../../Common/api";
import {
  googleLoginOrSignUp,
  signUpUser,
} from "../../redux/actions/userActions";
import PasswordInputWithIcon from "../../components/PasswordInputWithIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { updateError } from "../../redux/reducers/user/userSlice";
import { appJson, config, configMultiPart } from "../../Common/configurations";
import OTPEnterSection from "./register/OTPEnterSection";
import OTPExpired from "./components/OTPExpired";

const Signup = () => {
  const override = css`
    display: block;
    margin: 0 auto;
  `;

  const { user, loading, error } = useSelector((state) => state.user);
  const [emailSec, setEmailSec] = useState(true);
  const [otpLoading, setOTPLoading] = useState(false);
  const [otpSec, setOTPSec] = useState(false);
  const [otpExpired, setOTPExpired] = useState(false);
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordAgain: "",
    phoneNumber: "",
    profileImgURL: null,
    referralCode: "",
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
    return () => {
      dispatch(updateError(""));
    };
  }, [user]);

  //referal code fetching while the page loads

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const referralCode = params.get("referralCode");
    if (referralCode) {
      // Update the referralCode field in initialValues
      initialValues.referralCode = referralCode;
    }
  }, [location.search]);

  console.log(initialValues.referralCode);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .trim()
      .required("First name is required")
      .max(22, "First name can't be greater than 22 letters"),

    lastName: Yup.string()
      .trim()
      .required("Last name is required")
      .max(22, "Last name can't be greater than 22 letters"),

    email: Yup.string()
      .email("Invalid email format")
      .trim()
      .required("Email is required")
      .max(50, "Email can't be greater than 50 characters"),

    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must contain 8 characters, one uppercase, one number, and one special character"
      ),

    passwordAgain: Yup.string()
      .required("Password confirmation is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),

    phoneNumber: Yup.string()
      .required("Phone number is required")
      .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  });

  const [data, setData] = useState({});
  const dispatch = useDispatch();

  const dispatchSignup = () => {
    console.log(data, "........");
    let formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("passwordAgain", data.passwordAgain);
    formData.append("phoneNumber", data.phoneNumber);
    if (data.profileImgURL) {
      formData.append("profileImgURL", data.profileImgURL);
    }
    formData.append("referralCode", data.referralCode);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    dispatch(signUpUser(formData));
  };
  // Google Login
  const loginWithGoogle = async (data) => {
    dispatch(googleLoginOrSignUp(data));
  };

  const handleRegister = async (value) => {
    //displaying the loading
    setOTPLoading(true);
    setData(value);
    if (value.email.trim() === "") {
      toast.error("Enter the email");
      return;
    }
    const res = await commonRequests(
      "POST",
      "/auth/send-otp",
      { email: value.email },
      configMultiPart
    );
    //if we get the otp from backend we updating states opening modals
    if (res.success) {
      console.log(res, "signup");
      setEmailSec(false);
      setOTPSec(true);
      setOTPLoading(false);
      toast.success("OTP SENT SUCCESSFULLY");
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      toast.error(res.response.data.error);
      setOTPLoading(false);
    }
  };

  return (
    <div className="py-20 bg-white lg:flex  lg:items-center text-gray-500">
      <div className="lg:w-1/2">
        <img src={SignupBg} alt="ForgotBG" />
      </div>
      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 ">
        <div className="flex items-center flex-col">
          <img src={Logo} alt="gamersLoot. logo" className="lg:w-1/12 w-1/12" />
          <p className="text-3xl font-bold">GamersLoot</p>
          <div>
            <h1 className="text-2xl my-5 font-bold">Create an account</h1>
          </div>
        </div>
        {emailSec && (
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ values, setFieldValue }) => (
              <Form className="w-full mb-4">
                <div className="flex justify-center mb-4">
                  <CustomSingleFileInput
                    onChange={(file) => {
                      setFieldValue("profileImgURL", file);
                      console.log(
                        file,
                        "1111111111111111111111111111111111111"
                      );
                    }}
                  />
                  <ErrorMessage
                    className="text-sm text-red-500"
                    name="profileImgURL"
                    component="span"
                  />
                </div>
                <InputWithIcon
                  name="firstName"
                  placeholder="Enter your First Name"
                  icon={<AiOutlineUser />}
                />
                <InputWithIcon
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  icon={<AiOutlineUser />}
                />
                <InputWithIcon
                  name="email"
                  placeholder="Enter Your email"
                  icon={<AiOutlineMail />}
                />
                <PasswordInputWithIcon
                  icon={<AiOutlineLock />}
                  title="Password"
                  name="password"
                  placeholder="Enter your password"
                />
                <PasswordInputWithIcon
                  icon={<AiOutlineLock />}
                  title="passwordAgain"
                  name="passwordAgain"
                  placeholder="Confirm your password"
                />
                <InputWithIcon
                  name="phoneNumber"
                  placeholder="Enter Your Phone Number"
                  icon={<AiOutlinePhone />}
                />
                <div className="mb-4 mt-5 hidden">
                  <div className="mt-3 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {<AiOutlineCode />}
                    </div>
                    <Field
                      className="appearance-none block w-full  bg-white text-gray-700 border-b border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
                      name="referralCode"
                      type="text"
                      placeholder="Enter your referral Code"
                      autoComplete="username"
                      readOnly
                    />
                  </div>
                </div>

                <button
                  className="bg-violet-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-400 w-full"
                  disabled={otpLoading}
                  type="submit"
                >
                  {otpLoading ? (
                    <ClipLoader
                      css={override}
                      size={20}
                      color={"#ffffff"}
                      loading={true}
                    />
                  ) : (
                    "Sign Up"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        )}
        {otpSec && (
          <OTPEnterSection
            email={data.email}
            setOTPExpired={setOTPExpired}
            setOTPSec={setOTPSec}
            dispatchSignup={dispatchSignup}
          />
        )}
        {otpExpired && <OTPExpired />}
        <div className="text-center">
          <p className="my-4">OR</p>
          {/* google authentication */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
                loginWithGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
                toast.error("Something is wrong! Please try later");
              }}
            />
          </div>
          <p className="my-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-500 font-semibold cursor-pointer hover:text-black"
            >
              Login Now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
