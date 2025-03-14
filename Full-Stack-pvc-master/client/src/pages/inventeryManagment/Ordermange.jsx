import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Order() {
  const { currentUser } = useSelector((state) => state.user);
  const CurrentuserId = currentUser ? currentUser._id : null;
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setfilter] = useState([]);

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

  //search funtion
  useEffect(() => {
    if (query.trim() === "") {
      // If the query is empty, display all data
      setfilter([...orderDetailsList]);
    } else {
      // If there's a query, filter the data
      const filteredData = orderDetailsList.filter(
        (order) =>
          order.name && order.name.toLowerCase().includes(query.toLowerCase())
      );
      setfilter(filteredData);
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
    <div className="container mx-auto py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-md mr-4 focus:outline-none"
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none mr-4"
              onClick={generateReport}
            >
              Generate Report
            </button>
            <Link to="/outofstock">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none">
                OutofStock
              </button>
            </Link>
          </div>
        </div>

        {filter && filter.length > 0 ? (
          filter.map((order, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md mb-8">
              {/* Order details */}
              <div className="p-6">
                {/* Order summary */}
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    Order {index + 1} Details
                  </h2>
                  <p className="text-gray-600">
                    Date:{" "}
                    {moment(order.updatedAt).format("YYYY-MM-DD hh:mm:ss a")}
                  </p>
                </div>

                {/* Customer details */}
                <div className="mb-4">
                  <p className="font-semibold">Customer Name:</p>
                  <p>{order.name}</p>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <p className="font-semibold">Items:</p>
                  {order.Items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <p className="mr-4">{item.name}</p>
                      <p className="text-gray-600">Price: Rs. {item.price}</p>
                      <p className="ml-auto">Quantity: {item.quantity}</p>
                    </div>
                  ))}
                </div>

                {/* Total Price */}
                <p className="font-semibold">
                  Total Price: Rs. {order.totalPrice}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No orders found.</p>
        )}
      </div>
    </div>
  );
}
