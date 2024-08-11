import React, { useState } from 'react';
import { Typography, TextField, Button, Select, MenuItem, Box } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SideBar from '../components/SideBar';
import { toast } from 'react-toastify';
import { BASE_URL } from '../main';

const AddBankAcc = () => {
  const [inputs, setInputs] = useState({
    bank_name: 'Central Bank Of India',
    account_no: '',
    username: '',
    balance: ''
  });

  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_URL}/account/admin/createAccount`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(inputs)
      })
      if (response.ok) {
        toast.success("Bank Added Successfully!")
      }
      else {
        toast.error("Some error occured!")
      }
      setInputs({
        bank_name: 'Central Bank Of India',
        account_no: '',
        username: '',
        balance: ''
      })
    }
    catch (err) {
      toast.error(err);
    }
  };

  return (
    <Box display="flex">
      <SideBar />
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" style={{ color: 'black', marginBottom: '20px', fontFamily: 'times-new-roman' }}>Bank</Typography>
        <Box
          bgcolor="inherit"
          color="#fff"
          padding="50px"
          textAlign="center"
          position="relative"
          marginLeft="10rem"
        >
          <AccountBalanceIcon style={{
            position: 'absolute',
            top: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '500px',
            height: '200px',
          }} />
          <Box className="select-bank" marginTop="200px">
            <Typography variant="h6">Select Bank</Typography>
            <Select
              name="bank_name"
              value={inputs.bank_name}
              onChange={handleChange}
              style={{
                padding: '8px',
                width: '500px',
                borderRadius: '5px',
              }}
            >
              <MenuItem value="Central Bank Of India">Central Bank Of India</MenuItem>
              <MenuItem value="Bank of Broda">Bank of Broda</MenuItem>
              <MenuItem value="HDFC">HDFC Bank</MenuItem>
              <MenuItem value="ICICI">ICICI Bank</MenuItem>
              <MenuItem value="Punjab National Bank">Punjab National Bank</MenuItem>
              <MenuItem value="Axis Bank">Axis Bank</MenuItem>
            </Select>
          </Box>
          <Box className="account-no" marginTop="40px">
            <Typography variant="h6">Enter Account Number</Typography>
            <TextField
              type="text"
              id="accountNo"
              name="account_no"
              value={inputs.account_no}
              onChange={handleChange}
              style={{
                width: '490px',
                borderRadius: '5px',
              }}
            />
          </Box>
          <Box className="account-holder" marginTop="40px">
            <Typography variant="h6">Enter Account Holder</Typography>
            <TextField
              type="text"
              id="username"
              name="username"
              value={inputs.username}
              onChange={handleChange}
              style={{
                width: '490px',
                borderRadius: '5px',
              }}
            />
            <Typography variant="h6">Enter Balance</Typography>
            <TextField
              type="text"
              id="balance"
              name="balance"
              value={inputs.balance}
              onChange={handleChange}
              style={{
                width: '490px',
                borderRadius: '5px',
              }}
            />
          </Box>
          <Button
            variant="contained"
            style={{
              backgroundColor: '#8a2be2',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginTop: '40px',
            }}
            type="submit"
          >
            ADD
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddBankAcc;
