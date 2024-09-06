import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { URL } from "../../../../Common/api";

const Chart2 = ({ numberOfDates }) => {
  const [profitData, setProfitData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get(
          `${URL}/admin/TotalProfit${
            numberOfDates ? `?numberOfDates=${numberOfDates}` : ""
          }`
        );
        if (data) {
          setProfitData(data);
        }
      } catch (error) {
        console.error("Error loading profit data:", error);
      }
    };

    loadData();
  }, [numberOfDates]);

  return (
    <div className="ml-3 bg-white rounded-md shadow-lg">
      <h1 className="pt-3 px-2 text-lg font-bold pb-4">Total Profit</h1>
      <BarChart width={730} height={250} data={profitData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalSales" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default Chart2;
