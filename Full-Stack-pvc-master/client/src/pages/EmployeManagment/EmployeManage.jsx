import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

export default function DashUsers() {
  const { currentUser } = useSelector((state) => state.user);
  const [items, setItems] = useState([]);
  const [ItemDelete, setItemToDelete] = useState("");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/Empl/employee`);
        const data = await res.json();

        if (res.ok) {
          setItems(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/Empl/empl/${ItemDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setItems((prev) => prev.filter((item) => item._id !== ItemDelete));
        alert("User deleted successfully");
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
          item.email && item.email.toLowerCase().includes(query.toLowerCase())
      );
      setFilter(filteredData);
    }
  }, [query, items]);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Employee Management Report", 10, 10);
    doc.autoTable({
      head: [['Email', 'Employee', 'Phone', 'Job Title', 'Salary']],
      body: items.map((item) => [
        item.email,
        item.Name,
        item.phone,
        item.Jobtitle,
        item.Salary,
      ]),
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: 'linebreak',
        cellWidth: 'wrap',
      },
    });
    doc.save("EmployeeManagementReport.pdf");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 p-6">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <style>
          {`
            /* Custom Scrollbar Styling */
            ::-webkit-scrollbar {
              height: 8px;
              width: 8px;
              background: #f1f1f1;
            }

            ::-webkit-scrollbar-thumb {
              background: #888;
              border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
              background: #555;
            }
          `}
        </style>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-700">Manage Employees</h1>
          <div className="space-x-4">
            <Link to="/newemplye">
              <button className="px-6 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
                New Employee
              </button>
            </Link>
            <button
              className="px-6 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition duration-300"
              onClick={generatePDF}
            >
              Generate Report
            </button>
          </div>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by email..."
            className="w-full px-4 py-3 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
          <div className="overflow-x-auto">
            {currentUser.employemanager ? (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gradient-to-r from-blue-600 to-blue-400 text-white">
                  <tr>
                    {["Email", "Username", "Password", "Name", "Address", "Phone", "Gender", "Job Title", "Salary", "Edit", "Delete"].map((header) => (
                      <th key={header} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filter.length > 0 ? (
                    filter.map((item) => (
                      <tr key={item._id} className="hover:bg-gray-100 transition duration-300">
                        <td className="px-6 py-4 whitespace-nowrap">{item.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.username}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="truncate w-20">{item.password.replace(/./g, '*')}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.Name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.Adress}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.phone}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.Gender}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.Jobtitle}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{item.Salary}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/emp/${item._id}`} className="text-indigo-600 hover:text-indigo-900">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 flex items-center justify-center space-x-2">
                              <FaEdit />
                              <span>Edit</span>
                            </button>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setItemToDelete(item._id);
                              handleDeleteUser();
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition duration-300 flex items-center justify-center space-x-2"
                          >
                            <FaTrashAlt />
                            <span>Delete</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="11" className="px-6 py-4 text-center text-gray-500">
                        No employees found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <p className="p-4 text-center text-gray-500">You have no users yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
