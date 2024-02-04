import React, { useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";

import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signUp(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-6 space-y-6 bg-white shadow-md">
        <h2 className="text-2xl font-semibold text-center">Register</h2>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border my-2 border-gray-300 rounded"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full p-2 bg-blue-500 text-white rounded">
            Register
          </button>
        </form>

        <p className="text-center">
          Already have an account?<Link to="/">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
