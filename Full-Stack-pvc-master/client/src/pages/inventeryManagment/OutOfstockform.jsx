import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/Inventry/outstock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("Successfully submitted");
        navigate(`/outOfstockview`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handleDateChange = (e) => {
    const inputDate = e.target.value.trim();
    const currentDate = new Date();
    const selectedDate = new Date(inputDate);

    if (isNaN(selectedDate.getTime()) || selectedDate < currentDate) {
      setPublishError("Please enter a valid date (future) in mm/dd/yy format.");
    } else {
      const formattedDate = `${
        selectedDate.getMonth() + 1
      }/${selectedDate.getDate()}/${selectedDate.getFullYear()}`;
      setFormData({ ...formData, wantdate: formattedDate });
      setPublishError(null);
    }
  };

  return (
    <div className=" ">
      <h1 className="text-5xl font-serif text-slate-700 whitespace-nowrap ml-96 mt-4">
        Product
      </h1>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="w-[550px] h-[500px] border rounded-xl shadow-xl">
          <div className="flex justify-center items-center mt-6">
            <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">
                  Product List Information
                </h3>
                <textarea
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-48"
                  type="text"
                  placeholder=""
                  id="productlist"
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">
                  Required Date
                </h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder="(mm/dd/yy)"
                  id="wantdate"
                  maxLength={8}
                  onChange={handleDateChange}
                />
              </div>
              <button
                className="bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                type="submit"
              >
                Submit
              </button>
              {publishError && (
                <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center">
                  {publishError}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
