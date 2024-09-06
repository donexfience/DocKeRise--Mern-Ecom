import React, { useEffect } from "react";
import InputWithIcon from "../../components/InputWithIcon";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { updateError } from "../../redux/reducers/user/userSlice";
import LoginBg from "../../assets/LoginBG.jpg";
import Logo from "../../assets/LOGO.png";
import { Form, Formik } from "formik";
import { GoogleLogin } from "@react-oauth/google";
import { AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import PasswordInputWithIcon from "../../components/PasswordInputWithIcon";
import { googleLoginOrSignUp, loginUser } from "../../redux/actions/userActions";
const Login = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email is Not Valid")
      .required("Email is requierd"),
    password: Yup.string().required("password is required"),
  });
  useEffect(() => {
    if (user) {
      if (!user.isEmailVerified) {
        navigate("/otp");
      } else {
        navigate("/");
      }
    }
    return () => {
      dispatch(updateError(""));
    };
  }, [user]);
  const handleLoginSubmit = (value) => {
    console.log("🚀 ~ file: Login.jsx:40 ~ handleLoginSubmit ~ value:", value)
    dispatch(loginUser(value));
  };

  const loginWithGoogle = async (data) => {
    dispatch(googleLoginOrSignUp(data));
  };
  return (
    <div className="py-20 bg-white lg:flex  lg:items-center text-gray-500">
      <div className="lg:w-1/2">
        <img src={LoginBg} alt="LoginBG" />
      </div>
      <div className="lg:w-1/2 p-5 mx-10 lg:mx-20 lg:p-10 ">
        <div className="flex items-center flex-col">
          <img src={Logo} alt="gamersLoot. logo" className="lg:w-1/12 w-1/12" />
          <p className="text-3xl font-bold">GamersLoot</p>
          <div>
            <h1 className="text-2xl mx-3 my-5 font-bold sm: flex items-center justify-center">
              Login with your credentials
            </h1>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLoginSubmit}
          >
            <Form className="w-full">
              <InputWithIcon
                name="email"
                title="Email"
                placeholder="Enter your email"
                icon={<AiOutlineUser />}
              />
              <PasswordInputWithIcon
                name="password"
                title="Password"
                placeholder="Enter your password"
                icon={<AiOutlineLock />}
              />
              {error && <p className="my-2 text-red-400">{error}</p>}
              <button 
                  className="bg-violet-500 text-white py-2 px-4 mt-2 rounded-md hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-400 w-full"
                  disabled={loading} type="submit"
                >
                  {loading ? "Loading" : "Login"}
                </button>
            </Form>
          </Formik>
          <div className="text-center">
          <Link to="/forgot-password">
            <div className="my-5 text-blue-600 font-bold cursor-pointer hover:text-blue-500">
              Forgot Password?
            </div>
          </Link>
          <p className="my-4">OR</p>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                loginWithGoogle(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
          <p className="my-5">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-500"
            >
              Sign Up now
            </Link>
          </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;
