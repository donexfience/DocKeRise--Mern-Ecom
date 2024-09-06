import React from "react";
import { URL } from "../Common/api";

const ProfileImage = ({ user, radius }) => {
  if (user.profileImgURL) {
    return (
      <div className="h-full w-full rounded-full overflow-hidden">
        <img
          src={`${URL}/img/${user.profileImgURL}`}
          alt="user-profile"
          className="object-cover w-55 h-full"
        />
      </div>
    );
  }
  return <div className="w-full h-full bg-gray-100 rounded-full"></div>;
};

export default ProfileImage;
