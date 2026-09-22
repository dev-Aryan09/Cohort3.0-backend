import React, { useState } from "react";
import useApi from "../shared/api";
import { useAuthContext } from "../context/AuthContext";

const Register = () => {
  const api = useApi();
  const { setUser, setAccessToken } = useAuthContext();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const response = await api.post("/auth/register", formData);
      console.log(response);

      // setAccessToken(response.accessToken);
    } catch (err) {
      console.log(
        "Error in registration,",
        err?.message || "Registration Failed",
      );
    }
  };

  return (
    <div>
      <h1>Register</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 max-w-64"
      >
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
