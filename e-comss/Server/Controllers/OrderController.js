const OrderModel = require('../Models/OrderModel');
const ProductModel = require('../Models/ProductModel');
const CartModel = require('../Models/CartModel');
const UserModel = require('../Models/UserModel');
// const ProductModel = require('../Models/ProductModel');
const CartService = require("../Services/CartService")

const orderdetails = async (req, res) => {
    const user_id = req.user.id;
    // console.log(user_id);
    
    try {
      const user = await UserModel.findOne({ _id: user_id });
      // console.log(user);
      
      if (!user) {
        return res.status(400).json({ status: "failure", message: "User not found" });
      }
  
      const cartResult = await CartService.getproduct(user_id);
      // if (!cartResult || !cartResult.productDetails || !cartResult.subtotal) {
      //   return res.status(400).json({ status: "failure", message: "Failed to retrieve cart details or cart is empty." });
      // }
      const { productDetails, subtotal } = cartResult;
  
      if (productDetails.length === 0) {
        return res.status(400).json({ status: "failure", message: "No products in the cart." });
      }
  
      const order = new OrderModel({
        cust_name: req.body.cust_name,
        cust_phone: req.body.cust_phone,
        cust_address: req.body.cust_address,
        order_date: new Date(),
        delivery_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days after the order date
        order_items: productDetails,
        total_amount: subtotal,
        order_status: req.body.order_status,
        user_id: user_id
      });
  
      await order.save();
      await CartModel.deleteOne({user_id});
      res.status(200).json({ status: "success", message: "Order placed successfully", order });
    } catch (err) {
      // console.error(err);
      res.status(500).json({ status: "failure", message: err.message });
    }
  };



//  get order>>>>>>>> 
const getorder = async (req, res) => {
  const user_id = req.user.id; 
  try {
      const orderDetails = await OrderModel.find({ user_id });
      const allProducts = [];

      for (const order of orderDetails) {
          for (const item of order.order_items) {
              const productDetails = await ProductModel.findOne({ id: item.product_id });
              if (productDetails) {const getorder = async (req, res) => {
    const user_id = req.user.id; 
    try {
        const orderDetails = await OrderModel.find({ user_id });
        const allProducts = [];

        for (const order of orderDetails) {
            for (const item of order.order_items) {
                const productDetails = await ProductModel.findOne({ id: item.product_id });
                if (productDetails) {
                    allProducts.push({
                        product_id: item.product_id,
                        quantity: item.quantity,
                        delivery_date: order.delivery_date, 
                        title: productDetails.title,
                        price: productDetails.price,
                        image: productDetails.image
                    });
                } else {
                    console.error("Product not found");
                }
            }
        }
        res.status(200).json({ orders: orderDetails, products: allProducts });
    } catch (err) {
        res.status(500).send({ error: err.message, message: "Can't retrieve orders" });
    }
};


                  allProducts.push({
                      product_id: item.product_id,
                      quantity: item.quantity,
                      delivery_date: order.delivery_date, 
                      title: productDetails.title,
                      price: productDetails.price,
                      image: productDetails.image
                  });
              } else {
                  console.error("Product not found");
              }
          }
      }
      res.status(200).json({ orders: orderDetails, products: allProducts });
  } catch (err) {
      res.status(500).send({ error: err.message, message: "Can't retrieve orders" });
  }
};
  

module.exports = {orderdetails,getorder};