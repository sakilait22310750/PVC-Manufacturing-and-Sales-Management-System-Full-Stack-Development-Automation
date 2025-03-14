import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {




    

    name: {
      type: String,
      required: true,
      
    },
    address: {
      type: String,
      required: true,
      
    },
    age: {
      type: Number,
      required: true,
    },
    Id: {
        type: Number,
        required: true,
      },
    contact: {
        type: Number,
        required: true,
      },
      
    
    
      
     
   
    
    
  },
  { timestamps: true }
);

const driver = mongoose.model('driver', driverSchema);

export default driver;