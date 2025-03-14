import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({ employee: "true" });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(formData);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.Gender // Validate if gender is selected
    ) {
      return setErrorMessage("Please fill out all fields including Gender");
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
        navigate("/employeManage");
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  const handleSalaryChange = (e) => {
    const Salary = e.target.value.trim();
    const salaryPattern = /^[0-9]+$/;

    if (!salaryPattern.test(Salary)) {
      setErrorMessage("Salary must be a string containing only numbers");
    } else {
      setFormData({ ...formData, Salary });
      setErrorMessage(null); // Clear error message if salary is valid
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {" "}
            Create a new employee account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="pb-4">
              <h3 className="font-semibold text-slate-400 ml-1">Username</h3>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
            <div className="pb-4">
              <h3 className="font-semibold text-slate-400 ml-1">Email</h3>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="pb-4">
              <h3 className="font-semibold text-slate-400 ml-1">Password</h3>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <div className="pb-4">
              <h3 className="font-semibold text-slate-400 ml-1">
                Employee Name
              </h3>
              <label htmlFor="Name" className="sr-only">
                Employee Name
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text"
                placeholder="Name"
                id="Name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="pb-4">
              <h3 className="font-semibold text-slate-400 ml-1">Address</h3>
              <label htmlFor="Adress" className="sr-only">
                Address
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text"
                placeholder="Address"
                id="Adress"
                onChange={handleChange}
                required
              />
            </div>
            <div className="pb-4">
              <h3 className="font-semibold text-slate-400 ml-1">
                Phone Number
              </h3>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text"
                placeholder="Phone Number"
                id="phone"
                maxLength={10}
                onChange={handleChange}
                required
              />
            </div>
            <div className="pb-4">
              <h3 className="font-semibold text-slate-400 ml-1">Job Title</h3>
              <label htmlFor="Jobtitle" className="sr-only">
                Job Title
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text"
                placeholder="Job Title"
                id="Jobtitle"
                onChange={handleChange}
                required
              />
            </div>
            <div className="pb-4">
              <h3 className="font-semibold text-slate-400 ml-1">Salary</h3>
              <label htmlFor="Salary" className="sr-only">
                Salary
              </label>
              <input
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                type="text"
                placeholder="Salary"
                id="Salary"
                maxLength={10}
                onChange={handleSalaryChange}
              />
            </div>
            <div className="pb-4">
              <h3 className="font-semibold text-slate-400 ml-1">Gender</h3>
              <label htmlFor="Gender" className="sr-only">
                Gender
              </label>
              <select
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                id="Gender"
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>

          <div>
            <button
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Sign Up"}
            </button>
          </div>

          {errorMessage && (
            <p className="mt-2 text-center text-sm text-red-600 bg-red-100 py-2 rounded-md">
              {errorMessage}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
