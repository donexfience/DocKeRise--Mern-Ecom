import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddresses,
  deleteAddress,
} from "../../../../redux/actions/user/addressAction";
import { FaLeaf } from "react-icons/fa";
import Modal from "../../../../components/Modal";
import AddressEdit from "../../checkout/pages/AddressEdit";
import Addaddress from "../../checkout/pages/Addaddress";
import ConfirmModal from "../../../../components/ConfirmModal";
import Checkoutradio from "../../checkout/components/Checkoutradio";
import AddressProfile from "./AddressProfile";

const Address = () => {
  const dispatch = useDispatch();
  //fetching data at initial loading
  useEffect(() => {
    dispatch(getAddresses());
  }, []);
  const { addresses, loading, error } = useSelector((state) => state.address);

  const [createAddress, setCreateAddress] = useState(false);
  const toggleAddAddress = () => {
    setCreateAddress(!createAddress);
  };

  //deleteAddress

  const [deleteId, setDeleteId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const toggleDelete = (deleteId) => {
    setDeleteModal(!deleteModal);
    setDeleteId(deleteId);
  };
  const dispatchDelte = () => {
    dispatch(deleteAddress(deleteId));
    toggleDelete("")
  };
  //edit address
  const [editAddress, setEditAddress] = useState({});
  const [editModal, setEditModal] = useState(false);
  const toggleEdit = () => {
    setEditModal(!editModal);
  };

  //selecting first addresss as a default

  return (
    <>
      {editModal && (
        <Modal
          content={
            <AddressEdit address={editAddress} closeToggle={toggleEdit} />
          }
        />
      )}
      {createAddress && (
        <Modal content={<Addaddress closeToggle={toggleAddAddress} />} />
      )}
      {deleteModal && (
        <ConfirmModal
          title="confirm Delete"
          negativeAction={toggleDelete}
          positiveAction={dispatchDelte}
        />
      )}
      <div className="bg-white">
        {addresses.length > 0 ? (
          addresses.map((item, index) => (
            <AddressProfile
              item={item}
              key={index}
              setEditAddress={setEditAddress}
              toggleDelete={toggleDelete}
              setDeleteId={setDeleteId}
              toggleEdit={toggleEdit}
            />
          ))
        ) : (
          <h1>No saved address found</h1>
        )}
        <div className="my-5">
          <button
            className="bg-violet-500 p-3 rounded-md text-white"
            onClick={toggleAddAddress}
          >
            Add a new Address
          </button>
        </div>
      </div>
    </>
  );
};

export default Address;
