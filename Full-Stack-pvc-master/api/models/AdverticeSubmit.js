import mongoose from 'mongoose';

const addSchema = new mongoose.Schema(
  {

    Email: {
        type: String,
        required: true,
      },


    

    desc: {
      type: String,
      required: true,
      
    },
    type: {
      type: String,
      required: true,
      
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
        type: Number,
        required: true,
      },
     
      wantdate: {
        type: String,
       
      },
      
    
    
      
     
   
    
    
  },
  { timestamps: true }
);

const add = mongoose.model('add', addSchema);

export default add;