import toast from "react-hot-toast";

export const GOOGLE_ID =
  "1057012590274-nm713e8s53gj0s7h44f7lolrn06ua8cd.apps.googleusercontent.com";
export const config = {
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
};
export const appJson = {
  "Content-Type": "application/json",
};

export const multiForm = {
  "Content-Type": "multipart/form-data",
};
export const configMultiPart = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
};
//error handling logic for async action creators
export const handleError = (error, rejectedWithValue) => {
  if (error.response && error.response.data.error) {
    return rejectedWithValue(error.response.data.error);
  } else {
    return rejectedWithValue(error.message);
  }
};
