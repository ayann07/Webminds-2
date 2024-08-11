import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import logoImage from "../assets/easy-pay-logo.png";
import { BASE_URL } from "../main";
const Login = () => {
  const navigate = useNavigate();
  const { storeToken} = useAuth();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      if (response.ok) {
        const data = await response.json();
        storeToken(data.token);
        setInputs({ email: "", password: "" });
        navigate("/Dashboard");
        toast.success("Login Successful!");
      } else {
        toast.error("Invalid credentials!");
      }
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div
    className="loginPage"
      style={{
        background: 'linear-gradient(135deg, rgb(206, 159, 252) 10%, rgb(115, 103, 240) 100%)',
        height: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "center" }}
      >
        <img
          className="loginLogo"
          src={logoImage}
          alt="Logo"
          style={{ width: "400px", height: "auto", borderRadius: "2rem" }}
        />
      </div>
      <div className="loginBox">
        <form className="loginForm" onSubmit={handleSubmit}>
          <Box
            maxWidth={320}
            width="100%"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            padding={3}
            borderRadius={5}
            boxShadow={3}
            bgcolor="white"
          >
            <Typography
              variant="h4"
              textAlign="center"
              fontFamily="Times New Roman"
              color="black"
              mb={3}
            >
              Login
            </Typography>
            <TextField
              label="Email"
              value={inputs.email}
              onChange={handleChange}
              name="email"
              margin="normal"
              type="email"
              required
            />
            <TextField
              label="Password"
              value={inputs.password}
              onChange={handleChange}
              name="password"
              margin="normal"
              type="password"
              required
            />
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ my: 2, width: "40%" }}
            >
              Submit
            </Button>

            <Button
              sx={{ color: "black" }}
              onClick={() => navigate("/signup")}
              fullWidth
            >
              Register
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Login;
