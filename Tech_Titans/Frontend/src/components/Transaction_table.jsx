import React, { useEffect, useState } from 'react';
import { Table, TableHead, TableBody, TableRow, TableCell, Typography, Box, CircularProgress } from '@mui/material';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify'
import { BASE_URL } from '../main';

const Transaction_table = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { authToken } = useAuth();
  const [transactions, setTransactions] = useState([]);


  const compareDates = (a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);

    return dateA - dateB;
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'received':
        return '#4CAF50';
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

  const getTransactions = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`${BASE_URL}/payments/transactions`, {
        method: "GET",
        headers: {
          "Authorization": authToken
        }
      })
      const data = await response.json()
      setTransactions(data);
      setIsLoading(false)
    }
    catch (err) {
      toast.error(err);
    }
  }
  useEffect(() => {
    getTransactions();
  }, [])
  console.log(transactions)
  return (
    <div >
      <Typography className='recent' variant="h5" style={{ textAlign: 'center', color: 'black', marginBottom: '30px', fontFamily: 'times-new-roman', fontSize: '2.3rem' }}>Recent Transactions</Typography>
      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            flexDirection: "column",
            marginLeft: '10rem'
          }}
        >
          <CircularProgress color="inherit" />
          <Typography variant="h5" sx={{ color: 'black' }}>Loading...</Typography>
        </Box>
      ) : (
        <Table className='trxTable' style={{ width: '100%' }}>
          <TableHead>
            <TableRow style={{ background: 'black' }}>
              <TableCell className='tableHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px', borderBottom: 'none' }}>Type</TableCell>
              <TableCell className='tableHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px', borderBottom: 'none' }}>Date & Time</TableCell>
              <TableCell className='tableHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px', borderBottom: 'none' }}>Amount</TableCell>
              <TableCell className='tableHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px', borderBottom: 'none' }}>To / From</TableCell>
              <TableCell className='tableHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px', borderBottom: 'none' }}>Status</TableCell>
              <TableCell className='tableHead' style={{ color: 'white', fontWeight: 'bolder', fontFamily: 'Times new roman', fontSize: '20px', borderBottom: 'none' }}>Reference ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              transactions && transactions?.sort(compareDates).reverse().slice(0, 5).map((transaction, index) => {
                var createdAt = transaction.createdAt;
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

                    <TableCell className='tableHead' sx={{ color: getStatusColor(transaction.status), borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>{(transaction.status).toUpperCase()}</TableCell>
                    <TableCell className='tableHead' sx={{ color: 'black', borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>{formattedDate}</TableCell>
                    <TableCell className='tableHead' sx={{ color: 'black', borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>₹ {transaction.amount}</TableCell>
                    <TableCell className='tableHead' sx={{ color: 'black', borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>{transaction.status == "sent" ? transaction.to_name : transaction.from_name}</TableCell>
                    <TableCell className='tableHead' sx={{ color: getPaymentStatusColor(transaction.paymentStatus), borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>{(transaction.paymentStatus).toUpperCase()}</TableCell>
                    <TableCell className='tableHead' sx={{ color: 'black', borderBottom: 'none', fontFamily: 'serif', fontSize: '1.3rem' }}>{transaction.referenceID}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Transaction_table;