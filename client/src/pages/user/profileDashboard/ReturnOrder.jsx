import { ErrorMessage, Field, Formik } from 'formik';
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai';
import { ImOpt } from 'react-icons/im';
import { useDispatch } from 'react-redux'
import {  } from 'react-router-dom';
import * as Yup from 'yup'
import {Form} from 'formik'
import { returnOrder } from '../../../redux/actions/user/orderAction';

const ReturnOrder = ({ id, closeToggle, loadData }) => {
    const dispatch = useDispatch();
    const initialValues = {
      reason: "",
    };
    const validationSchema = Yup.object().shape({
      reason: Yup.string().required("Return reason is required"),
    });
  
    const handleSubmit = (value) => {
      console.log("calling submit")
      dispatch(returnOrder({ formData: value, id: id }))
        .then(() => {
          loadData();
          closeToggle();
        })
        .catch((error) => {
          console.log(error, "error of canceling order");
        });
    };
  
    return (
      <div className="bg-gray-100 w-full lg:w-full shadow-2xl overflow-y-auto rounded-lg">
        <div className="bg-white pt-5 pb-3 px-5 flex items-center justify-between">
          <h1 className="font-bold text-lg">Confirm Return</h1>
          <AiOutlineClose
            className="text-xl cutsor-pointer"
            onClick={closeToggle}
          />
        </div>
        <div className="p-3">
          <h1 className="">Enter reasoan for Return</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Field
                name="reason"
                as="textarea"
                className="h-36 lg:h-64 w-full p-5 rounded mt-2"
                placeholder="Type the reason here"
              />
              <ErrorMessage
                className="text-sm text-red-500"
                name="reason"
                component="span"
              />
  
              <button
                className="bg-violet-500 p-2 rounded-md text-white w-full mt-3"
                type="submit"
              >
                Return Order
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    );

}

export default ReturnOrder