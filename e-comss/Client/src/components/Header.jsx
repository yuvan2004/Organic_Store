// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
// import Logo from "../assets/Shopping_Bag_Online_Market_Logo-removebg-preview.png"
// import axios from 'axios'
// import { setCart } from '../redux/cartSlice'

// const Header = (props) => {
//   const cartItems = useSelector((state)=> state.cart.items);
//   console.log(cartItems);
//   const token = useSelector((state)=>state.user.token)

//   const dispatch = useDispatch();

//   useEffect(()=>{
//     getCart();
//   },[]);

//   const getCart= async ()=>{
//     const res = await axios.get("http://localhost:5000/getcart",{
//       headers:{
//         Authorization:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjVhNTA1OWNiYzJhOWE0NjQzYWIwNSIsImlhdCI6MTcyMzE4NDYxNywiZXhwIjoxNzIzMjEzNDE3fQ.67p6_5-4IedrAx-sk2ifO2V1ht8d5X872_ISHpZLQsU"
//       }
//     })
//     console.log("cart",res.data)
//     dispatch(setCart(res.data.productDetails))
//   }


  
  
//   return (
//     <header>
//       <div className='img-logo' ><img  src="{Logo}" alt="LOGO" /></div>
//       <div className='nav'>
//       <Link to='/'>Product</Link>
//       <Link to='/cart'>Cart:{cartItems.length}</Link>
//       {token ? (<Link >Logout</Link>):(<Link to="/login">Login</Link>) }
      
//       <span>About</span>
      
//       </div>
//     </header>
//   )
// }

// export default Header
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addItem} from '../redux/cartSlice';
import axios from 'axios';

const Header = (props) => {
  const cartItems = useSelector((state) => state.cart.items);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) { // Ensure that token is available before making the request
      getCart();
    }
  }, [token]); // Trigger useEffect when the token changes

  const getCart = async () => {
    try {
      const res = await axios.get('http://localhost:5000/getcart', {
        headers: {
          Authorization:`Bearer ${token}`
        },
      });
      dispatch(addItem(res.data.productDetails));
    } catch (error) {
      console.error('Error fetching cart:', error);
      if (error.response && error.response.status === 401) {
        // Handle unauthorized error, e.g., redirect to login or show a message
        console.error('Unauthorized! Please check your token or login again.');
      }
    }
  };

  return (
    <header>
      <div className='img-logo'>
        <img src='assets/dairy logo.png' alt='logo' />
      </div>
      <div className='nav'>
        <Link to='/'>Product</Link>
        <Link to='/cart'>Cart:</Link><p> {cartItems.length}</p>
        {token ? (
          <Link to='/logout'>Logout</Link>
        ) : (
          <Link to='/login'>Login</Link>
        )}
        <Link to='/signup'>Signup</Link>
        <Link to='/about'>About</Link>
      </div>
    </header>
  );
};

export default Header;