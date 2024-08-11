import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PaymentIcon from "@mui/icons-material/Payment";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import ListAltIcon from "@mui/icons-material/ListAlt";
import UpcomingPayments from "../components/Upcoming_payments";
import Transaction_table from "../components/Transaction_table";
import LineChart from "../components/LineChart";
const linkStyles = {
  textDecoration: "none",
  color: "white",
};

const Home = () => {
  return (
    <div className="home" style={{ display: "flex" }}>
      <SideBar />
      <div
      className="home1"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          marginLeft: "3rem",
        }}
      >
        <div className="home-buttons" style={{ display: "flex" }}>
          <Link to="/send-money" style={linkStyles}>
            <div
              className="button"
              style={{
                background:
                  "linear-gradient(135deg, rgb(206, 159, 252) 10%, rgb(115, 103, 240) 100%)",
                width: "170px",
                height: "170px",
                borderRadius: "15%",
                margin: "25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <PaymentIcon
                className="btnIcon"
                sx={{ fontSize: "6rem", color: "white" }}
              />
              <h3>Send Money</h3>
            </div>
          </Link>
          <Link to="/receive-money" style={linkStyles}>
            <div
              className="button"
              style={{
                background:
                  "linear-gradient(135deg, rgb(206, 159, 252) 10%, rgb(115, 103, 240) 100%)",
                width: "170px",
                height: "170px",
                borderRadius: "15%",
                margin: "25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <SyncAltIcon
                className="btnIcon"
                sx={{ fontSize: "6rem", color: "white" }}
              />
              <h3>Receive Money</h3>
            </div>
          </Link>
          <Link to="/add-account" style={linkStyles}>
            <div
              className="button"
              style={{
                background:
                  "linear-gradient(135deg, rgb(206, 159, 252) 10%, rgb(115, 103, 240) 100%)",
                width: "170px",
                height: "170px",
                borderRadius: "15%",
                margin: "25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <AccountBalanceIcon
                className="btnIcon"
                sx={{ fontSize: "6rem", color: "white" }}
              />
              <h3>Add Bank Account</h3>
            </div>
          </Link>
          <Link to="/statement" style={linkStyles}>
            <div
              className="button"
              style={{
                background:
                  "linear-gradient(135deg, rgb(206, 159, 252) 10%, rgb(115, 103, 240) 100%)",
                width: "170px",
                height: "170px",
                borderRadius: "15%",
                margin: "25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <ListAltIcon
                className="btnIcon"
                sx={{ fontSize: "6rem", color: "white", paddingTop: "1rem" }}
              />
              <h3>Balance And Statement</h3>
            </div>
          </Link>
        </div>
        <div className="chartBal" style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginTop:"2%"}}>
        <LineChart/>
        <UpcomingPayments/>
        </div>
        <div>
          <Transaction_table/>
        </div>
      </div>
    </div>
  );
};

export default Home;
