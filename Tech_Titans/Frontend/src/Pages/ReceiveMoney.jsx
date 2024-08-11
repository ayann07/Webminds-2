
import React, { useState, useEffect } from 'react';
import QRCode from "react-qr-code";
import SideBar from '../components/SideBar';
import { Divider, Typography, Box, CircularProgress } from '@mui/material';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import { BASE_URL } from '../main';

const ReceiveMoney = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [qrCodeData, setQRCodeData] = useState('');
  const [shareableLink, setShareableLink] = useState('');
  const [upiID, setUpiID] = useState('');
  const { authToken } = useAuth();

  const getDetails = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authToken,
        }
      });
      if (response.ok) {
        const data = await response.json();
        setUpiID(`${data.user.phone}@easyPay`);
        const newRes = await fetch(`${BASE_URL}/account/bank/${data.user.banks[0]._id}`, {
          method: "GET",
          headers: {
            Authorization: authToken,
          }
        });
        if (newRes.ok) {
          const bankData = await newRes.json();
          const data = `Account Details : \n Account Holder : ${bankData.account.username} \n Bank : ${bankData.account.bank_name} \n Account_No : ${bankData.account.account_no}`;
          setQRCodeData(data);
          generateShareableLink(data);
        }
      }
      setIsLoading(false);
    }
    catch (err) {
      toast.error(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
  }, []);

  const generateShareableLink = (data) => {
    const link = `https://example.com/qrcode?data=${encodeURIComponent(data)}`;
    setShareableLink(link);
  };

  const downloadQRCode = () => {
    const qrCodeDataURL = `data:image/jpg;base64,${qrCodeData}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = qrCodeDataURL;
    downloadLink.download = 'qrcode.jpg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const shareQRCode = () => {
    navigator.clipboard.writeText(shareableLink);
    toast.success('QR code link copied to clipboard!');
  };

  return (
    <div className="receiveMoneyForm" style={{ display: 'flex', marginBottom: '2rem' }}>
      <SideBar />
      <div style={{ color: 'white', textAlign: 'center', width: '100%' }}>
        <Typography className='receiveMoneyHeading' variant="h4" style={{ color: 'black', marginBottom: '20px', fontFamily: 'times-new-roman', marginTop: '1.2rem' }}>Recieve Money</Typography>
        {isLoading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              flexDirection: "column",
              margin: 'auto'
            }}
          >
            <CircularProgress color="inherit" />
            <Typography variant="h5" sx={{ color: 'black' }}>Loading...</Typography>
          </Box>
        ) : (
          qrCodeData && (
            <div style={{ marginBottom: '20px' }}>
              <QRCode className='qr-code-container' value={qrCodeData} style={{ width: '180px' }} />
              <p className='qr-code-typo' style={{ fontSize: '1.2rem', color: 'black' }}>Scan this QR code to receive money</p>
              <div  style={{ display: 'flex', justifyContent: 'center',marginTop:'2rem',marginBottom:'1.5rem' }}>
                <button
                  onClick={downloadQRCode}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#fff',
                    color: 'black',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginRight: '20px',
                  }}
                >
                  Download QR Code
                </button>
                <button
                  onClick={shareQRCode}
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#fff',
                    color: 'black',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                  }}
                >
                  Share QR Code
                </button>
              </div>
            </div>
          )
        )}
        <Divider style={{ backgroundColor: 'black', margin: 'auto', width:'80%' }} />
        <Typography variant='h6' fontFamily={'times-new-roman'} style={{ color: 'black', marginBottom: '1rem',marginTop:'2rem' }}>Receive Money through UPI ID</Typography>
        <label elevation={3} style={{ backgroundColor: 'transparent', border: '1px solid black', color: 'black', display: 'inline-flex', alignItems: 'center', padding: '0.5rem', borderRadius: '2px', marginBottom: '20px' }}>
          <p style={{ fontSize: '1.2rem' }}>{upiID}</p>
        </label>
      </div>
    </div>
  );
};

export default ReceiveMoney;



