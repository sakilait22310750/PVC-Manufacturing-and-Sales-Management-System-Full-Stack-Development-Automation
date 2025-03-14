import mongoose from 'mongoose';




const itemSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  image: {
    type: String,
    required: true,
  },
  quantity: {
      type: Number,
      required: true
  }
});


const placeordSchema = new mongoose.Schema(
  {

    customerId: {
        type: String,
        required: true,
       
      },
  
    
      Items: [itemSchema], 

      name: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      phoneN: {
        type: String,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
      Length: {
        type: Number,
        required: true,
      },

      Drivername: {
        type: String,
      
       
      },
      Age: {
        type: String,
       
      },
      ExprinceD: {
        type: Number, 
        
      },
      Contact: {
        type: Number,
        
      },
     
   
    
    
    
  },
  { timestamps: true }
);

const placeord = mongoose.model('placeord', placeordSchema);

export default placeord;