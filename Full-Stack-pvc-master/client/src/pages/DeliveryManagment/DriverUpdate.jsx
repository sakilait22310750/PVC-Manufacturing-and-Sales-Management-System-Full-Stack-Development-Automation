import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});

  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  console.log(formData);

  const { driverid } = useParams();

  useEffect(() => {
    try {
      const fetchStudents = async () => {
        const res = await fetch(`/api/delivery/get?itemId=${driverid}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
        }
        if (res.ok) {
          const selected = data.Items.find((item) => item._id === driverid);
          if (selected) {
            setFormData(selected);
          }
        }
      };
      fetchStudents();
    } catch (error) {
      console.log(error.message);
    }
  }, [driverid]);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/delivery/updatedriver/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        alert("succesfull");
        navigate(`/mangeDriver`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  const handledateChange = (e) => {
    const age = parseInt(e.target.value);
    if (isNaN(age) || age < 0 || age < 18 || age > 50) {
      setPublishError("Age must be a positive number between 18 and 50");
    } else {
      setFormData({ ...formData, age });
      setPublishError(null); // Clear error message if age is valid
    }
  };

  const handleContactChange = (e) => {
    const contact = e.target.value.trim();
    const contactPattern = /^[0-9]{10}$/;

    if (!contactPattern.test(contact)) {
      setPublishError("Contact number must be a 10-digit number");
    } else {
      setFormData({ ...formData, contact });
      setPublishError(null); // Clear error message if contact number is valid
    }
  };

  return (
    <div className=" ">
      <h1 className="text-5xl font-serif text-slate-700 whitespace-nowrap ml-96 mt-4">
        Update Driver Details
      </h1>

      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="w-[550px] h-[650px] border rounded-xl shadow-xl">
          <div className="flex justify-center items-center mt-6">
            <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">
                  Driver Name
                </h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder=""
                  id="name"
                  required
                  onChange={handlchange}
                  value={formData.name}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Address</h3>

                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder=""
                  id="address"
                  required
                  value={formData.address}
                  onChange={handlchange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Age</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder=""
                  id="age"
                  maxLength={2}
                  required
                  onChange={handledateChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Driver ID</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder=""
                  id="Id"
                  maxLength={10}
                  required
                  onChange={handlchange}
                  value={formData.Id}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Contact</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  placeholder=""
                  id="contact"
                  maxLength={10}
                  required
                  onChange={handleContactChange}
                />
              </div>
              <button
                className=" bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
                type="submit"
              >
                submit
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
