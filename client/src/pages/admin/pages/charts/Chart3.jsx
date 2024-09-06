import axios from "axios";
import React, { useEffect, useState } from "react";
import { URL } from "../../../../Common/api";
import { Legend, Tooltip, XAxis, YAxis, ComposedChart, CartesianGrid, Area, Bar, Line } from "recharts";

const Chart3 = ({ numberOfDates }) => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get(
          `${URL}/admin/TotalUsers${
            numberOfDates ? `?numberOfDates=${numberOfDates}` : ""
          }`
        );
        if (data) {
          // Transform data keys to match Recharts data structure
          const transformedData = data.map((item) => ({
            name: item._id,
            uv: item.count
          }));
          setUserData(transformedData);
        }
      } catch (error) {
        console.error("Error loading user count data", error);
      }
    };

    loadData();
  }, [numberOfDates]);

  return (
    <div className="ml-4 bg-white rounded-md shadow-lg p-5">
      <h1 className="pt-3 px-2 text-lg font-bold pb-4">Total Users</h1>
      <ComposedChart width={730} height={250} data={userData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <CartesianGrid stroke="#f5f5f5" />
        <Area type="monotone" dataKey="uv" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
    </div>
  );
};

export default Chart3;
