// const CartModel = require("../Models/CartModel");
// const ProductModel = require("../Models/ProductModel");
// const mongoose = require("mongoose");
// const ObjectId = mongoose.Types.ObjectId;
// const CartService = require("../Services/CartService");

// //ADD-TO-CART
// const addtocart = async (req, res) => {
//   try {
//     const { product_id, quantity } = req.body;
//     const user_id = req.user.id;
//     const cart = await CartModel.findOne({ user_id });
//     if (cart) {
//       let product = cart.products.find((p) => p.product_id === product_id);

//       if (product) {
//         product.quantity += quantity;
//         await product.save()
//         res
//           .status(200)
//           .json({
//             status: "success",
//             message: "Product quantity updated",
//             product,
//           });
//       } else {
//         let newProduct = { product_id, quantity };
//         cart.products.push(newProduct);
//         await cart.save();
//         res
//           .status(200)
//           .json({
//             status: "success",
//             message: "Product added to cart",
//             newProduct,
//           });
//       }
//     } else {
//       const newCart = new CartModel({
//         user_id,
//         products: [{ product_id, quantity }],
//       });
//       await newCart.save();
//       res.status(200).json({ message: "New Product added to cart" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "error", error: err.message });
//   }
// };

// //GET-ITEMS
//   const getcarts = async (req, res) => {
//     const user_id = req.user.id;
//     // console.log(user_id);
//     try {
//       const cart = await CartModel.findOne({ user_id });
//       if (cart) {
//         let subtotal = 0;
//         const productDetails = await Promise.all(
//           cart.products.map(async (item) => {
//             const product = await ProductModel.findOne({ id: item.product_id }, 'title description image price');
//             subtotal += product.price * item.quantity;
//             return {
//               title: product.title,
//               description: product.description,
//               image:product.image,
//               price:  product.price,
//               quantity: item.quantity,
//             };
//           })
//         );
  
//         res.status(200).send({productDetails,subtotal});
//       } else {
//         res.status(401).send({ message: "No items found" });
//       }
//     } catch (err) {
//       res.status(500).send({ error: err.message });
//     }
//   };

// //REMOVE QUANTITY
// const removequantity = async (req, res) => {
//   const user_id = req.user.id;
//   const product_id = req.body.product_id;
//   const quantity = req.body.quantity;
//   console.log(user_id, product_id);
//   try {
//     const cart = await CartModel.findOne({ user_id });
//     if (cart) {
//       const prod = cart.products.findIndex((p) => p.product_id === product_id);
//       if (prod !== -1) {
//         cart.products[prod].quantity -= quantity;
//         console.log(quantity);
//         if (cart.products[prod].quantity <= 0) {
//           await CartModel.deleteOne({ user_id });
//         }
//         await cart.save();
//         res
//           .status(200)
//           .json({ message: "success", message: "quantity reduced", quantity });
//         console.log("reduced quantity:", quantity);
//       } else {
//         res
//           .status(401)
//           .json({ message: "product not found", message: err.message });
//       }
//     } else {
//         res.status(401).json({ message: "cart not found", error: err.message });
//     }
//   } catch (err) {
//        res.status(500).json({ message: "internal err", error: err.message });
//   }
// };

// //DELETE CART
// // const deletecart = async (req, res) => {
// //   const product_id = req.body.product_id;
// //   const user_id = req.user.id;

// //   try {
// //     const cart = await CartModel.findOne({ user_id });
// //     if (cart) {
// //       const product = cart.products.findIndex(
// //         (p) => p.product_id === product_id
// //       );
// //       if (product > -1) {
// //         cart.products.splice(product, 1);
// //         if (cart.products.length > 0) {
// //           await cart.save();
// //         } else {
// //           await CartModel.deleteOne({ user_id });
// //         }
// //         res.send({ message: "Product removed from cart" });
// //       } else {
// //         res.send({ message: "Item not found" });
// //       }
// //     } else {
// //       res.send({ message: "No products found" });
// //     }
// //   } catch (err) {
// //     res.status(401).json({ message: err.message });
// //   }
// // };

