import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  console.log(formData);

  const { addId } = useParams();

  useEffect(() => {
    try {
      const fetchStudents = async () => {
        const res = await fetch(`/api/supplier/outstock?itemId=${addId}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
        }
        if (res.ok) {
          const selected = data.Items.find((item) => item._id === addId);
          if (selected) {
            setFormData(selected);
          }
        }
      };
      fetchStudents();
    } catch (error) {
      console.log(error.message);
    }
  }, [addId]);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataWithItems = {
        Email: currentUser.email,
        ...formData,
      };

      const res = await fetch("/api/supplier/adver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataWithItems),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/addverView`);
        alert("successfull");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      setPublishError("Date must be a future date.");
    } else {
      const date = e.target.value.trim();
      const datePattern =
        /^(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])\/\d{2}$/;

      if (!datePattern.test(date)) {
        setPublishError("Invalid date format. Please use mm/dd/yy format.");
      } else {
        setFormData({ ...formData, wantdate: date });
        setPublishError(null); // Clear error message if date is valid
      }
    }
  };

  const handlePriceChange = (e) => {
    const price = parseFloat(e.target.value);
    if (price < 0) {
      setPublishError("Price cannot be negative");
    } else {
      setFormData({ ...formData, price });
      setPublishError(null); // Clear error message if price is valid
    }
  };
  const handleQuantityChange = (e) => {
    const quantity = parseInt(e.target.value);

    if (quantity <= 0 || isNaN(quantity)) {
      setPublishError("Invalid Quantity");
    } else {
      setFormData({ ...formData, quantity });
      setPublishError(null); // Clear error message if quantity is valid
    }
  };

  return (
    <div className=" ">
      <h1 className="text-5xl font-serif text-slate-700 whitespace-nowrap ml-96 mt-4">
        Product Supply Form
      </h1>

      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="w-[550px] h-[700px] border rounded-xl shadow-xl">
          <div className="flex justify-center items-center mt-6">
            <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">
                  Description
                </h3>
                <textarea
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-48"
                  type="text"
                  placeholder=""
                  id="desc"
                  onChange={handlchange}
                  value={formData.desc}
                  readOnly
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Type</h3>

                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder=""
                  id="type"
                  maxLength={200}
                  onChange={handlchange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Quantity</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="number" // Change the input type to number
                  id="quantity"
                  onChange={handleQuantityChange}
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Price</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  id="price"
                  onChange={handlePriceChange}
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Date</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  id="wantdate"
                  onChange={handleDateChange}
                />
              </div>
              <button
                className=" bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                type="submit"
              >
                Submit
              </button>

              {publishError && (
                <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
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
