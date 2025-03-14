import express from "express";
import {
  createsalryForm,
  currentuserform,
  deleteEmployee,
  formReject,
  getAllcartt,
  getemployee,
  

} from "../../controllers/EmployeeMangement/Employe.controller.js";


const router = express.Router();

router.get("/employee", getemployee);
router.delete("/empl/:EmployeId", deleteEmployee);
router.post("/createform", createsalryForm);
router.get('/getall', getAllcartt);
router.get('/getcurrentform/:EmployeId', currentuserform);
router.put('/formReject/:FormmId/status', formReject);




export default router;