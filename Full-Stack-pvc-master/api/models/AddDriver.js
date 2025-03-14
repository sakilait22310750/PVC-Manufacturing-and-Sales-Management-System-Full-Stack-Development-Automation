import mongoose from 'mongoose';

const AddDriverSchema = new mongoose.Schema(
  {

    customerId: {
        type: String,
        required: true,
       
      },

    title: {
      type: String,
      required: true,
    
    },
    
    price: {
      type: Number,
      required: true,
    },
    image: {
        type: String,
        required: true,
      },
     
      quantity: {
        type: String,
        required: true,
      },
      totalprice: {
        type: Number,
        required: true,
      },
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
      Exprince: {
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

const  AddDriver = mongoose.model('AddDriver',  AddDriverSchema);

export default   AddDriver;