import React, { useEffect, useState } from 'react'
import { PRODUCT } from '../constant'
import ProductCart from './ProductCart'
import axios from "axios";


const Products = (props) => {
  const [productList,setProductList] = useState([]);
  useEffect(()=>
  {
    getproducts()
  },[]);
  const getproducts = async ()=>{
    console.log("get products aclled");
    const res = await axios.get("http://localhost:5000/getproducts")
    setProductList(res.data.products)
    console.log(res.data.products)

  }




    
  return (
    <div className='container-boader'>
  <div className='container'>
    {productList.map((item)=>(<ProductCart key={item.id} item={item} />))}
    
   
    </div>
    </div>
  )
}

export default Products