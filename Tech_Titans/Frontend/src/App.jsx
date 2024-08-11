import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import SendMoney from './Pages/SendMoney'
import ReceiveMoney from './Pages/ReceiveMoney'
import AddAccount from './Pages/AddAccount'
import Contact from './Pages/Contact'
import Support from './Pages/Support'
import Service from './Pages/Service'
import Security from './Pages/Security'
import Statement from './Pages/Statement'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import LogOut from './Pages/LogOut'
import { useAuth } from './store/auth'
import AddBankAcc from './Pages/AddBankAcc'
import MobileSideBar from './components/MobileSideBar'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react'
function App() {
  const {isLoggedIn}=useAuth();
  const isLoginPage = window.location.pathname === '/' || window.location.pathname === '/signup';

  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <BrowserRouter>
      {!isLoginPage && isLoggedIn &&
      <IconButton className='topButton' onClick={toggleSidebar}>
                <MenuIcon />
            </IconButton>}
            {isLoggedIn && showSidebar && <MobileSideBar />}

        <Routes>
          
          <Route path='/logout' element={<LogOut/>}/>
          <Route path='/dashboard' element={<Home/>}/>
          <Route path='/send-money' element={<SendMoney/>}/>
          <Route path='/receive-money' element={<ReceiveMoney/>}/>
          <Route path='/add-account' element={<AddAccount/>}/>
          <Route path='/contact-us' element={<Contact/>}/>
          <Route path='/support' element={<Support/>}/>
          <Route path='/service' element={<Service/>}/>
          <Route path='/security' element={<Security/>}/>
          <Route path='/statement' element={<Statement/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/bank' element={<AddBankAcc/>}/>
        </Routes>
        <ToastContainer className='toast-container' position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable style={{marginTop:"2rem"}} />
    </BrowserRouter>
  )
}

export default App;
