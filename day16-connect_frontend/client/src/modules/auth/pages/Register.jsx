import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(
        "Error in registration",
        err?.message || "Registration Failed",
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form className="flex flex-col gap-4 p-4 max-w-64">
        <input
          className="border p-2 rounded-sm"
          onChange={handleChange}
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          required
        />
        <input
          className="border p-2 rounded-sm"
          onChange={handleChange}
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your mail"
          required
        />
        <input
          className="border p-2 rounded-sm"
          onChange={handleChange}
          type="text"
          name="password"
          value={formData.password}
          placeholder="Create a password"
          required
        />
        <button className="border p-2 rounded-sm bg-green-400 text-white font-bold cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
