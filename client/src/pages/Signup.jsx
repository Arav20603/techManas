import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "child" // ✅ must match backend
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value // ✅ no lowercase here
    });
  };

  const handleSignup = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      navigate("/");
    } catch (err) {
      alert("Error signing up");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 space-y-3 border p-6 rounded-xl shadow">
        <h1 className="text-xl font-bold">Signup</h1>

        <input
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />

        {/* ✅ IMPORTANT: values must be lowercase */}
        <select
          name="role"
          className="w-full border p-2 rounded"
          onChange={handleChange}
        >
          <option value="child">Child</option>
          <option value="parent">Parent</option>
          <option value="teacher">Teacher</option>
        </select>

        <button
          onClick={handleSignup}
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Signup
        </button>

        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}