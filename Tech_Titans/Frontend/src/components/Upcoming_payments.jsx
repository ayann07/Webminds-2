
import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import {toast} from 'react-toastify'
import { BASE_URL } from '../main';


const UpcomingPayments = () => {
  const [balance,setBalance]=useState(0);
  const { authToken } = useAuth();


  const getDetails=async ()=>{
    try{
      const response=await fetch(`${BASE_URL}/auth/user`,{
        method:"GET",
        headers: {
          Authorization: authToken,
        }
      })
      if(response.ok){
        const data=await response.json()
        const newRes=await fetch(`${BASE_URL}/account/bank/${data.user.banks[0]._id}`,{
          method:"GET",
          headers: {
            Authorization: authToken,
          }
        })
        if(newRes.ok){
          const bankData=await newRes.json();
          setBalance(bankData.account.balance);
        }
      }
      else{
        setBalance(0);
      }
    }
    catch(err){
      toast.error(err);
    }
  }
  useEffect(()=>{
    getDetails();
  },[getDetails])
  return (
    <div className='balContainer' style={{
      background: '#d8dde8',
      padding: '20px',
      borderRadius: '12px',
      marginTop: '20px',
      width: '200px',
      height: '150px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: '1.9rem',
        fontWeight: 'bolder',
        margin: '0 0 10px 0',
        color: '#333',
        fontFamily:'serif'
      }}>Balance</h2>
      <h1 style={{
        fontSize: '2.5rem',
        margin: '0',
        color: '#4CAF50'
      }}>₹ {balance}</h1>
    </div>
  );
};

export default UpcomingPayments;