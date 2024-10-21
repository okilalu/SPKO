import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import bankImage from "../assets/img/bulding.jpg";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState("false");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    const registerPayload = {
      name: name,
      username: username,
      email: email,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:2020/api/v1/user/register",
        registerPayload
      );
      const registerResponse = response.data;
      console.log(registerResponse);

      if (registerResponse.status) {
        navigate("/login");
        setName("");
        setUsername("");
        setEmail("");
        setPassword("");
        console.log("berhasil");
        alert("berhasil");
      } else {
        alert(registerResponse.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
    // if (
    //   name === "Admin" &&
    //   username === "admin_" &&
    //   email === "admin@gmail.com" &&
    //   password === "superadmin"
    // ) {
    //   window.location.href = "/login";
    //   alert("berhasil");
    // } else {
    //   alert("gagal register");
    // }
  };

  const handleShowPass = () => {
    setShow(!show);
  };
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100 gap-5"
      style={{ fontFamily: "Inter" }}
    >
      <div className="rounded-lg flex items-center justify-center p-2 gap-5">
        <div className="flex items-center justify-center rounded-xl p-2">
          <img
            src={bankImage}
            alt=""
            className="rounded-lg h-[90vh] w-[750px]"
          />
        </div>
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 capitalize">
            Create an account
          </h2>
          <form onSubmit={handleRegister}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="name"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="username"
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder=" email"
                required
              />
            </div>
            <div className="relative mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="flex gap-2 ">
                <input
                  type={`${show ? "password" : "text"}`}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="password"
                  required
                />
                {password.length > 0 && (
                  <button
                    type="button"
                    onClick={handleShowPass}
                    className="border rounded-lg text-gray-700 px-3 py-2 items-center"
                  >
                    {show ? <FaEye /> : <FaEyeSlash />}
                  </button>
                )}
              </div>
              <div className="flex flex-col items-center justify-between mt-5 gap-5">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Register
                </button>
                <div className="flex gap-2 w-full items-center justify-center">
                  <div className="h-[1px] w-full bg-gray-400" />
                  <p>or</p>
                  <div className="h-[1px] w-full bg-gray-400" />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-8 capitalize">
                <p>Already have an account?</p>
                <Link className="text-blue-500 font-bold" to={"/login"}>
                  Log in
                </Link>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
