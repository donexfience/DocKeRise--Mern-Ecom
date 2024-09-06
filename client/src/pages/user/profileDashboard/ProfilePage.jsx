import React, { useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import ProfileImage from "../../../components/ProfileImage";
import InputWithIcon from "../../../components/InputWithIcon";
import date from "date-and-time";
import {
  AiOutlineClose,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineUser,
} from "react-icons/ai";
import { RiCalendarEventFill } from "react-icons/ri";
import {
  getPassedDateOnwardDateForInput,
  renderIcon,
} from "../../../Common/Functions";
import { TiTick } from "react-icons/ti";
import EditProfiile from "./EditProfiile";
import { ErrorMessage, Field } from "formik";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  const toggleEditProfile = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };

  return (
    <>
      {showEditProfileModal && (
        <Modal content={<EditProfiile closeToggle={toggleEditProfile} />} />
      )}
      <div className="bg-white p-20 w-full lg:flex  ">
        <h1 className="p-5 font-bold text-md text-violet-500">
          Profile Details
        </h1>
        {!showEditProfileModal && (
          <div className="w-full">
            <div className="lg:flex gap-12">
              <div className="w-56 h-56 object-cover rounded-full">
                <ProfileImage user={user} radius="full" />
              </div>
              <div className="w-3/4">
                <div className="lg:grid grid-cols-2 gap-5 ">
                  <div className="mb-4 mt-5">
                    <p>
                      <label
                        htmlFor="username"
                        className="text-violet-500 pt-4 font-bold"
                      >
                        First Name
                      </label>
                    </p>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {<AiOutlineUser />}
                      </div>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border-b border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
                        name="firstName"
                        placeholder="Enter your First Name"
                        autoComplete="given-name"
                        value={user?.firstName}
                        readOnly
                      />
                    </div>
                    <p>
                      <label
                        htmlFor="username"
                        className="text-violet-500 pt-4 font-bold"
                      >
                        Last Name
                      </label>
                    </p>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {<AiOutlineUser />}
                      </div>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border-b border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
                        name="firstName"
                        placeholder="Enter your First Name"
                        autoComplete="given-name"
                        value={user?.lastName}
                        readOnly
                      />
                    </div>
                    <p>
                      <label
                        htmlFor="username"
                        className="text-violet-500 pt-4 font-bold"
                      >
                        Email
                      </label>
                    </p>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {<AiOutlineMail />}
                      </div>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border-b border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
                        name="firstName"
                        placeholder="Enter your First Name"
                        autoComplete="given-name"
                        value={user?.email}
                        readOnly
                      />
                    </div>
                    <p>
                      <label
                        htmlFor="username"
                        className="text-violet-500 pt-4 font-bold"
                      >
                        Phone Number
                      </label>
                    </p>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {<AiOutlinePhone />}
                      </div>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border-b border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
                        name="firstName"
                        placeholder="Enter your First Name"
                        autoComplete="given-name"
                        value={user?.phoneNumber}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="mt-4 pl-2">
                    <p>
                      <label
                        htmlFor="username"
                        className="text-violet-500 pt-4 font-bold"
                      >
                        Date of Birth
                      </label>
                    </p>
                    <div className="relative">
                      <p></p>
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {<AiOutlineUser />}
                      </div>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border-b border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
                        name="firstName"
                        placeholder="Enter your First Name"
                        autoComplete="given-name"
                        value={date.format(
                          new Date(user?.dateOfBirth),
                          "DD-MM-YYYY"
                        )}
                        readOnly
                      />
                    </div>
                    <p>
                      <label
                        htmlFor="username"
                        className="text-violet-500 pt-4 font-bold"
                      >
                        email verifed ?
                      </label>
                    </p>
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        {<AiOutlineUser />}
                      </div>
                      <input
                        className="appearance-none block w-full bg-white text-gray-700 border-b border-gray-300 py-2 pl-10 pr-3 focus:outline-none focus:bg-white focus:border-indigo-500"
                        name="firstName"
                        placeholder="Enter your First Name"
                        autoComplete="given-name"
                        value={
                          user?.isEmailVerified
                            ? "Email Verified"
                            : "Email Not Verified"
                        }
                        readOnly
                      />
                      {renderIcon(user)}
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-1/4">
                <button
                  className="bg-violet-500 p-2 mt-7 text-white rounded-md "
                  onClick={toggleEditProfile}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePage;
