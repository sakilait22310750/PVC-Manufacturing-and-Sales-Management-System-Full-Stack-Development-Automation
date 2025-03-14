import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  console.log(formData);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const Feedadd = {
        EmployeId: currentUser._id,
        name: currentUser.Name,

        phone: currentUser.phone,

        ...formData,
      };
      const res = await fetch("/api/Empl/createform", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Feedadd),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/userview`);
        alert("successfull");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className=" ">
      <h1 className="text-5xl font-serif text-slate-700 whitespace-nowrap ml-96 mt-4">
      Leave Request
      </h1>
      <Link to="/userview">
        <button className=" bg-blue-700 text-white rounded-xl w-32 h-8 ml-[770px] hover:opacity-90">
          My Request
        </button>
      </Link>

      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="w-[550px] h-[700px] border rounded-xl shadow-xl">
          <div className="flex justify-center items-center mt-6">
            <form className="flex flex-col  gap-4" onSubmit={handleSubmit}>
              <div>
                <h3 className="font-semibold text-slate-400 ml-1">
                  Employee Name
                </h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  value={currentUser.Name}
                  id="name"
                  readOnly
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">Phone</h3>
                <input
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                  type="text"
                  value={currentUser.phone}
                  id="Phone"
                  readOnly
                />
              </div>

              <div>
                <h3 className="font-semibold text-slate-400 ml-1">
                  Description
                </h3>
                <textarea
                  className=" bg-slate-100 p-3 rounded-lg w-[460px] h-32"
                  type="text"
                  placeholder=""
                  id="desc"
                  onChange={handlchange}
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
