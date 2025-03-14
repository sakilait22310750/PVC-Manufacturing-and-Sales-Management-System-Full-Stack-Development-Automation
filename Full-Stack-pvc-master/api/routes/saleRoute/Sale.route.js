import express from "express";
import {
  Addcart,
  Palceorder,
  Removeproduct,
  createsale,
  deleteItemss,
  deletesale,
  getCurrentCartItem,
  getsale,
  updatesale,
} from "../../controllers/saleMangement/sale.controller.js";

const router = express.Router();

router.post("/productcreate",  createsale);
router.get("/getallproduct",  getsale);
router.put("/Items/:ItmesId",  updatesale);
router.delete("/Pdelete/:ItemssId",  deletesale);
router.post("/addcart",  Addcart);
router.get("/Itemsss/:customerId",  getCurrentCartItem);
router.delete("/deleteee/:productId",  Removeproduct);
router.post("/orderplace",  Palceorder);
router.delete("/deleteitem/:customerId",  deleteItemss);

export default router;
