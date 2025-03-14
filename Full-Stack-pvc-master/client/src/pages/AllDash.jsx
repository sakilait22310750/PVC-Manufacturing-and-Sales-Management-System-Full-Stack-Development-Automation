import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function AllDash() {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const [Form, setForm] = useState([]);
  const [Driver, setDriver] = useState([]);
  const [Employee, setEmployee] = useState([]);

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const res = await fetch(`/api/Sale/getallproduct`);
        const data = await res.json();

        if (res.ok) {
          setItems(data.Product);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchitems();
  }, []);

  // Fetch order details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/Inventry/getallorderdetials`);
        const data = await response.json();
        console.log(data);

        if (data.Items.length > 0) {
          setOrderDetailsList(data.Items);
        } else {
          setOrderDetailsList([]);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const res = await fetch(`/api/supplier/supplier`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setForm(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchitems();
  }, []);

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const res = await fetch(`/api/delivery/get`);
        const data = await res.json();

        if (res.ok) {
          setDriver(data.Items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchitems();
  }, []);

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const res = await fetch(`/api/Empl/employee`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setEmployee(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchitems();
  }, []);

  return (
    <div className="mb-72">
      <div className="flex justify-center items-center mt-6  ">
        <h1 className="font-serif text-4xl text-slate-800">Dashbord</h1>
      </div>

      <div className="flex justify-center items-center mt-6 gap-4">
        {currentUser && currentUser.salesmanger && (
          <>
            <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
              <div className="flex justify-center items-center mt-14">
                <Link to="/create-post">
                  <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                    Add Products
                  </h1>
                </Link>
              </div>
            </div>

            <Link to="/manage">
              <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
                <div className="flex justify-center items-center mt-14">
                  <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                    Manage Product
                  </h1>
                </div>
              </div>
            </Link>

            <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
              <div className="flex justify-center items-center mt-14">
                <h1 className="text-2xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                  All Item count
                </h1>
              </div>
              <div className="flex justify-center items-center mt-2">
                <h1 className="text-5xl font-serif text-slate-700">
                  {items.length}
                </h1>
              </div>
            </div>
          </>
        )}

        {currentUser && currentUser.inventrmanager && (
          <>
            <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
              <div className="flex justify-center items-center mt-14">
                <Link to="/order">
                  <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                    Manage Order
                  </h1>
                </Link>
              </div>
            </div>

            <Link to="/outOfstockview">
              <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
                <div className="flex justify-center items-center mt-14">
                  <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                    Out Of Stock request
                  </h1>
                </div>
              </div>
            </Link>

            <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
              <div className="flex justify-center items-center mt-14">
                <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                  All Orders
                </h1>
              </div>
              <div className="flex justify-center items-center mt-2">
                <h1 className="text-5xl font-serif text-slate-700">
                  {orderDetailsList.length}
                </h1>
              </div>
            </div>
          </>
        )}

        {currentUser && currentUser.deliverymanager && (
          <>
            <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
              <div className="flex justify-center items-center mt-14">
                <Link to="/mangeDriver">
                  <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                    Manage Driver
                  </h1>
                </Link>
              </div>
            </div>

            <Link to="/orderDriver">
              <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
                <div className="flex justify-center items-center mt-14">
                  <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                    Add Driver
                  </h1>
                </div>
              </div>
            </Link>

            <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
              <div className="flex justify-center items-center mt-14">
                <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                  All Drivers
                </h1>
              </div>
              <div className="flex justify-center items-center mt-2">
                <h1 className="text-5xl font-serif text-slate-700">
                  {Driver.length}
                </h1>
              </div>
            </div>
          </>
        )}

        {currentUser && currentUser.suppliermanager && (
          <>
            <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
              <div className="flex justify-center items-center mt-14">
                <Link to="/out">
                  <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                    Low Product
                  </h1>
                </Link>
              </div>
            </div>

            <Link to="/manageSupplier">
              <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
                <div className="flex justify-center items-center mt-14">
                  <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                    Suppliers
                  </h1>
                </div>
              </div>
            </Link>

            <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
              <div className="flex justify-center items-center mt-14">
                <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                  All Supplier
                </h1>
              </div>
              <div className="flex justify-center items-center mt-2">
                <h1 className="text-5xl font-serif text-slate-700">
                  {Form.length}
                </h1>
              </div>
            </div>
          </>
        )}

        {currentUser && currentUser.employemanager && (
          <>
            <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
              <div className="flex justify-center items-center mt-14">
                <Link to="/employeManage">
                  <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                    Manage Employee
                  </h1>
                </Link>
              </div>
            </div>

            <Link to="/managesalry">
              <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
                <div className="flex justify-center items-center mt-14">
                  <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                    Leave Request
                  </h1>
                </div>
              </div>
            </Link>

            <div className="w-[300px] h-40 bg-slate-200 rounded-lg border whitespace-nowrap shadow-lg">
              <div className="flex justify-center items-center mt-14">
                <h1 className="text-4xl font-serif text-slate-700 hover:text-white hover:cursor-pointer ">
                  All Employee
                </h1>
              </div>
              <div className="flex justify-center items-center mt-2">
                <h1 className="text-5xl font-serif text-slate-700">
                  {Employee.length}
                </h1>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center items-center gap-4"></div>
    </div>
  );
}
