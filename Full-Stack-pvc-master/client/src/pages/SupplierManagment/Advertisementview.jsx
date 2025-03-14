import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Feedback() {
  const { currentUser } = useSelector((state) => state.user);
  const [feedbackItems, setFeedbackItems] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch("/api/supplier/outstock");
        const data = await response.json();

        if (response.ok) {
          setFeedbackItems(data.Items);
        } else {
          console.error("Error fetching feedback:", data.message); // Handle errors gracefully
        }
      } catch (error) {
        console.error("Error fetching feedback:", error.message);
      }
    };

    fetchFeedback();
  }, []);

  return (
    <div className="feedback-container flex justify-center">
      <div className="feedback-wrapper flex flex-wrap justify-center">
        {feedbackItems.length > 0 ? (
          feedbackItems.map((item) => (
            <div
              key={item._id}
              className="feedback-card w-[1000px] h-[400px] mt-10 mb-10 rounded shadow-xl bg-white"
            >
              <div className="feedback-header px-6 py-4 flex justify-between items-center border-b border-gray-200">
                <h1 className="text-xl text-slate-700 font-serif whitespace-nowrap">
                  Advertisement
                </h1>
                <div className="text-gray-500 text-sm">ID: {item._id}</div>
              </div>

              <div className="feedback-content px-6 py-4">
                <p className="text-gray-700 text-base break-words">
                  {item.desc}
                </p>

                <div className="feedback-details flex justify-between mt-6">
                  <div className="text-gray-700 text-xl max-w-[200px] whitespace-nowrap break-words">
                    Contact Number: {item.contactN}
                  </div>
                  <div className="text-gray-700 text-xl max-w-[200px] whitespace-nowrap break-words">
                    Required Day: {item.wantdate}
                  </div>
                </div>
              </div>

              <div className="feedback-actions flex justify-center items-center mt-8">
                <Link
                  to={`/Advertisment/${item._id}`}
                  className="text-white hover:underline"
                >
                  <button className="bg-blue-500 hover:bg-blue-700 rounded-3xl w-20 h-10">
                    Supply
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            You have no feedback items yet.
          </p>
        )}
      </div>
    </div>
  );
}
