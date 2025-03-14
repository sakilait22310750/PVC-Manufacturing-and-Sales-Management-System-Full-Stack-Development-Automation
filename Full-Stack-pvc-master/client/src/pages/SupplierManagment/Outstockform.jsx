import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);

  const [form, setForm] = useState([]);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await fetch(`/api/supplier/getallout`);
        const data = await res.json();
        console.log("Fetched data:", data); // Debugging line

        if (res.ok) {
          const filteredItems = data.Items.map((item) => {
            if (item.status === "processing") {
              item.status = "Processing";
            }
            return item;
          });
          setForm(filteredItems);
        }
      } catch (error) {
        console.log("Error fetching data:", error.message); // Debugging line
      }
    };

    fetchCat();
  }, []);

  const handleStatusChange = async (FormmId, currentStatus) => {
    try {
      let newStatus;
      switch (currentStatus) {
        case "Processing":
          newStatus = "Approval";
          break;
        case "Approval":
          newStatus = "Reject";
          break;
        case "Reject":
          newStatus = "Processing";
          break;
        default:
          newStatus = "Processing"; // Default to "Processing" if status is not recognized
      }

      const res = await fetch(`/api/Inventry/adopp/${FormmId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setForm(
          form.map((cat) => {
            if (cat._id === FormmId) {
              return { ...cat, status: newStatus };
            }
            return cat;
          })
        );
      }
    } catch (error) {
      console.log("Error updating status:", error.message); // Debugging line
    }
  };

  const getStatusButtonClass = (status) => {
    switch (status) {
      case "Processing":
        return "bg-yellow-500";
      case "Approval":
        return "bg-green-500";
      case "Reject":
        return "bg-red-500";
      default:
        return "bg-yellow-500"; // Default to "Processing" style
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center items-center gap-4 mb-8">
        <Link to="/addvertisment">
          <button className="w-40 h-10 bg-blue-700 text-white rounded-lg hover:opacity-50 text-md font-serif">
            Advertisement
          </button>
        </Link>
        <Link to="/supply">
          <button className="w-40 h-10 bg-blue-700 text-white rounded-lg hover:opacity-50 text-md font-serif">
            Supply Details
          </button>
        </Link>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-center gap-6">
          {form && form.length > 0 ? (
            <>
              {form.slice(0, showMore ? form.length : 2).map((cat) => (
                <div
                  key={cat._id}
                  className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 mb-6"
                >
                  <div className="text-center">
                    <h1 className="text-xl text-slate-700 font-serif mb-4">
                      Product List
                    </h1>
                    <p className="text-gray-700 mb-4">{cat.productlist}</p>
                    {/* <p className="text-gray-700 text-lg font-semibold mb-2">
                      Request date: {cat.outofstockdate}
                    </p> */}
                    <p className="text-gray-700 text-lg font-semibold mb-4">
                      Required day: {cat.wantdate}
                    </p>
                    <button
                      className={`hover:opacity-90 rounded-lg w-40 text-white py-2 ${getStatusButtonClass(
                        cat.status
                      )}`}
                      onClick={() => handleStatusChange(cat._id, cat.status)}
                    >
                      {cat.status}
                    </button>
                  </div>
                </div>
              ))}
              {form.length > 2 && (
                <div className="w-full flex justify-center mt-4">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? "Show Less" : "Show More"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-gray-700">You have no items yet</p>
          )}
        </div>
      </div>
    </div>
  );
}
