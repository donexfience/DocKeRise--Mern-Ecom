import date from "date-and-time";
import { TiTick } from "react-icons/ti";
import { FaTimesCircle } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
export const getPassedDateOnwardDateForInput = (inputDateString) => {
  const inputDate = new Date(inputDateString);
  const formattedDate = date.format(inputDate, "YYYY-MM-DD");
  return formattedDate;
};

export const getStatusDates = (status, statusHistory) => {
  const filterResultStatus = statusHistory.find(
    (item) => item.status === status
  );

  const filterdStatus = new Date(filterResultStatus.date);
  const formattedDate = date.format(filterdStatus, "DD, MM,YYYY");
  return formattedDate ? formattedDate : "NA";
};

//payment modifiler just changing text to correct format

export const modifyPaymentText = (mode) => {
  if (mode === "cashOnDelivery") {
    return "Cash on Delivery";
  }
};
export const getTodayOnwardDateForInput = () => {
  const today = new Date();
  today.setDate(today.getDate());
  const formattedMinDate = date.format(today, "YYYY-MM-DD");
  return formattedMinDate;
};

export const renderIcon = (user) => {
  console.log(user.isEmailVerified);
  if (user?.isEmailVerified) {
    return <TiTick className="text-green-500 text-lg" />;
  } else {
    return <FaTimesCircle />;
  }
};
export const timeAgo = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const getTomorrowOnwardsDateForInput = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const formattedMinDate = date.format(today, "YYYY-MM-DD");
  return formattedMinDate;
};

export const renderStars = (rating) => {
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const stars = [];

  for (let i = 1; i <= filledStars; i++) {
    stars.push(<AiFillStar key={i} className="text-yellow-400" />);
  }

  if (hasHalfStar) {
    stars.push(<AiOutlineStar key="half" className="text-yellow-400" />);
  }

  const remainingStars = 5 - filledStars - (hasHalfStar ? 1 : 0);
  for (let i = 1; i <= remainingStars; i++) {
    stars.push(
      <AiOutlineStar key={`empty-${i}`} className="text-yellow-400" />
    );
  }

  return stars;
};


export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};


