import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function OrderDriver() {
  const { currentUser } = useSelector((state) => state.user);
  const CurrentuserId = currentUser ? currentUser._id : null;
  const [orderDetailsList, setOrderDetailsList] = useState([]);
  const [query, setQuery] = useState("");

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

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="max-w-4xl w-full p-8 bg-white rounded shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Order History</h1>

        {orderDetailsList.length > 0 ? (
          orderDetailsList.map((order, index) => (
            <div key={index} className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Order {index + 1} Details
              </h2>

              <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                  <p className="font-semibold text-gray-700">Phone Number:</p>
                  <p className="ml-2 text-gray-800">{order.phoneN}</p>
                </div>

                <div className="flex items-center">
                  <p className="font-semibold text-gray-700">Total Price:</p>
                  <p className="ml-2 text-gray-800">Rs. {order.totalPrice}</p>
                </div>

                <div className="flex items-center">
                  <p className="font-semibold text-gray-700">User ID:</p>
                  <p className="ml-2 text-gray-800">{order.customerId}</p>
                </div>

                <div className="flex items-center">
                  <p className="font-semibold text-gray-700">Date:</p>
                  <p className="ml-2 text-gray-800">
                    {moment(order.updatedAt).format("YYYY-MM-DD hh:mm:ss a")}
                  </p>
                </div>

                <div className="flex items-center">
                  <p className="font-semibold text-gray-700">Address:</p>
                  <p className="ml-2 text-gray-800">{order.address}</p>
                </div>

                <div className="flex items-center">
                  <p className="font-semibold text-gray-700">Name:</p>
                  <p className="ml-2 text-gray-800">{order.name}</p>
                </div>

                <div className="text-xl font-bold">Driver Details</div>
                <div className="text-red-700 text-sm">Wait few time</div>

                <div className="flex items-center">
                  <p className="font-semibold text-gray-700">Driver Name:</p>
                  <p className="ml-2 text-gray-800">{order.Drivername}</p>
                </div>

                <div className="flex items-center">
                  <p className="font-semibold text-gray-700">Age:</p>
                  <p className="ml-2 text-gray-800">{order.Age}</p>
                </div>

                <div className="flex items-center">
                  <p className="font-semibold text-gray-700">Experience:</p>
                  <p className="ml-2 text-gray-800">{order.ExprinceD}</p>
                </div>

                <div className="flex items-center">
                  <p className="font-semibold text-gray-700">Contact:</p>
                  <p className="ml-2 text-gray-800">{order.Contact}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mt-4">Items</h2>
                  {order.Items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center">
                      <p className="font-semibold text-gray-700 mr-2">
                        {item.name}
                      </p>
                      <p className="text-gray-800">Rs.{item.price}</p>
                      <p className="ml-2 text-gray-800">
                        Order Items-{item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center mt-6">
                  <Link to={`/orderaddDriver/${order._id}`}>
                    <button className="w-96 h-10 bg-blue-700 text-white rounded-lg hover:opacity-50 text-md font-semibold">
                      Add Driver
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-lg font-semibold text-gray-700">
            No orders found.
          </p>
        )}
      </div>
    </div>
  );
}
