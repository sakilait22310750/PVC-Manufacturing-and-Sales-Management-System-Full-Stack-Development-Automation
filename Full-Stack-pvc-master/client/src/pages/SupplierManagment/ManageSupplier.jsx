import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [ItemDelete, setItemToDelete] = useState("");
  console.log("sameea", items);
  const [query, setQuery] = useState("");
  const [filter, setfilter] = useState([]);

  useEffect(() => {
    const fetchitems = async () => {
      try {
        const res = await fetch(`/api/supplier/supplier`);
        const data = await res.json();
        console.log(data);

        if (res.ok) {
          setItems(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchitems();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/supplier/sup/${ItemDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== ItemDelete));
        alert("deleted");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Supplier Management Report", 10, 10);
    doc.autoTable({
      head: [["Email", "UserName", "Password", "Delete User"]],
      body: items.map((item) => [
        item.email,
        item.username,
        item.password.replace(/./g, "*"),
        "",
      ]),
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak",
        cellWidth: "wrap",
      },
    });
    doc.save("SupplierManagementReport.pdf");
  };

  //search function
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...items]);
    } else {
      // If there's a query, filter the data
      const filteredData = items.filter(
        (item) =>
          item.username &&
          item.username.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
    }
  }, [query, items]);

  return (
    <div>
      <div className="h-[600px] relative">
        <div className="ml-8 mt-4 mb-5 flex justify-center items-center">
          <form>
            <input
              type="text"
              placeholder="Search... "
              className="w-[300px] h-8 rounded-lg shadow-lg"
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>

        <div className="flex justify-center items-center mt-4 mb-2">
          <h1 className="font-serif text-slate-700 text-3xl ml-2">
            Manage Supplier
          </h1>
        </div>
        <div className="flex justify-center items-center mt-6 gap-4">
          <Link to="/NewSuplier">
            <button className="w-40 h-10 bg-blue-700 text-white rounded-lg hover:opacity-50 text-md font-serif mb-8">
              New Supplier
            </button>
          </Link>

          <button
            className="w-40 h-10 bg-blue-700 ml-8 text-white rounded-lg hover:opacity-50 text-md font-serif mb-8"
            onClick={(e) => {
              e.preventDefault();
              generatePDF();
            }}
          >
            {" "}
            Generate Report
          </button>
        </div>

        <div className="flex justify-center">
          <div className="w-[1200px] h-[300px] rounded-lg border shadow-lg border-white bg-slate-100">
            <div className="max-h-96 overflow-y-auto">
              <div className="table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
                {currentUser.suppliermanager ? (
                  <>
                    <table className="w-full divide-y divide-green-500 shadow-md mx-auto">
                      <thead className="bg-blue-200">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            UserName
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Password
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Edit User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                            Delete User
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {filter && filter.length > 0 ? (
                          filter.map((item) => (
                            <tr
                              key={item._id}
                              className="bg-blue-100 text-black dark:border-black dark:bg-black"
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-black">
                                {item.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-black">
                                {item.username}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-black">
                                <div className="w-16 truncate">
                                  {item.password.replace(/./g, "*")}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <Link
                                  to={`/updatesup/${item._id}`}
                                  className="text-white hover:underline"
                                >
                                  <button className="bg-slate-900 rounded-3xl w-20 h-10 hover:opacity-40">
                                    Edit
                                  </button>
                                </Link>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span
                                  onClick={() => {
                                    setItemToDelete(item._id);
                                    handleDeleteUser();
                                  }}
                                  className="text-white hover:underline cursor-pointer"
                                >
                                  <button className="bg-red-800 rounded-3xl w-20 h-10 hover:opacity-40">
                                    Delete
                                  </button>
                                </span>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td
                              className="px-6 py-4 whitespace-nowrap text-black"
                              colSpan="5"
                            >
                              No users found.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <p>You have no users yet!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
