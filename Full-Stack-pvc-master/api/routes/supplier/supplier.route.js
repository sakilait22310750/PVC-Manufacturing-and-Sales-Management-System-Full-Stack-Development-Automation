import express from "express";
import { verifyToken } from "../../utils/VerfiyUser.js";
import {
    LowItemInfrom,
  createAddform,
  deletesupplier,
  getAddform,
  getAlladvertisment,
  getAllcartt,
  getsupplier,
  updatestock,
} from "../../controllers/supplierManger/supplier.controller.js";

const router = express.Router();

router.get("/getallout", getAllcartt);
router.post("/advertisment", LowItemInfrom);
router.get("/outstock", getAlladvertisment);
router.get("/supplier", getsupplier);
router.delete("/sup/:supplierId",deletesupplier);
router.put("/supp/:stockId",updatestock);
router.post("/adver", createAddform);
router.get("/getadd", getAddform);



export default router;