// import React, { useEffect } from 'react';
// import "../style/cart.css";
// import { useSelector } from 'react-redux';
// import CartCard from './CartCard';

// const Cart = () => {
//   const CartItems = useSelector((state) => state.cart.items);

//   useEffect(() => {
//     console.log(CartItems);  // Check if items are correctly fetched
//   }, [CartItems]);

//   return (
//     <div className='card-full'>
//       <div>
//         {CartItems.map((item) => (
//           <CartCard key={item.id} item={item} />
//         ))}
//       </div>
//       <div className='checkout-card'>
//         <div>
//           <h3>Price Details</h3>
//           <div>
//             <span>Price ({CartItems.length} item{CartItems.length > 1 ? 's' : ''})</span>
//             <span>${CartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;
import React, { useEffect } from 'react';
import "../style/cart.css";
import { useSelector } from 'react-redux';
import CartCard from './CartCard';

const Cart = () => {
  const CartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    console.log(CartItems);  // Check if items are correctly fetched
  }, [CartItems]);

  return (
    <div className='card-full'>
      <div>
        {CartItems.length > 0 ? (
          CartItems.map((item) => (
            <CartCard key={item.id} item={item} />
          ))
        ) : (
          <p>No items in the cart.</p>
        )}
      </div>
      <div className='checkout-card'>
        <div>
          <h3>Price Details</h3>
          <div>
            <span>Price ({CartItems.length} item{CartItems.length > 1 ? 's' : ''})</span>
            <span>${CartItems.reduce((total, item) => total + item.price * (item.quantity || 1), 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
