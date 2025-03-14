import React from "react";
import { Link, useAsyncError } from "react-router-dom";
import { useSelector } from "react-redux";

export default function navBar() {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="bg-gradient-to-b from-blue-300 to-blue-400">
      <div className=" flex justify-between items-center    gap-10 ml-auto p-3 max-w-screen-lg">
        <ul className="flex gap-20">
          {currentUser && currentUser.supplier && (
            <>
              <Link to="/addverView">
                <h1 className="font-serif text-slate-800 text-xl ">
                  {" "}
                  Advertisement
                </h1>
              </Link>
            </>
          )}
          {currentUser && currentUser.employee && (
            <>
              <Link to="/salary">
                <h1 className="font-serif text-slate-800 text-xl ">Leave</h1>
              </Link>
            </>
          )}

          {currentUser &&
            (currentUser.salesmanger ||
              currentUser.inventrmanager ||
              currentUser.deliverymanager ||
              currentUser.suppliermanager ||
              currentUser.employemanager) && (
              <>
                <Link to="/dashbord">
                  <h1 className="font-serif text-slate-800 text-xl ">
                    Dashboard
                  </h1>
                </Link>
              </>
            )}

          {currentUser ? (
            <>
              <Link to="/">
                <li className="font-serif text-slate-800 text-xl  ">Home</li>
              </Link>

              <Link to="/cart">
                <h1 className="font-serif text-slate-800 text-xl ">My Cart</h1>
              </Link>
              <Link to="/Uorder">
                <h1 className="font-serif text-slate-800 text-xl">My Order</h1>
              </Link>

              <Link to={"/profile"}>
                <img
                  src={currentUser.profilePicture}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              </Link>
            </>
          ) : (
            <Link to="/sign-in">
              <li className="font-serif text-slate-1800 text-xl ml-57 ">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </div>
  );
}
