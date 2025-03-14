import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [ItemDelete, setItemToDelete] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/delivery/get`);
        const data = await res.json();

        if (res.ok) {
          setItems(data.Items);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/delivery/driver/${ItemDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== ItemDelete));
        alert("Deleted successfully");
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setFilter([...items]);
    } else {
      const filteredData = items.filter(
        (item) =>
          item.name && item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilter(filteredData);
    }
  }, [query, items]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Driver Management Report", 10, 10);
    doc.autoTable({
      head: [["Name", "Address", "Age", "Driver ID", "Contact"]],
      body: items.map((item) => [
        item.name,
        item.address,
        item.age,
        item.Id,
        item.contact,
      ]),
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak",
        cellWidth: "wrap",
      },
    });
    doc.save("DriverManagementReport.pdf");
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl text-gray-800 mb-6">Manage Drivers</h1>
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between mb-6">
          <Link to="/addDriver">
            <button className="btn-primary">Add Driver</button>
          </Link>
          <button className="btn-primary" onClick={generatePDF}>
            Generate Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Driver Name</th>
                <th className="px-4 py-2 text-left">Address</th>
                <th className="px-4 py-2 text-left">Age</th>
                <th className="px-4 py-2 text-left">Driver ID</th>
                <th className="px-4 py-2 text-left">Contact</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filter.length > 0 ? (
                filter.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{item.name}</td>
                    <td className="border px-4 py-2">{item.address}</td>
                    <td className="border px-4 py-2">{item.age}</td>
                    <td className="border px-4 py-2">{item.Id}</td>
                    <td className="border px-4 py-2">{item.contact}</td>
                    <td className="border px-4 py-2">
                      <Link
                        to={`/Driver/${item._id}`}
                        className="text-blue-500 hover:underline mr-4"
                      >
                        <button className="btn-secondary">Edit</button>
                      </Link>
                      <button
                        className="btn-danger"
                        onClick={() => {
                          setItemToDelete(item._id);
                          handleDeleteUser();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border px-4 py-2" colSpan="6">
                    No drivers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
