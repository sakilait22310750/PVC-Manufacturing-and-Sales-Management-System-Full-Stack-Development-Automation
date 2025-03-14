import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({ supplier: "true" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { supId } = useParams();

  useEffect(() => {
    try {
      const fetchStudents = async () => {
        const res = await fetch(`/api/supplier/supplier?itemId=${supId}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
        }
        if (res.ok) {
          const selected = data.find((item) => item._id === supId);
          if (selected) {
            setFormData(selected);
          }
        }
      };
      fetchStudents();
    } catch (error) {
      console.log(error.message);
    }
  }, [supId]);

  console.log(formData);

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/user/update/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        setErrorMessage(data.message);
        return;
      }

      if (res.ok) {
        setErrorMessage(null);
        alert("succesfull");
        navigate(`/manageSupplier`);
      }
    } catch (error) {
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">UserName</h3>
              <input
                className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Username"
                id="username"
                onChange={handlchange}
                value={formData.username}
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Email</h3>

              <input
                className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handlchange}
                value={formData.email}
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Password</h3>
              <input
                className=" bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handlchange}
              />
            </div>
            <div style={{ display: "none" }}>
              <h3 className="font-semibold text-slate-400 ml-1">Supplier</h3>
              <input
                className=" bg-slate-100 p-3  border-none rounded-full"
                type="text"
                id="supplier"
                value={formData.supplier} // Set the value to formData.supplier
                readOnly
              />
            </div>
            <button
              className=" bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <sapn className="pl-3">Loading...</sapn>
                </>
              ) : (
                "Update Supplier"
              )}
            </button>
          </form>

          {errorMessage && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center ">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
