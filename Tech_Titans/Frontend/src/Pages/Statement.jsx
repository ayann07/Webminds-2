import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography,CircularProgress,Box } from '@mui/material';
import SideBar from '../components/SideBar';
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify';
import { BASE_URL } from '../main';

const Statement = () => {
  const [isLoading,setIsLoading]=useState(false)
  const {authToken}=useAuth();
  const [transactions,setTransactions]=useState([]);
  const compareDates = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
  
    return dateA - dateB;
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'received':
        return ' #4CAF50'; 
      case 'sent':
        return '#f44336';  
      default:
        return 'black'; 
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'success':
        return '#4CAF50';
      case 'failed':
        return '#f44336';
      default:
        return 'black';
    }
  };
  const getTransactions=async()=>{
    setIsLoading(true)
    try{
      const response=await fetch(`${BASE_URL}/payments/transactions`,{
        method:"GET",
        headers:{
          "Authorization":authToken
        }
      })
      const data=await response.json()
      setTransactions(data);
      setIsLoading(false)
    }
    catch(err){
      toast.error(err);
    }
  }
  useEffect(()=>{
    getTransactions();
  },[])
  return (
    <div style={{display:'flex'}}>
      <SideBar/>
      <div style={{ width: '100%' }}>
      <Typography className='statementHeading' variant="h4" style={{ textAlign:'center',color: 'black', marginBottom: '30px',fontFamily:'times-new-roman',marginTop:'1.2rem' }}>Statement and Balance</Typography>
      {isLoading ? (
        <Box className='statement'
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
            margin:'auto'
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h5" sx={{ color: 'black' }}>Loading...</Typography>
        </Box>
      ) : (
      <Table className='statementTable' style={{ width: '100%' }}>
        <TableHead>
          <TableRow style={{ background: 'black' }}>
            <TableCell className='statementHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px',borderBottom:'none' }}>Type</TableCell>
            <TableCell className='statementHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px',borderBottom:'none' }}>Date & Time</TableCell>
            <TableCell className='statementHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px',borderBottom:'none' }}>Amount</TableCell>
            <TableCell className='statementHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px',borderBottom:'none' }}>To / From</TableCell>
            <TableCell className='tableHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px', borderBottom: 'none' }}>Status</TableCell>
            <TableCell className='tableHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px', borderBottom: 'none' }}>Reference ID</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {transactions.sort(compareDates).reverse().map((transaction, index) => {
    var createdAt = transaction.createdAt; // Assuming transaction.createdAt is a valid date string
    var date = new Date(createdAt);
    var formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Kolkata'
    });

    return (
        <TableRow key={index}>
            <TableCell className='statementHead' sx={{ color: getStatusColor(transaction.status), borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>{(transaction.status).toUpperCase()}</TableCell>
            <TableCell className='statementHead' sx={{ color: 'black', borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>{formattedDate}</TableCell>
            <TableCell className='statementHead' sx={{ color: 'black', borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>₹ {transaction.amount}</TableCell>
            <TableCell className='statementHead' sx={{ color:'black', borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>{transaction.status=="sent"?transaction.to_name:transaction.from_name}</TableCell>
            <TableCell className='tableHead' sx={{ color: getPaymentStatusColor(transaction.paymentStatus), borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>{(transaction.paymentStatus).toUpperCase()}</TableCell>
                    <TableCell className='tableHead' sx={{ color: 'black', borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>{transaction.referenceID}</TableCell>
        </TableRow>
    );
})}
        </TableBody>
      </Table>
)    }
    </div>
    </div>
  );
};

export default Statement;