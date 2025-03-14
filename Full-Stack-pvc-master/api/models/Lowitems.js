import mongoose from 'mongoose';

const LowitemSchema = new mongoose.Schema(
  {
  
   
    contactN: {
      type: Number,
      required: true,
    },
    wantdate: {
        type: String,
        required: true,
      },
      desc: {
        type: String,
        required: true,
      },

    
      
     
   
    
    
  },
  { timestamps: true }
);

const Lowitem = mongoose.model('Lowitem', LowitemSchema);

export default Lowitem;