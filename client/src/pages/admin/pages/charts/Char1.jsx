import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../../../Common/api";
import { config } from "../../../../Common/configurations";

const Char1 = ({ numberOfDates }) => {
  const [totalOrdersSold, setTotalOrdersSold] = useState("");
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get(
          `${URL}/admin/TotalSales${
            numberOfDates ? `?numberOfDates=${numberOfDates}` : ""
          }`,
          config
        );
        if (data) {
          setTotalOrdersSold(data.totalOrdersSold);
          setSalesData(data.salesData);
        }
      } catch (error) {
        console.error("Error fetching total sales:", error);
      }
    };
    loadData();
  }, [numberOfDates]);

  return (
    <div className="border-2 px-5 shadow-lg ml-3 bg-white">
    <h1 className="px-6 pt-2 pb-2 font-bold text-lg">Total sales {totalOrdersSold}</h1>
      <AreaChart
        width={730}
        height={250}
        data={salesData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="_id" /> {/*_id is  the date im aggregating it as id */}
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="totalSales" 
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />a
        <Area
          type="monotone"
          dataKey="totalSales" //  totalSales for the y-axis data
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
    </div>
  );
};

export default Char1;
