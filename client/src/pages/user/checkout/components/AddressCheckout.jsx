import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../../components/Modal";
import Addaddress from "../pages/Addaddress";
import AddressEdit from "../pages/AddressEdit";
import ConfirmModal from "../../../../components/ConfirmModal";
import Checkoutradio from "./Checkoutradio";
import {
  deleteAddress,
  getAddresses,
} from "../../../../redux/actions/user/addressAction";

const AddressCheckout = ({ selectedAddress, setSelectedAddress }) => {
  const dispatch = useDispatch();

  const { addresses, loading, error } = useSelector((state) => state.address);

  // Fetching address when the page is loading
  useEffect(() => {
    dispatch(getAddresses());
  }, []);

  // Selecting the first address as default when the address are loaded
  useEffect(() => {
    if (addresses.length > 0) {
      setSelectedAddress(addresses[0]._id);
    }
    setCreateAddressModal(false);
    setDeleteAddressModal(false);
    setEditAddressModal(false);
  }, [addresses]);

  //state for displaying createAddressModal
  const [createAddressModal, setCreateAddressModal] = useState(false);

  const toggleCreateAddress = () => {
    setCreateAddressModal(!createAddressModal);
  };

  //deleting modal toggle

  const [deleteAddressModal, setDeleteAddressModal] = useState(false);
  const toggleDeleteAdressModal = (deleteAddressId) => {
    setDeleteAddressModal(!deleteAddressModal);
    setDeletedId(deleteAddressId);
  };

  // backend calling delete address

  const [deletedId, setDeletedId] = useState("");
  const dispatchDeleteAddress = () => {
    dispatch(deleteAddress(deletedId));
  };

  //edit address call

  const [editId, setEditId] = useState("");
  const dispatchEditAddress = () => {
    dispatch(deleteAddress(editId));
  };

  const [editAddress, setEditAddress] = useState({});
  const [editAddressModal, setEditAddressModal] = useState(false);
  const toggleEditAddress = () => {
    setEditAddressModal(!editAddressModal);
  };

  return (
    <div className="w-full">
      {createAddressModal && (
        <Modal content={<Addaddress closeToggle={toggleCreateAddress} />} />
      )}
      {editAddressModal && (
        <Modal
          content={
            <AddressEdit
              closeToggle={toggleEditAddress}
              address={editAddress}
            />
          }
        />
      )}
      {deleteAddressModal && (
        <ConfirmModal
          positiveAction={dispatchDeleteAddress}
          negativeAction={toggleDeleteAdressModal}
        />
      )}

      <div className="font-bold text-md pt-4 px-5 shadow-md text-black bg-white">
        Choose one Address from below
        <div className="border border-violet-500 px-5 mt-2"></div>
      </div>

      {/* listing all the address */}
      <div className="bg-white shadow-md p-4 rounded">
        {addresses.length > 0 ? (
          <>
            <h2 className="text-black my-2 font-semibold">Your Addresses</h2>
            {addresses.map((item, index) => {
              return (
                <Checkoutradio
                  key={index}
                  item={item}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                  setEditedAddress={setEditAddress}
                  toggleDeleteAdressModal={toggleDeleteAdressModal}
                  toggleEditAddressModal={toggleEditAddress}
                />
              );
            })}
          </>
        ) : (
          <h1 className="text-violet-500 font-semibold">
            No saved Address found
          </h1>
        )}
        <div className="my-5  text-white">
          <button
            className="bg-violet-500 p-3 rounded-md text-white"
            onClick={toggleCreateAddress}
          >
            Add a new Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressCheckout;
