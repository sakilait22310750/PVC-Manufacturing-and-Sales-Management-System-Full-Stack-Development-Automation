import express from "express";
import {
    addDriver,
  currentdriver,
 
  deletedriver,
  drivercreate,
  getAlldiver,
  updateDriver,
} from "../../controllers/DeliveryManagement/Delivery.controller.js";


const router = express.Router();


router.post("/divcreate", drivercreate);
router.get("/get", getAlldiver);
router.delete("/dirver/:dirverId", deletedriver);
router.put("/addriver/:id", addDriver);
router.put("/updatedriver/:DId", updateDriver);
router.get('/getformm/:customerId', currentdriver);


export default router;