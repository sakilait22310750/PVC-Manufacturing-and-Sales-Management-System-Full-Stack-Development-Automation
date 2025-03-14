import product from "../../models/prduct.model.js";
import cart from "../../models/Cart.js";
import Order from "../../models/Order.js";
import { errorHandle } from "../../utils/error.js";


export const createsale = async (req, res, next) => {
    
  
    const { name, image, price,desc,quantity } = req.body;
  
    const newProduct = new product({
    
      name,
      image,
      price,
      desc,
      quantity,
    });
    try {
      const savedproduct = await newProduct.save();
      res.status(201).json(savedproduct);
    } catch (error) {
      next(error);
    }
  };



  export const getsale = async (req, res, next) => {
    try {
      const Product = await product.find();
  
      if (Product.length > 0) {
        res.json({ message: "sale details retrieved successfully", Product });
      } else {
        return next(errorHandle(404, " not fonud "));
      }
    } catch (error) {
      console.log(error.message);
  
      next(error);
    }
  };

  export const updatesale = async (req, res, next) => {
   
    try {
      const updateItems = await product.findByIdAndUpdate(
        req.params.ItmesId,
        {
          $set: {
            title: req.body.title,
            name: req.body.name,
            image: req.body.image,
            price: req.body.price,
            desc: req.body.desc,
            quantity: req.body.quantity,
          },
        },
        { new: true }
      );
      res.status(200).json(updateItems);
    } catch (error) {
      next(error);
    }
  };

  export const deletesale = async (req, res, next) => {
    
    try {
      await product.findByIdAndDelete(req.params.ItemssId);
      res.status(200).json("The product has been deleted");
    } catch (error) {
      next(error);
    }
  };

//add to cart 
export const Addcart = async (req, res, next) => {
    
  
    const { customerId,   name, image, price,desc,quantity ,address,phoneN} = req.body;
  
    const newProduct = new cart({
        customerId,
      name,
      image,
      price,
      desc,
      quantity,
      address,
      phoneN


    });
    try {
      const savedproduct = await newProduct.save();
      res.status(201).json(savedproduct);
    } catch (error) {
      next(error);
    }
  };
 
 // display in the cart
 export const getCurrentCartItem = async (req, res, next) => {
    
    try {
      const { customerId } = req.params;
      console.log(customerId)
  
     
      const items = await cart.find({ customerId });
      console.log(items)
  
      
  
      
      res.json(items);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};

 

 

  

  //remove cart 
  export const Removeproduct = async (req, res, next) => {
    
    try {
      await cart.findByIdAndDelete(req.params.productId);
      res.status(200).json("The product has been deleted");
    } catch (error) {
      next(error);
    }
  };

  //place order

  export const Palceorder = async (req, res, next) => {
    
  
    const { customerId,totalPrice,Length,   name, image, price,desc,quantity ,address,phoneN,Items, } = req.body;
  
    const newProduct = new Order({
        customerId,
      name,
      image,
      price,
      desc,
      quantity,
      address,
      phoneN,
      totalPrice,
      Length,
      Items,
      


    });
    try {
      const savedproduct = await newProduct.save();
      res.status(201).json(savedproduct);
    } catch (error) {
      next(error);
    }
  };


 // clear the cart 
export const deleteItemss = async (req, res, next) => {
    try {
      const { customerId } = req.params;
      

      await cart.deleteMany({ customerId });
  
      res.status(200).json({ message: "Items have been deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


 

 