import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [publishError, setPublishError] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  console.log(formData);
  const { id } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/delivery/addriver/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      }

      if (res.ok) {
        setErrorMessage(null);
        navigate(`/orderDriver`);
        alert("successful");
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  const handleAgeChange = (e) => {
    const age = parseInt(e.target.value);
    if (isNaN(age) || age < 0 || age < 18 || age > 50) {
      setPublishError("Age must be a positive number between 18 and 50");
    } else {
      setFormData({ ...formData, Age: age });
      setPublishError(null); // Clear error message if age is valid
    }
  };

  const handleContactChange = (e) => {
    const contact = e.target.value.trim();
    const contactPattern = /^[0-9]{10}$/;

    if (!contactPattern.test(contact)) {
      setPublishError("Contact number must be a 10-digit number");
    } else {
      setFormData({ ...formData, Contact: contact });
      setPublishError(null); // Clear error message if contact number is valid
    }
  };

  return (
    <div className=" ">
      <h1 className="text-5xl font-serif text-slate-700 whitespace-nowrap ml-96 mt-4">Add Driver To Order</h1>

      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="w-[550px] h-[500px] border rounded-xl shadow-xl">
          <div className="flex justify-center items-center mt-6">
            <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Drivername</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  id="Drivername"
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Age</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  id="Age"
                  maxLength={2}
                  required
                  onChange={handleAgeChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Experience</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  id="ExprinceD"
                  maxLength={2}
                  required
                  onChange={handleChange}
                />
              </div>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Contact</h3>
                <input
                  className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  id="Contact"
                  maxLength={10}
                  required
                  onChange={handleContactChange}
                />
              </div>

              {publishError && <p className="text-red-500">{publishError}</p>}

              <button
                className="px-4 py-2 w-36 text-white bg-[#6366F1] rounded-lg"
                disabled={loading}
              >
                {loading ? "Loading..." : "Publish"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
