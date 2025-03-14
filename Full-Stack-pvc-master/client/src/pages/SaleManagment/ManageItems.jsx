import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function DashUsers() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null); // Add state for itemToDelete

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch(`/api/Sale/getallproduct`);
        const data = await res.json();

        if (res.ok) {
          setItems(data.Product);
          setFilteredItems(data.Product);
        } else {
          console.error(`Failed to fetch items: ${res.status}`);
        }
      } catch (error) {
        console.error(`Error fetching items: ${error.message}`);
      }
    };

    fetchItems();
  }, []);

  const handleDeleteUser = async () => {
    try {
      const res = await fetch(`/api/Sale/Pdelete/${itemToDelete}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        setItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete)
        );
        setFilteredItems((prevItems) =>
          prevItems.filter((item) => item._id !== itemToDelete)
        );
        alert("Deleted successfully");
      } else {
        console.error(`Failed to delete item: ${data.message}`);
      }
    } catch (error) {
      console.error(`Error deleting item: ${error.message}`);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredItems([...items]);
    } else {
      const filteredData = items.filter(
        (item) =>
          item.name && item.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredItems(filteredData);
    }
  }, [query, items]);

  const generateProductPDF = () => {
    const doc = new jsPDF();
    doc.text("Product Management Report", 10, 10);
    doc.autoTable({
      head: [["Item Name", "Price", "Size"]],
      body: items.map((item) => [item.name, `Rs.${item.price}`, item.quantity]),
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak",
        cellWidth: "wrap",
      },
    });
    doc.save("ProductManagementReport.pdf");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">
          Manage Products
        </h1>
      </div>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200 border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Item Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Size
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Edit
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                Delete
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredItems.map((item) => (
              <tr key={item._id} className="bg-white">
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">Rs.{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.image}
                    className="w-20 h-20 object-cover rounded-md"
                    alt="Product Image"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap max-w-[200px] overflow-hidden overflow-ellipsis">
                  {item.quantity}mm
                </td>
                <td className="px-6 py-4 whitespace-nowrap max-w-[200px] overflow-hidden overflow-ellipsis">
                  {item.desc.length > 50
                    ? `${item.desc.slice(0, 50)}...`
                    : item.desc}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/update/${item._id}`}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => {
                      setItemToDelete(item._id);
                      handleDeleteUser();
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredItems.length === 0 && (
          <p className="text-center py-4 text-gray-500">
            No products to manage.
          </p>
        )}
      </div>
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          onClick={generateProductPDF}
        >
          Generate Report
        </button>
      </div>
    </div>
  );
}
