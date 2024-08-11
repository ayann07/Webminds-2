import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useAuth } from "../store/auth";
import { Container, CircularProgress, Typography } from "@mui/material";
import { BASE_URL } from "../main";

function LineChart() {
  const { authToken } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [sentAmounts, setSentAmounts] = useState({});
  const [receivedAmounts, setReceivedAmounts] = useState({});

  //   const labels=Object.keys(sentAmounts);
  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "Expenditure",
        backgroundColor: "rgba(255, 99, 132,0.6)",
        borderColor: "rgba(255, 99, 132,0.6)",
        data: labels.map((label) => {
          if (sentAmounts[label + ` ${new Date().getFullYear()}`]) {
            return sentAmounts[label+` ${new Date().getFullYear()}`];
          }
          else{
            return 0;
          }
        }),
        // data:[1000,200,3000,500,480,1000,1200,2000,1100,60,300]
      },
      {
        label: "Income",
        backgroundColor: "rgba(51,153,255,0.6)",
        borderColor: "rgb(51,153,255,0.6)",
        data: labels.map((label) => {
          if (receivedAmounts[label + ` ${new Date().getFullYear()}`]) {
            return receivedAmounts[label+` ${new Date().getFullYear()}`];
          }
          else{
            return 0;
          }
        }),
        // data:[100,3000,400,500,200,2000,1200,900,2000,300,1800,500]
      },
    ],
  };

  useEffect(() => {
    const getTotalMonthlyAmount = (transactions) => {
      const newSentAmounts = { ...sentAmounts };
      const newReceivedAmounts = { ...receivedAmounts };

      transactions.forEach((transaction) => {
        const date = new Date(transaction.createdAt);
        const monthName = date.toLocaleString("en-US", { month: "short" });
        const monthYearKey = `${monthName} ${date.getFullYear()}`;

        if (transaction.status === "received") {
          newReceivedAmounts[monthYearKey] =
            (newReceivedAmounts[monthYearKey] || 0) + transaction.amount;
        } else if (transaction.status === "sent") {
          newSentAmounts[monthYearKey] =
            (newSentAmounts[monthYearKey] || 0) + transaction.amount;
        }
      });

      setReceivedAmounts(newReceivedAmounts);
      setSentAmounts(newSentAmounts);
    };

    const getTransactions = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/payments/transactions`,
          {
            method: "GET",
            headers: {
              Authorization: authToken,
            },
          }
        );
        const data = await response.json();
        setTransactions(data);
        getTotalMonthlyAmount(data);
      } catch (err) {
        console.log(err);
      }
    };

    getTransactions();
  }, [authToken]);

  return (
    <div>
      {sentAmounts.length == 0 ? (
        <Container
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h5">Loading...</Typography>
        </Container>
      ) : (
        <>
          {console.log(sentAmounts)}
          {console.log(receivedAmounts)}
          <Container className="Chart"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "60vh",
            width:"50vw",
            flexDirection: "column",
          }}
        >
          <Line data={data}/>
        </Container>
        </>
      )}
    </div>
  );
}
export default LineChart;
