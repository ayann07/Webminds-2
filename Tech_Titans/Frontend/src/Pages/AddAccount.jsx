import React, { useState } from 'react';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SideBar from '../components/SideBar';
import { Typography, TextField, CircularProgress, MenuItem, Box } from '@mui/material';
import { toast } from 'react-toastify'
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../main';

const AddAccount = () => {
  const navigate = useNavigate()
  const [inputs, setInputs] = useState({
    username: '',
    account_no: '',
    bank_name: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { authToken } = useAuth();

  const handleChange = (e) => {
    setInputs(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/account/addBank`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authToken
        },
        body: JSON.stringify(inputs)
      });
      if (response.ok) {
        toast.success("Account linked successfully!");
        setInputs({
          username: '',
          account_no: '',
          bank_name: ''
        })
        navigate('/dashboard')
      } else {
        toast.error("Some error occured!");
      }
      setIsLoading(false);
    }
    catch (err) {
      toast.error(err);
      setIsLoading(false);
    }
  };
  const handleCancel = () => {
    setInputs({
      username: '',
      account_no: '',
      bank_name: ''
    });
    setIsLoading(false)
  };
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 'auto', position: 'relative',marginLeft:{xs:'0',md:'15rem'} }}>
      <SideBar />
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
            margin:'auto',
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h5" sx={{ color: 'black' }}>Loading...</Typography>
        </Box>
      ) : (
        <form onSubmit={handleSubmit} style={{ marginTop: "1.2rem", width: "100%", maxWidth: "500px" }}>
            <Typography className="addBankAcc-heading" variant="h4" sx={{ textAlign: 'center', color: 'black', marginBottom: '10px', fontFamily: 'times-new-roman', marginTop: { xs: '1rem', md: '2rem' } }}>Add Bank Account</Typography>
            <Box
              className="addBankAcc-icon"
              sx={{
                backgroundColor: 'inherit',
                color: 'black',
                padding: '5px',
                textAlign: 'center',
                position: 'relative',
                width: '100%'
              }}
            >
              <AccountBalanceIcon
                sx={{
                  position: 'absolute',
                  top: '30px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '100%',
                  height: '180px',
                }}
              />
              <Box
                className="select-bank"
                sx={{
                  display: 'inline-block',
                  marginTop: '200px', // Adjust margin for better spacing
                  width: '100%'
                }}
              >
                <TextField
                  className="addBankAcc-textfield"
                  select
                  fullWidth
                  name="bank_name"
                  label='Select bank'
                  value={inputs.bank_name}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    textAlign: 'left',
                    width: '100%'
                  }}
                >
                  <MenuItem value="Central Bank Of India">Central Bank Of India</MenuItem>
                  <MenuItem value="Bank of Broda">Bank of Baroda</MenuItem>
                  <MenuItem value="HDFC">HDFC Bank</MenuItem>
                  <MenuItem value="ICICI">ICICI Bank</MenuItem>
                  <MenuItem value="Punjab National Bank">Punjab National Bank</MenuItem>
                  <MenuItem value="Axis Bank">Axis Bank</MenuItem>
                </TextField>
              </Box>
              <Box
                className="account-no"
                sx={{
                  display: 'block',
                  marginTop: '40px',
                  width: '100%' // Adjust width for responsiveness
                }}
              >
                <TextField
                  className="addBankAcc-textfield"
                  fullWidth
                  type="text"
                  id="accountNo"
                  label='Account Number'
                  name="account_no"
                  value={inputs.account_no}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    textAlign: 'left',
                    width: '100%' // Adjust width for responsiveness
                  }}
                  inputProps={{
                    maxLength: 12
                  }}
                  error={inputs.account_no.length !== 12 && inputs.account_no.length > 0} // Add error state if length is not 12
                  helperText={inputs.account_no.length !== 12 && inputs.account_no.length > 0 ? "Account number must be exactly 12 characters" : ""}
                />
              </Box>
              <Box
                className="account-holder"
                sx={{
                  display: 'block',
                  marginTop: '40px',
                  width: '100%' // Adjust width for responsiveness
                }}
              >
                <TextField
                  className="addBankAcc-textfield"
                  fullWidth
                  type="text"
                  id="username"
                  name="username"
                  label='Account Holder'
                  value={inputs.username}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{
                    textAlign: 'left',
                    width: '100%' // Adjust width for responsiveness
                  }}
                />
              </Box>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                <button
                  onClick={handleCancel}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#E97451',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '4rem',
                    fontSize: '1.2rem',
                    fontFamily: 'serif'
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#3A833A',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    fontFamily: 'serif',
                  }}
                  type="submit"
                >
                  Confirm
                </button>
              </div>
              </Box>
              
            </form>
      )}
    </Box>
  );
};

export default AddAccount;

