import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import logoImage from "../assets/easy-pay-logo.png";
import { BASE_URL } from "../main";
const Signup = () => {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const { storeToken } = useAuth();

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });
      if (response.ok) {
        const data = await response.json();
        storeToken(data.token);
        setInputs({
          username: "",
          email: "",
          phone: "",
          password: "",
        });
        navigate("/");
        toast.success("Registration Sucessful!");
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
      <div style={{ display: "flex", justifyContent: "center" }}>
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
            maxWidth={420}
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
              Register
            </Typography>
            <TextField
              label="Name"
              value={inputs.username}
              onChange={handleChange}
              name="username"
              margin="normal"
              type="text"
              required
            />
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
              label="Phone Number"
              value={inputs.phone}
              onChange={handleChange}
              name="phone"
              margin="normal"
              type="text"
              required
              inputProps={{
                maxLength: 10
            }}
            error={inputs.phone.length !== 10 && inputs.phone.length>0} // Add error state if length is not 12
            helperText={inputs.phone.length !== 10 && inputs.phone.length>0 ? "Invalid Phone No." : ""}
  
            />
            <TextField
              label="Password"
              value={inputs.password}
              onChange={handleChange}
              name="password"
              margin="normal"
              type="password"
              required
              inputProps={{
                maxLength: 10
            }}
            error={inputs.password.length !== 6 && inputs.password.length>0} // Add error state if length is not 12
            helperText={inputs.password.length !== 6 && inputs.password.length>0 ? "Short Password(min 6)" : ""}
            />
            <Button
              variant="contained"
              type="submit"
              color="success"
              sx={{ my: 2, width: "30%" }}
            >
              Submit
            </Button>
            <Button
              sx={{ color: "black" }}
              onClick={() => navigate("/")}
              fullWidth
            >
              Already registered? Please Login
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Signup;
