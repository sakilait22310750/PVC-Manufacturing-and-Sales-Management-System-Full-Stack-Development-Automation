import mongoose from 'mongoose';



const itemSchema = new mongoose.Schema({
  name: {
      type: String,
     
  },
  price: {
      type: Number,
    
  },
  image: {
    type: String,
   
  },
  quantity: {
      type: Number,
   
  }
});

const ItemsDelivrySchema = new mongoose.Schema(
  {
    

      customerId: {
          type: String,
       
         
        },
    
      
        Items: [itemSchema], 
  
        name: {
          type: String,
         
        },
        address: {
          type: String,
        
        },
        phoneN: {
          type: Number,
         
        },
        totalPrice: {
          type: Number,
         
        },
        Length: {
          type: Number,
          
        },
     
      

   
    
    
  },
  { timestamps: true }
);

const ItemsDelivry = mongoose.model('ItemsDelivry', ItemsDelivrySchema);

export default ItemsDelivry;