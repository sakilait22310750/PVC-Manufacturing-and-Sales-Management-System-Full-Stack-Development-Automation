
import cart from "../../models/Cart.js";
import ItemsDelivry from "../../models/itemDelivry.js";
import Outofstock from "../../models/outofStockForm.js";
import Orderr from "../../models/Order.js";
import { errorHandle } from "../../utils/error.js";

 

 
 //get cart all details inventry manager
 export const getAllorder = async (req, res, next) => {
    try {
      const Items = await Orderr.find();
  
      if (Items.length > 0) {
        res.json({ message: "Items details retrieved successfully", Items });
      } else {
        return next(errorHandle(404, " Items not fonud "));
      }
    } catch (error) {
      console.log(error.message);
  
      next(error);
    }
  };


  //currentuser order
  export const getCurrentorder = async (req, res, next) => {
    
    try {
      const { customerId } = req.params;
      console.log(customerId)
  
     
      const items = await Orderr.find({ customerId });
      console.log(items)
  
      
  
      
      res.json(items);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};

  //instock pass that  delivery manager
  export const delivery = async (req, res, next) => {
    
  
    const {    customerId,totalPrice,Length,name, image, price,desc,quantity ,address,phoneN,Items, } = req.body;
  
    const newProduct = new ItemsDelivry({
        
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
 
   
 //pass the outof stock pass  supliar
 export const createform = async (req, res, next) => {
    
  
    const { productlist, wantdate,status} = req.body;
  
    const newProduct = new Outofstock({
      productlist,
     
      wantdate,
      status,
     
    });
    try {
      const savedproduct = await newProduct.save();
      res.status(201).json(savedproduct);
    } catch (error) {
      next(error);
    }
  };


//status 
export const updateStatus = async (req, res, next) => {
    try {
      
  
      const { FormId } = req.params;
      const { status } = req.body;
  
      const updatedform = await Outofstock.findByIdAndUpdate(
        FormId ,
        { status },
        { new: true }
      );
  
      if (!updatedform) {
        return next(errorHandle(404, " form not found"));
      }
  
      res.status(200).json(updatedform);
    } catch (error) {
      next(error);
    }
  };


//delete outofstock
export const deleteform = async (req, res, next) => {
    
  try {
    await Outofstock.findByIdAndDelete(req.params.formmId);
    res.status(200).json("The Form has been deleted");
  } catch (error) {
    next(error);
  }
};











