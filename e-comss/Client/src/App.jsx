// import Students  from "./components/Student";
// import Counter from "./components/Counter";
// import Header from "./components/Header";
import { useEffect, useState } from "react";
import Products from "./components/Products";
import {Provider} from "react-redux"
import './App.css'
import store from "./redux/store";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomeLayout from "./components/HomeLayout";
import Cart from "./components/Cart";
import axios from "axios";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import About from "./components/About";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/userSlice";

const App =()=>{
  
 const dispatch =  useDispatch()
 useEffect(()=>{
 const token = localStorage.getItem('token')

 if(token){
  dispatch(setToken(token))
 }

 },[]);


  


  return(
    
      <BrowserRouter>
      <ToastContainer />
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<HomeLayout/>}>
      <Route path="/" element={<Products/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/About" element={<About/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    
  )
  
}
export default App;