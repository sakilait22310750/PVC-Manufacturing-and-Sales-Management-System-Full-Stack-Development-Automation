import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UpdateEmp() {
  const [formData, setFormData] = useState({ employee: "true" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { EmpId } = useParams();

  console.log(formData);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const res = await fetch(`/api/Empl/employee?itemId=${EmpId}`);
        const data = await res.json();
        console.log("data", data);

        if (!res.ok) {
          console.log(data.message);
        }
        if (res.ok) {
          const selected = data.find((item) => item._id === EmpId);
          if (selected) {
            setFormData(selected);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchEmployee();
  }, [EmpId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        setLoading(false);
        return;
      }

      setErrorMessage(null);
      alert("Update successful");
      navigate(`/employeManage`);
    } catch (error) {
      setErrorMessage("Something went wrong");
      setLoading(false);
    }
  };

  const handleSalaryChange = (e) => {
    const Salary = e.target.value.trim();
    const salaryPattern = /^[0-9]+$/;

    if (Salary === "") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Salary: "",
      }));
      setErrorMessage(null);
    } else if (!salaryPattern.test(Salary)) {
      setErrorMessage("Salary must be a string containing only numbers");
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        Salary,
      }));
      setErrorMessage(null);
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
                onChange={handleChange}
                value={formData.username}
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Email</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Password</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Employee</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Name"
                id="Name"
                onChange={handleChange}
                value={formData.Name}
                required
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Address</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Address"
                id="Adress"
                onChange={handleChange}
                value={formData.Adress}
                required
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">
                Phone Number
              </h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Number"
                id="phone"
                maxLength={10}
                onChange={handleChange}
                value={formData.phone}
                required
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Job Title</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Job Title"
                id="Jobtitle"
                onChange={handleChange}
                value={formData.Jobtitle}
                required
              />
            </div>
            <div>
              <h3 className="font-semibold text-slate-400 ml-1">Salary</h3>
              <input
                className="bg-slate-100 p-3 rounded-lg w-[460px] h-11"
                type="text"
                placeholder="Number"
                id="Salary"
                maxLength={10}
                onChange={handleSalaryChange}
                value={formData.Salary}
              />
            </div>
            <select
              className="rounded-lg w-40"
              id="Gender"
              onChange={handleChange}
              value={formData.Gender}
            >
              <option value="">select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <div style={{ display: "none" }}>
              <h3 className="font-semibold text-slate-400 ml-1">Employee</h3>
              <input
                className="bg-slate-100 p-3 border-none rounded-full"
                type="text"
                id="employee"
                value={formData.employee}
                readOnly
              />
            </div>
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
                "Update employee"
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
