import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({ supplier: "true" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlchange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("Please fill out all fields");
    }

    try {
      setLoading(true);
      setErrorMessage(null);

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/manageSupplier");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Username"
                id="username"
                onChange={handlchange}
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Email</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handlchange}
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Password</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handlchange}
              />
            </div>
            {/* Hidden section */}
            <div style={{ display: "none" }}>
              <h3 className="font-semibold text-slate-400 ml-1">Supplier</h3>
              <input
                type="text"
                id="supplier"
                value={formData.supplier} // Set the value to formData.supplier
                readOnly
              />
            </div>
            {/* End of hidden section */}
            <button
              className="bg-blue-700 text-white p-3 rounded-lg w-[460px] h-11 hover:opacity-90"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="pl-3">Loading...</span>
                </>
              ) : (
                "Add New supplier"
              )}
            </button>
          </form>
          {errorMessage && (
            <p className="mt-5 text-red-600 bg-red-300 w-300 h-7 rounded-lg text-center">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
