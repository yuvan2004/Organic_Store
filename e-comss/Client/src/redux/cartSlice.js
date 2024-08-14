//  import {createSlice} from "@reduxjs/toolkit";
//  const cartSlice = createSlice({
//     name:"cart",
//     initialState:{
//         items:[
            
//         ]
//     },
//     reducers:{
//         setCart: (state,action)=>{
//             state.items=action.payload
//         }
//         ,

//         addItem: (state,action)=>{
//             state.items.push(action.payload)
//         console.log(action);

//         }

//     }
//  });
//  export const { addItem , setCart } = cartSlice.actions;
//  export default cartSlice.reducer;/

import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      state.items = action.payload;
    },
    updateCartItem: (state, action) => {
      const index = state.items.findIndex(item => item.id === action.payload.id);
      if (index >= 0) {
        state.items[index] = action.payload;
      }
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
  },
});

export const {addItem, updateCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;