import React from "react";
import { useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/userSilce";

export default function Logo() {
  const dispatch = useDispatch();

  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="w-full h-20 bg-gradient-to-b from-blue-800 to-blue-300 flex items-center justify-center text-white text-xl">
      <div className="flex gap-[900px]">
        <div className="text-3xl font-black">MODERN PVC </div>

        <div>
          <button
            onClick={handleSignout}
            className="text-white bg-blue-900 w-24 rounded-lg  text-lg font-serif"
          ></button>
        </div>
      </div>
    </div>
  );
}
