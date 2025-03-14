import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function OrderDriver() {
  const { currentUser } = useSelector((state) => state.user);
  const customerId = currentUser ? currentUser._id : null;
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState([]);

  // Fetch order details
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/Inventry/getcurrent/${customerId}`);
        const data = await response.json();

        if (data.length > 0) {
          setOrderDetailsList(data);
        } else {
          setOrderDetailsList([]);
        }
      } catch (error) {
        console.error("Error fetching order data:", error);
      }
    };

    fetchData();
  }, []);

  // Search function
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setFilter([...orderDetailsList]);
    } else {
      // If there's a query, filter the data
      const filteredData = orderDetailsList.filter(
        (order) =>
          order.name && order.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilter(filteredData);
    }
  }, [query, orderDetailsList]);

  // Function to generate PDF report
  const generateReport = () => {
    const doc = new jsPDF();

    let yPos = 20;

    filter.forEach((order, index) => {
      doc.setFontSize(12);
      doc.text(`Order ${index + 1} Details`, 10, yPos);

      yPos += 10;
      doc.setFontSize(10);
      doc.text(`Phone Number: ${order.phoneN}`, 10, yPos);
      yPos += 10;
      doc.text(`Total Price: Rs. ${order.totalPrice}`, 10, yPos);

      yPos += 10;
      doc.text(`User ID: ${order.customerId}`, 10, yPos);
      yPos += 10;
      doc.text(
        `Date: ${moment(order.updatedAt).format("YYYY-MM-DD hh:mm:ss a")}`,
        10,
        yPos
      );
      yPos += 10;
      doc.text(`Address: ${order.address}`, 10, yPos);
      yPos += 10;
      doc.text(`Name: ${order.name}`, 10, yPos);

      yPos += 10;
      doc.text(`Driver Details`, 10, yPos);
      yPos += 10;
      doc.text(`DriverName: ${order.Drivername}`, 10, yPos);
      yPos += 10;
      doc.text(`Age: ${order.Age}`, 10, yPos);
      yPos += 10;
      doc.text(`Experience: ${order.ExprinceD}`, 10, yPos);
      yPos += 10;
      doc.text(`Contact: ${order.Contact}`, 10, yPos);

      yPos += 10;
      doc.text(`Items`, 10, yPos);
      yPos += 10;

      // Table Header
      const headers = ["Item Name", "Price", "Quantity"];
      const tableData = order.Items.map((item) => [
        item.name,
        `Rs.${item.price}`,
        item.quantity,
      ]);

      doc.autoTable({
        startY: yPos,
        head: [headers],
        body: tableData,
        theme: "plain",
      });

      yPos = doc.autoTable.previous.finalY + 20;
    });

    doc.save("order_report.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            Order History
          </h1>
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={generateReport}
            >
              Generate Report
            </button>
          </div>
        </div>
        <div className="space-y-8">
          {filter.length > 0 ? (
            filter.map((order, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-4"
              >
                <h2 className="text-xl font-semibold mb-4">
                  Order {index + 1} Details
                </h2>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div>
                    <p className="font-semibold">Phone Number:</p>
                    <p>{order.phoneN}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Total Price:</p>
                    <p>Rs. {order.totalPrice}</p>
                  </div>
                  <div>
                    <p className="font-semibold">User ID:</p>
                    <p>{order.customerId}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Date:</p>
                    <p>
                      {moment(order.updatedAt).format("YYYY-MM-DD hh:mm:ss a")}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">Address:</p>
                    <p>{order.address}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Name:</p>
                    <p>{order.name}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Driver Details</h3>
                  <p className="text-red-700">Wait a few time</p>
                  <div className="flex flex-wrap gap-4 mt-2">
                    <div>
                      <p className="font-semibold">DriverName:</p>
                      <p>{order.Drivername}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Age:</p>
                      <p>{order.Age}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Experience:</p>
                      <p>{order.ExprinceD}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Contact:</p>
                      <p>{order.Contact}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Items</h3>
                  <div className="space-y-2">
                    {order.Items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex justify-between items-center"
                      >
                        <p>{item.name}</p>
                        <p>Rs. {item.price}</p>
                        <p>Order Items - {item.quantity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No orders found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