// // const deleteproducts = async(req,res)=>{
// //     await CartService.deleteproduct(req.user , req.body.product_id)
// // }


// module.exports = {
//   addtocart,
//   getcarts,
//   removequantity
// };
const CartModel = require("../Models/CartModel");
const ProductModel = require("../Models/ProductModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//ADD-TO-CART
const addtocart = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const user_id = req.user.id;
    const cart = await CartModel.findOne({ user_id });

    if (cart) {
      let product = cart.products.find((p) => p.product_id === product_id);

      if (product) {
        product.quantity += quantity;
        await cart.save();
        res.status(200).json({
            status: "success",
            message: "Product quantity updated",
            product,
          });
      } 
      else {
        let newProduct = { product_id, quantity };
        cart.products.push(newProduct);
        await cart.save();
        res.status(200).json({
            status: "success",
            message: "Product added to cart",
            newProduct,
          });
      }
    } 
    else {
      const newCart = new CartModel({
        user_id,
        products: [{ product_id, quantity }],
      });
      await newCart.save();
      res.status(200).json({ message: "New Product added to cart" });
    }
  } catch (err) {
    res.status(500).json({ message: "error", error: err.message });
  }
};

//GET-ITEMS
const getcarts = async (req, res) => {
  const user_id = req.user.id;
  try {
    const cart = await CartModel.findOne({ user_id });
    if (cart) {
      let subtotal = 0;
      const productDetails = await Promise.all(
        cart.products.map(async (item) => {
          const product = await ProductModel.findOne({ id: item.product_id }, 'title description image price');
          if (!product) {
            console.error(`Product with ID ${item.product_id} not found`);
            return null; // Or handle this case as needed
          }
          subtotal += product.price * item.quantity;
          return {
            title: product.title,
            description: product.description,
            image: product.image,
            price: product.price,
            quantity: item.quantity,
          };
        })
      );

      // Filter out any null values from the productDetails array
      const validProductDetails = productDetails.filter(detail => detail !== null);

      res.status(200).json({ status: "success", productDetails: validProductDetails, subtotal });
    } else {
      res.status(404).json({ status: "error", message: "Cart not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};


//REMOVE QUANTITY
const removequantity = async (req, res) => {
  const user_id = req.user.id;
  const product_id = req.body.product_id;
  const quantity = req.body.quantity;
  try {
    const cart = await CartModel.findOne({ user_id });
    if (cart) {
      const prod = cart.products.findIndex((p) => p.product_id === product_id);
      if (prod !== -1) {
        cart.products[prod].quantity -= quantity;
        console.log(quantity);
        if (cart.products[prod].quantity <= 0) {
          await CartModel.deleteOne({ user_id });
        }
        await cart.save();
        res.status(200).json({ message: "success", message: "quantity reduced", quantity });
      } else {
        res.status(401).json({ message: "product not found", message: err.message });
      }
    } else {
        res.status(401).json({ message: "cart not found", error: err.message });
    }
  } catch (err) {
       res.status(500).json({ message: "internal err", error: err.message });
  }
};

//DELETE CART
// const deletecart = async (req, res) => {
//   const product_id = req.body.product_id;
//   const user_id = req.user.id;

//   try {
//     const cart = await CartModel.findOne({ user_id });
//     if (cart) {
//       const product = cart.products.findIndex(
//         (p) => p.product_id === product_id
//       );
//       if (product > -1) {
//         cart.products.splice(product, 1);
//         if (cart.products.length > 0) {
//           await cart.save();
//         } else {
//           await CartModel.deleteOne({ user_id });
//         }
//         res.send({ message: "Product removed from cart" });
//       } else {
//         res.send({ message: "Item not found" });
//       }
//     } else {
//       res.send({ message: "No products found" });
//     }
//   } catch (err) {
//     res.status(401).json({ message: err.message });
//   }
// };

// const deleteproducts = async(req,res)=>{
//     await CartService.deleteproduct(req.user , req.body.product_id)
// }


module.exports = {
  addtocart,
  getcarts,
  removequantity
};
