import React, { useState } from 'react';
import SideBar from '../components/SideBar';
import { Typography, Box, TextField, IconButton,CircularProgress } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth';
import { useNavigate } from "react-router-dom";
import { BASE_URL } from '../main';

const Security = () => {
  const [isLoading,setIsLoading]=useState(false)
  const [inputs, setInputs] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const { authToken } = useAuth();
  const navigate = useNavigate();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.confirm_password !== inputs.new_password) {
      toast.error("Confirm password does not match");
      return;
    }
    setIsLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/auth/change`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authToken
        },
        body: JSON.stringify(inputs)
      });
      const data = await response.json();
      if (data.success === true) {
        setInputs({ current_password: "", new_password: "", confirm_password: "" });
        toast.success('Password Changed Successfully!')
        navigate("/dashboard");
      }
      else {
        toast.error("Some error occured!");
      }
      setIsLoading(false)
    }
    catch (err) {
      toast.error(err);
      setIsLoading(false)
    }
  };
  const handleCancel = () => {
    setInputs({
      current_password: '',
      new_password: '',
      confirm_password: ''
    });
  };

  return (
    <Box className="changePasswordContainer"
     sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft:'10rem' }}>
      <SideBar />
      <Typography className='changePasswordHeading' variant="h4" style={{ textAlign: 'center', color: 'black', marginBottom: '30px', fontFamily: 'times-new-roman', marginTop: '2rem' }}>Change Password</Typography>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h5" sx={{ color: 'black' }}>Loading...</Typography>
        </Box>
      ) : (
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            backgroundColor: 'inherit',
            color: '#fff',
            padding: '50px',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <Box style={{ position: 'relative' }}>
            <TextField
            className='changePasswordBox'
              type={showCurrentPassword ? 'text' : 'password'}
              id='current_password'
              label='current password'
              name='current_password'
              value={inputs.current_password}
              onChange={handleChange}
              variant="outlined"
              sx={{
                textAlign: 'left',
                width: '500px',
                marginTop: '20px'
              }}
            />
            <IconButton
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                marginTop: '13px',
              }}
            >
              {showCurrentPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Box>
          <Box style={{ position: 'relative' }}>
            <TextField
            className='changePasswordBox'
              type={showNewPassword ? 'text' : 'password'}
              id='new_password'
              name='new_password'
              value={inputs.new_password}
              onChange={handleChange}
              variant="outlined"
              label='new password'
              sx={{
                width: '500px',
                marginTop: '25px',
              }}
            />
            <IconButton
              onClick={() => setShowNewPassword(!showNewPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                marginTop: '13px',
                transform: 'translateY(-50%)',
              }}
            >
              {showNewPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Box>
          <Box style={{ position: 'relative' }}>
            <TextField
              className='changePasswordBox'
              type={showConfirmPassword ? 'text' : 'password'}
              id='confirm_password'
              name='confirm_password'
              value={inputs.confirm_password}
              onChange={handleChange}
              variant="outlined"
              label='confirm password'
              sx={{
                width: '500px',
                marginTop: '25px'
              }}
            />
            <IconButton
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                marginTop: '13px',
              }}
            >
              {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </Box>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
            <button
              onClick={handleCancel}
              style={{
                padding: '10px 20px',
                backgroundColor: '#E97451',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginRight: '5rem',
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
      </form >
      )}
    </Box >
  );
};

export default Security;
