import React from 'react';
import "../style/cart.css";

const CartCard = ({ item }) => {
  return (
    <div className="cart-container" key={item.id}>
      <img src={item.image} alt={item.title} width={50} />
      <div>{item.title}</div>
      <div>
        <button>-</button>&nbsp;
        {item.quantity || 1}&nbsp;
        <button>+</button>
      </div>
      <div>${item.price}</div>
    </div>
  );
};

export default CartCard;
