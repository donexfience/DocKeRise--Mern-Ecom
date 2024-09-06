import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPassedDateOnwardDateForInput } from "../../../Common/Functions";
import { URL, commonRequests } from "../../../Common/api";
import { appJson, config } from "../../../Common/configurations";
import toast from "react-hot-toast";
import { editUserProfile } from "../../../redux/actions/userActions";
import * as Yup from "yup";
import {
  AiOutlineClose,
  AiOutlineLock,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import { Formik, Form, ErrorMessage } from "formik";
import CustomSingleFileInput from "../../../components/CustomSingleFileInput";
import InputWithIcon from "../../../components/InputWithIcon";
import { RiCalendarEventFill } from "react-icons/ri";
import EditProfileOTP from "./components/EditProfileOTP";

const EditProfiile = ({ closeToggle }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.user);
  const [emailChanged, setEmailChanged] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [otp, setOTP] = useState("");

  const initialValues = {
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    phoneNumber: user.phoneNumber || "",
    profileImgURL: user.profileImgURL || user.profileImageURL || "",
    dateOfBirth: getPassedDateOnwardDateForInput(user.dateOfBirth) || "",
    password: "",
    newPassword: "",
    newPasswordAgain: "",
  };
  console.log(initialValues, "================");
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().email().required("Email is required"),
    phoneNumber: Yup.number()
      .typeError("Phone number should be digits")
      .moreThan(999999999, "Not valid phone number"),
    dateOfBirth: Yup.date(),
    password: Yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain 8 Characters, One UpperCase, One Number and One Special Case Character"
    ),
    newPassword: Yup.string().matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must contain 8 Characters, One UpperCase, One Number and One Special Case Character"
    ),
    newPasswordAgain: Yup.string().oneOf(
      [Yup.ref("newPassword"), null],
      "Password doesn't match with original"
    ),
  });

  const handleSubmit = async (values) => {
    if (user.email !== values.email) {
      if (!isOTPVerified) {
        setEmailChanged(true);
        setNewEmail(values.email);

        // Send OTP if email is changed
        const data = await commonRequests(
          "post",
          "/auth/send-otp",
          { email: values.email }, // Use values.email directly here
          appJson
        );

        if (data.success) {
          toast.success("OTP sent successfully");
        } else {
          toast.error(data.response.data.error);
        }
      } else {
        // If OTP is verified, proceed with editing user profile
        let userData = {
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          dateOfBirth: values.dateOfBirth,
          email: values.email,
          profileImgURL: values.profileImgURL || "",
          newPassword: "",
          password: "",
          passwordAgain: "",
        };

        dispatch(editUserProfile(userData));
        closeToggle();
      }
    } else {
      // If email is not changed, directly proceed with editing user profile
      let userData = {
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        dateOfBirth: values.dateOfBirth,
        email: values.email,
        profileImgURL: values.profileImgURL || "",
        password: values.password || "",
        newPassword: values.newPassword || "",
        confirmPassword: values.newPasswordAgain || "",
      };
      // // console.log(
      // // "🚀 ~ file: EditProfiile.jsx:93 ~ handleSubmitdasdsadsa ~ userData:",
      // // userData
      // // );

      dispatch(editUserProfile(userData));
      closeToggle();
    }
  };

  const verifyOTP = async () => {

    console.log("calling",newEmail,otp);
    const data = await commonRequests("post", "/auth/validate-otp", {
      email: newEmail,
      otp: parseInt(otp),
      appJson,
    });
    if (data) {
      if (data.success) {
        setIsOTPVerified(true);
        toast.success("OTP Verified");
        return;
      }
    } else {
      toast.error(data.error);
    }
  };

  return (
    <div className="bg-white w-full shadow-xl h-screen lg:h-auto rounded-lg">
      <div className="bg-white p-4 pt-4 pb-4 px-5 w-full flex items-center justify-between">
        <h1 className="font-bold text-md">Edit your Details</h1>
        <AiOutlineClose
          onClick={closeToggle}
          className="text-lg cursor-pointer"
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (value) => {
          handleSubmit(value);
        }}
        enableReinitialize
      >
        {({ values, setFieldValue }) => (
          <Form className="lg:flex lg:flex-row lg:gap-5 p-5 w-full">
            <div className="w-1/2  mb-5 lg:mb-0">
              {values.profileImgURL &&
              typeof values.profileImgURL === "string" ? (
                <div className="bg-white py-6 rounded-md text-center">
                  {console.log("hello")}
                  <div className="mx-auto w-36 h-36">
                    {" "}
                    {/* Center the image and restrict its width */}
                    <img
                      src={
                        values.profileImgURL.startsWith("https")
                          ? values.profileImgURL
                          : `${URL}/img/${values.profileImgURL}`
                      }
                      alt="Profile"
                      className="h-full w-full object-contian rounded-md"
                    />
                  </div>
                  <button className="text-white bg-red-500 mt-4 font-bold py-2 px-4 rounded">
                    Delete
                  </button>
                </div>
              ) : (
                <CustomSingleFileInput
                  onChange={(file) => {
                    setFieldValue("profileImgURL", file);
                  }}
                />
              )}
              <ErrorMessage
                className="text-red-500 text-sm"
                component="span"
                name="profileImgURL"
              />
            </div>
            <div className="w-full lg:w-3/4">
              {/* User details section */}
              <InputWithIcon
                icon={<AiOutlineUser />}
                name="firstName"
                placeholder="Enter your Number"
              />
              <InputWithIcon
                icon={<AiOutlineUser />}
                name="lastName"
                placeholder="Enter your Number"
              />
              <InputWithIcon
                icon={<AiOutlinePhone />}
                name="phoneNumber"
                placeholder="Enter your Number"
              />
              <InputWithIcon
                icon={<AiOutlineMail />}
                name="email"
                placeholder="Enter your Number"
              />
              <InputWithIcon
                types={"date"}
                icon={<RiCalendarEventFill />}
                name="dateOfBirth"
                placeholder="Enter your Number"
              />
              <InputWithIcon
                icon={<AiOutlineLock />}
                name="password"
                placeholder="enter your old password"
              />
              <InputWithIcon
                icon={<AiOutlineLock />}
                name="newPassword"
                placeholder="enter your new password "
              />
              <InputWithIcon
                icon={<AiOutlineLock />}
                name="newPasswordAgain"
                placeholder="enter new password Again "
              />
              {emailChanged && (
                <EditProfileOTP
                  isOTPVerified={isOTPVerified}
                  otp={otp}
                  setOTP={setOTP}
                  verifyOTP={verifyOTP}
                  
                />
              )}
              <button
                className="border-2 font-bold border-violet-500 text-black py-2 px-5 rounded-md
              "
                type="submit"
              >
                {loading ? "Loading" : "Edit"}
              </button>
              {error && <p className="my-2 text-red-500">{error}</p>}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditProfiile;
