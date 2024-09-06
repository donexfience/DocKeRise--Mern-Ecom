import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { URL } from "../../../../Common/api";

const Chart4 = ({ numberOfDates }) => {
  const [revenueData, setRevenueData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const { data } = await axios.get(
          `${URL}/admin/TotalRevenue${
            numberOfDates ? `?numberOfDates=${numberOfDates}` : ""
          }`
        );
        if (data.totalRevenue) {
          console.log(data);
          const transformedData = data.totalRevenue.map((item) => ({
            x: item._id,
            y: item.totalRevenue,
          }));
          setRevenueData(transformedData);
        }
      } catch (error) {
        console.error("Error loading revenue data", error);
      }
    };

    loadData();
  }, [numberOfDates]);

  return (
    <div>
      <Line
        data={{
          datasets: [
            {
              label: "Total Revenue",
              data: revenueData,
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        }}
        options={{
          scales: {
            xAxes: [
              {
                type: "time", // Assuming your x-axis represents time
                time: {
                  unit: "day", // Adjust the unit according to your data
                },
                ticks: {
                  autoSkip: true,
                  maxTicksLimit: 10, // Adjust the maximum number of ticks as needed
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
        }}
      />
    </div>
  );
};

export default Chart4;
