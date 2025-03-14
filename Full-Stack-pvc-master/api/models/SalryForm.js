import mongoose from 'mongoose';

const salrySchema = new mongoose.Schema(
  {
    EmployeId: {
        type: String,
        required: true,
        
      },
    name: {
      type: String,
      required: true,
      
    },
    
    phone: {
      type: String,
      required: true,
    },
    
      desc: {
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

const  salry = mongoose.model('salry', salrySchema);

export default salry;