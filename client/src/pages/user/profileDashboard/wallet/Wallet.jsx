import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { getWallet } from "../../../../redux/actions/user/walletActions";
import JustLoading from "../../../../components/JustLoading";
import Pagination from "../../../../components/Pagination";
import transaction from "../../../../assets/transaction.svg";
import walletbalance from "../../../../assets/walletbalance.svg";
import BreadCrumbs from "../../../admin/components/BreadCrumbs";

const Wallet = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { wallet, loading, error, totalAvailableWalletTransactions } =
    useSelector((state) => state.wallet);
  const [page, setPage] = useState(1);
  const handleFilter = (type, value) => {
    const params = new URLSearchParams(window.location.search);
    if (value === "") {
      params.delete(type);
    } else {
      if (type === "page" && value === 1) {
        params.delete(type);
        setPage(1);
      } else {
        params.set(type, value);
        if (type === "page") {
          setPage(value);
        }
      }
    }
    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };
  useEffect(() => {
    dispatch(getWallet(searchParams));
    const params = new URLSearchParams(window.location.search);
    const pageNum = params.get("page");
    setPage(parseInt(pageNum) || 1);
  }, [searchParams]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg h-screen mx-5 shadow-lg lg:mx-0">
        <BreadCrumbs list={["Home", "Wallet"]} />
        <div className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white p-5 rounded-t-lg flex justify-between items-center shadow-md mt-3">
          <h2 className="text-2xl font-extrabold">Wallet Management</h2>
          <div className="flex items-center">
            {wallet ? (
              <>
                <img
                  src={walletbalance}
                  alt="Wallet"
                  className="w-8 h-8 inline-block mr-3"
                />
                <span className="text-xl font-semibold">
                  {wallet.balance} Rs
                </span>
              </>
            ) : (
              <span className="text-xl font-semibold">N/A</span>
            )}
          </div>
        </div>

        <div className="overflow-auto p-5">
          {loading ? (
            <JustLoading size={10} />
          ) : !loading &&
            wallet &&
            wallet.transactions &&
            wallet.transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-max table-auto text-sm shadow-lg">
                <thead>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="px-5 py-3">Transaction Id</td>
                    <td className="px-5 py-3">Amount</td>
                    <td className="px-5 py-3">Type</td>
                    <td className="px-5 py-3">Description</td>
                    <td className="px-5 py-3">Date</td>
                  </tr>
                </thead>
                <tbody>
                  {wallet &&
                    wallet.transactions &&
                    wallet.transactions.length > 0 &&
                    wallet.transactions.map((transaction, index) => (
                      <tr key={index}>
                        <td className="px-5 py-3">
                          {transaction.transaction_id}
                        </td>
                        <td className="px-6">{transaction.amount}</td>
                        <td className="px-6">{transaction.type}</td>
                        <td className="px-6">{transaction.description}</td>
                        <td className="px-6">{transaction.createdAt}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="font-bold mt-72 flex flex-col items-center justify-center">
              <p className="text-xl font-bold">No Transactions found</p>
              <img
                src={transaction}
                className="w-24 h-24"
                alt="No transactions found"
              />
            </div>
          )}

          <Pagination
            handleClick={handleFilter}
            number={10}
            page={page}
            totalNumber={totalAvailableWalletTransactions}
          />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
