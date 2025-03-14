import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import SignUp from "./pages/SignUp";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute";
import OnlysalePrivate from "./components/OnlysalePrivate";
import OnlyInvertryPrivate from "./components/OnlyInvertryPrivate";
import OnlydeliveryPrivate from "./components/OnlydeliveryPrivate";
import OnlySupplierPrivat from "./components/OnlySupplierPrivat";
import OnlyEmployPrivate from "./components/OnlyEmployPrivate";
import CreatePost from "./pages/SaleManagment/CreatePost";
import Alldash from "./pages/AllDash";
import DashProfile from "./components/DashProfile";
import Log from "./components/Log";
import ManageItems from "./pages/SaleManagment/ManageItems";
import Updateitems from "./pages/SaleManagment/Updateitems";
import Cart from "./pages/SaleManagment/Cart";
import Ordermange from "./pages/inventeryManagment/Ordermange";
import OutOfstockform from "./pages/inventeryManagment/OutOfstockform";
import OutOfStockview from "./pages/inventeryManagment/OutOfStockview";
import ManageDriver from "./pages/DeliveryManagment/ManageDriver";
import AddDriver from "./pages/DeliveryManagment/AddDriver";
import OrderDriver from "./pages/DeliveryManagment/OrderDriver";
import OrderAddDriver from "./pages/DeliveryManagment/OrderAddDriver";
import Userorderpage from "./pages/Userorderpage";
import Outstockf from "./pages/SupplierManagment/Outstockform";
import Adverticement from "./pages/SupplierManagment/Adverticement";
import Advertisementview from "./pages/SupplierManagment/Advertisementview";
import ManageSupplier from "./pages/SupplierManagment/ManageSupplier";
import NewSuplier from "./pages/SupplierManagment/NewSuplier";
import EmployeManage from "./pages/EmployeManagment/EmployeManage";
import NewEmplye from "./pages/EmployeManagment/NewEmplye";
import Salary from "./pages/EmployeManagment/Salary";
import MangeSalary from "./pages/EmployeManagment/MangeSalary";
import UserviewRequst from "./pages/EmployeManagment/UserviewRequst";
import Updatesup from "./pages/SupplierManagment/Updatesup";
import UpdateOutStock from "./pages/inventeryManagment/UpdateOutStock";
import DriverUpdate from "./pages/DeliveryManagment/DriverUpdate";
import UpdateEmp from "./pages/EmployeManagment/UpdateEmp";
import Adverticementinform from "./pages/SupplierManagment/Adverticementinform";
import ViewSupply from "./pages/SupplierManagment/ViewSupply";





export default function App() {
  return (
    <BrowserRouter>
        <Log/>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
        <Route path="/dashbord" element={<Alldash />} />
        <Route path="/profile" element={<DashProfile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/Uorder" element={<Userorderpage />} />
        <Route path="/addverView" element={<Advertisementview />} />
        <Route path="/salary" element={<Salary/>} />
        <Route path="/userview" element={<UserviewRequst/>} />
        <Route path="/Advertisment/:addId" element={<Adverticementinform/>} />
        </Route>

        <Route element={<OnlyAdminPrivateRoute />}>
          
         
        </Route>
        <Route element={<OnlysalePrivate />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/manage" element={<ManageItems />} />
          <Route path="/update/:ItmesId" element={<Updateitems />} />
        </Route>


        <Route element={<OnlyInvertryPrivate />}>
        <Route path="/order" element={<Ordermange />} />
        <Route path="/outofstock" element={<OutOfstockform />} />
        <Route path="/outOfstockview" element={<OutOfStockview />} />
        <Route path="/stock/:stockId" element={<UpdateOutStock />} />
        
          
         
        </Route>

        <Route element={<OnlydeliveryPrivate />}>
        <Route path="/mangeDriver" element={<ManageDriver />} />
        <Route path="/addDriver" element={<AddDriver />} />
        <Route path="/orderDriver" element={<OrderDriver />} />
        <Route path="/orderaddDriver/:id" element={<OrderAddDriver />} />
        <Route path="/Driver/:driverid" element={<DriverUpdate />} />
         
          </Route>


          <Route element={<OnlySupplierPrivat />}>
          <Route path="/out" element={<Outstockf/>} />
          <Route path="/addvertisment" element={<Adverticement/>} />
          <Route path="/manageSupplier" element={<ManageSupplier/>} />
          <Route path="/NewSuplier" element={<NewSuplier/>} />
          <Route path="/updatesup/:supId" element={<Updatesup/>} />
          <Route path="/supply" element={<ViewSupply/>} />
         
          </Route>


          <Route element={<OnlyEmployPrivate />}>
          <Route path="/employeManage" element={<EmployeManage/>} />
          <Route path="/newemplye" element={<NewEmplye/>} />
         
          <Route path="/managesalry" element={<MangeSalary/>} />
          <Route path="/emp/:EmpId" element={<UpdateEmp/>} />
         
         
          
         
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
