import User from "../../models/user.model.js";
import Salry from "../../models/SalryForm.js";


//add employee using singup route 


export const getemployee = async (req, res, next) => {
    try {
        // Query users with employee role set to true
        const employees = await User.find({ employee: true });

        // Send the response
        res.json(employees);
    } catch (error) {
        // Handle errors
        next(error);
    }
};

//delete employee
export const deleteEmployee = async (req, res, next) => {
    
    try {
      await User.findByIdAndDelete(req.params.EmployeId);
      res.status(200).json("The product has been deleted");
    } catch (error) {
      next(error);
    }
  };

  //create form  include salary 

  export const createsalryForm = async (req, res, next) => {
    
  
    const { EmployeId, name, phone,desc,status} = req.body;
  
    const newProduct = new Salry({
        EmployeId,
        name, 
       
        phone,
     
        desc,
       
        status


    });
    try {
      const savedproduct = await newProduct.save();
      res.status(201).json(savedproduct);
    } catch (error) {
      next(error);
    }
  };

  //get all outofstock form 
export const getAllcartt = async (req, res, next) => {
    try {
      const Items = await Salry.find();
  
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

  //get current appoiment 
  export const currentuserform = async (req, res, next) => {
    
    try {
      const {  EmployeId } = req.params;
      
  
      
      const pay = await Salry.find({EmployeId});
     
  
      
  
      
      res.json(pay);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };


  //form Reject or approve button
export const formReject = async (req, res, next) => {
    try {
      
  
      const { FormmId } = req.params;
      const { status } = req.body;
  
      const updatedform = await Salry.findByIdAndUpdate(
        FormmId ,
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

  export const updateEmployee = async (req, res, next) => {
    const { EmpId } = req.params;
  
    try {
      const updatedEmployee = await User.findByIdAndUpdate(
        EmpId,
        { $set: req.body },
        { new: true }
      );
  
      if (!updatedEmployee) {
        return res.status(404).json({ message: "Employee not found" });
      }
  
      res.status(200).json(updatedEmployee);
    } catch (error) {
      next(error);
    }
  };