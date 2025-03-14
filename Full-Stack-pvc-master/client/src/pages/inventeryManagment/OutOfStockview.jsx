import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [form, setForm] = useState([]);
  const [itemToDelete, setItemToDelete] = useState("");

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await fetch(`/api/supplier/getallout`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setForm(data.Items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchCat();
  }, []);

  const handleDeleteUser = async (catId) => {
    try {
      const res = await fetch(`/api/Inventry/formdelete/${catId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) => prev.filter((cat) => cat._id !== catId));
        alert("Deleted");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const changeStatusToProcessing = async (catId) => {
    try {
      const res = await fetch(`/api/Inventry/changestatus/${catId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: "Processing" }),
      });
      const data = await res.json();
      if (res.ok) {
        setForm((prev) =>
          prev.map((cat) =>
            cat._id === catId ? { ...cat, status: "Processing" } : cat
          )
        );
        alert("Status changed to Processing");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="bg-slate-200">
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center">
          <table className="w-full mt-10 mb-10 rounded shadow-xl">
            <thead className="bg-slate-900 text-white">
              <tr>
                <th className="px-6 py-4">Product List</th>
                <th className="px-6 py-4">Request Date</th>
                <th className="px-6 py-4">Required Day</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Edit</th>
                <th className="px-6 py-4">Delete</th>
              </tr>
            </thead>
            <tbody>
              {form.map((cat) => (
                <tr key={cat._id}>
                  <td className="px-6 py-4">{cat.productlist}</td>
                  <td className="px-6 py-4">
                    {moment(cat.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </td>
                  <td className="px-6 py-4">{cat.wantdate}</td>
                  <td className="px-6 py-4">{cat.status}</td>
                  <td className="px-6 py-4">
                    {(cat.status === "processing" ||
                      cat.status === "Processing") && (
                      <Link
                        to={`/stock/${cat._id}`}
                        className="text-white hover:underline"
                      >
                        <button className="bg-slate-900 rounded-xl w-20 h-8 hover:opacity-40">
                          Edit
                        </button>
                      </Link>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteUser(cat._id)}
                      className="bg-red-800 ml-4 rounded-xl w-20 h-8 hover:opacity-40 text-white"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
