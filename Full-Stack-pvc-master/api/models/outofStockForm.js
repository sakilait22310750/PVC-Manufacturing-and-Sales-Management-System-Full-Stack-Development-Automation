import mongoose from 'mongoose';

const productoutSchema = new mongoose.Schema(
  {
    productlist: {
      type: String,
      required: true,
      
    },
    
   
    wantdate: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        enum: ['processing', 'Approve', 'Reject'], 
        default: 'processing' 
    }
      
     
   
    
    
  },
  { timestamps: true }
);

const productout = mongoose.model('productout', productoutSchema);

export default productout;