import { handleError } from "./configurations";
import axios from "axios";

export const URL = "http://localhost:9072/api";

const apiInstance = axios.create({ baseURL: URL });
//response initerceptor creating
apiInstance.interceptors.response.use((response) => {
  return response.data;
});
export const commonReduxRequests = async (
  method,
  route,
  body,
  config,
  rejectWithValue
) => {
    let requestConfig={
        method,
        url:route,
        data:body,
        headers:config,
        withCredentials:true
    }
    try{
        console.log("customer request----->>>>.")
        const response=await apiInstance(requestConfig);
        return response;
    }
    catch(error){
        console.log(error);
        //we are passing this error to the handleError functions
        return handleError(error,rejectWithValue)
    }
};
export const commonRequests=async(method,route,body,config,rejectWithValue)=>{
    let requestConfig={
        method,
        url:route,
        data:body,
        headers:config,
        withCredentials:true
    }
    try{
        const response=await apiInstance(requestConfig);
        return response;
    }
    catch(error){
        console.log(error)
        return error
    }
}