import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addItem} from '../redux/cartSlice';

const ProductCart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items); // Ensure this is accessing an array
  const token = useSelector((state) => state.user.token); // Assuming token is stored in the user slice
  
  const isInCart = Array.isArray(cartItems) && cartItems.find((el) => el.id === props.item.id);

  const handleAdd = async (e) => {
    e.preventDefault(); // Prevent any default behavior that might cause a page refresh

    if (!token) {
      console.error('No authentication token found! Please log in.');
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/addtocart",
        {
          product_id: props.item.id,
          quantity: 4,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Item added to cart:', res.data);

      // Assuming the API returns the full cart or the added item
      dispatch(addItem(res.data)); // Add the item to the Redux cart
    } catch (error) {
      console.error('Error adding to cart:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='card'>
      <img className='product-cart-img' src={props.item.image} alt={props.item.title} />
      <div className='card-title'>
        <h3>{props.item.title}</h3>
        <p>{props.item.description}</p>
        <p>Quantity: {props.item.quantity}</p>
        <p>Category: {props.item.category}</p>
        <div>${props.item.price}</div>
      </div>
      {isInCart ? (
        <Link to="/cart">
          <button className="button">Go to Cart</button>
        </Link>
      ) : (
        <button type="button" className="button" onClick={handleAdd}>Add to Cart</button>
      )}
    </div>
  );
};

export default ProductCart;
