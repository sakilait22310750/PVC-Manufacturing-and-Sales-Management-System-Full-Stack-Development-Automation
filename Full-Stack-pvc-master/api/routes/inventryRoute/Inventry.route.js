import express from "express";
import { verifyToken } from "../../utils/VerfiyUser.js";
import {
  createform,
  deleteform,
  delivery,
 
  getAllorder,
  getCurrentorder,
  updateStatus,
  

} from "../../controllers/inventryMangement/Inventry.controller.js";

const router = express.Router();

router.get("/getallorderdetials", getAllorder);
router.post("/delivery", delivery );
router.post("/outstock", createform );
router.get('/getcurrent/:customerId', getCurrentorder);
router.put('/adopp/:FormId/status', updateStatus);
router.delete('/formdelete/:formmId', deleteform);


export default router;