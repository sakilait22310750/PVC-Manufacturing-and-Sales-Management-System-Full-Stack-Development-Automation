import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);
  const [form, setForm] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const res = await fetch(`/api/Empl/getall`);
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

  const handleStatusChange = async (formId, currentStatus) => {
    try {
      let newStatus;
      switch (currentStatus) {
        case "processing":
          newStatus = "Approval";
          break;
        case "Approval":
          newStatus = "Reject";
          break;
        case "Reject":
          newStatus = "processing";
          break;
        default:
          newStatus = "processing"; // Default to "Processing" if status is not recognized
      }

      const res = await fetch(`/api/Empl/formReject/${formId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        setForm(
          form.map((cat) => {
            if (cat._id === formId) {
              return { ...cat, status: newStatus };
            }
            return cat;
          })
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Feedback Report", 10, 10);
    doc.autoTable({
      head: [["Employee Name", "Phone", "Status", "Description"]],
      body: form.map((item) => [item.name, item.phone, item.status, item.desc]),
      styles: {
        cellPadding: 1,
        fontSize: 10,
        lineHeight: 1.2,
        overflow: "linebreak",
        cellWidth: "wrap",
      },
    });
    doc.save("LeaveReport.pdf");
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {form && form.length > 0 ? (
            <>
              {form.slice(0, showMore ? form.length : 2).map((cat) => (
                <div
                  key={cat._id}
                  className="w-full md:w-3/4 lg:w-1/2 bg-white shadow-md rounded-lg overflow-hidden mb-8"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                      Leave Request
                    </h2>
                    <p className="text-gray-700 mb-4">{cat.desc}</p>
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-600">
                          Employee Name:
                        </span>
                        <span className="text-gray-800">{cat.name}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-600">
                          Phone Number:
                        </span>
                        <span className="text-gray-800">{cat.phone}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-600">
                          Current Status:
                        </span>
                        <span
                          className={`px-2 py-1 rounded-lg text-white font-semibold ${
                            cat.status === "processing"
                              ? "bg-yellow-500"
                              : cat.status === "Approval"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        >
                          {cat.status}
                        </span>
                      </div>
                      <div className="flex justify-center mt-4">
                        <button
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
                          onClick={() =>
                            handleStatusChange(cat._id, cat.status)
                          }
                        >
                          Change Status
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <p className="text-gray-600">You have no items yet</p>
          )}
        </div>

        {!showMore && form.length > 2 && (
          <div className="flex justify-center mt-8">
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
              onClick={() => setShowMore(true)}
            >
              Show More
            </button>
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
            onClick={(e) => {
              e.preventDefault();
              generatePDF();
            }}
          >
            Generate Report
          </button>
        </div>
      </div>
    </div>
  );
}
