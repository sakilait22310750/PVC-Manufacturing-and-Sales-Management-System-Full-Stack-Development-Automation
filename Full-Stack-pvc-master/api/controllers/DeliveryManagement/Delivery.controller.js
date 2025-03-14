import AddDriver from "../../models/AddDriver.js";
import driver from "../../models/Driver.js";
import Orderr from "../../models/Order.js";
import { errorHandle } from "../../utils/error.js";




//driver create 
export const drivercreate = async (req, res, next) => {
    
  
    const {  name, address,age,contact,Id} = req.body;
  
    const newDriver = new driver({
      
        name, 
        address,
        age,
        Id,
        contact,
        
       


    });
    try {
      const saved = await newDriver.save();
      res.status(201).json(saved);
    } catch (error) {
      next(error);
    }
  };

  //delete driver
export const deletedriver = async (req, res, next) => {
    
    try {
      await driver.findByIdAndDelete(req.params.dirverId);
      res.status(200).json("The product has been deleted");
    } catch (error) {
      next(error);
    }
  };

  //see the order in the details page  display get cart page


 //get all outofstock form 
 export const getAlldiver = async (req, res, next) => {
  try {
    const Items = await driver.find();

    if (Items.length > 0) {
      res.json({ message: " driver details retrieved successfully", Items });
    } else {
      return next(errorHandle(404, " Items not fonud "));
    }
  } catch (error) {
    console.log(error.message);

    next(error);
  }
};

//add driver for the order 
export const addDriver = async (req, res, next) => {
    
  
  const { Drivername, Age, ExprinceD, Contact } = req.body;

  try {
    const order = await Orderr.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.Drivername = Drivername || order.Drivername;
    order.Age = Age || order.Age;
    order.ExprinceD = ExprinceD || order.ExprinceD;
    order.Contact = Contact || order.Contact;

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
  };

  //get current appoiment  do not want that api route 
 export const currentdriver = async (req, res, next) => {
    
    try {
      const { customerId } = req.params;
      console.log(customerId)
  
      
      const pay = await AddDriver.find({customerId});
     
  
      
  
      
      res.json(pay);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  //update driver 
  export const updateDriver = async (req, res, next) => {
   
    try {
      const updateItems = await driver.findByIdAndUpdate(
        req.params.DId,
        {
          $set: {
            name: req.body.name,
            address: req.body.address,
            age: req.body.age,
            Id: req.body.Id,
            contact: req.body.contact,
          
          },
        },
        { new: true }
      );
      res.status(200).json(updateItems);
    } catch (error) {
      next(error);
    }
  };
