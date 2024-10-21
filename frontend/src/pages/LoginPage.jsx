// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import apps from "../assets/img/bwm.png";
import bankImage from "../assets/img/bulding.jpg";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [show, setShow] = useState("false");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const loginPayload = {
      username: username,
      password: password,
    };
    try {
      const response = await axios.post(
        "http://localhost:2020/api/v1/user/login",
        loginPayload
      );
      console.log("response", response);

      const loginResponse = response.data;
      console.log(loginResponse);

      console.log(loginResponse.data.token);
      if (loginResponse.status) {
        localStorage.setItem("token", loginResponse.data.token);
        navigate("/");
        setUsername("");
        setPassword("");
        console.log("Berhasil");
        alert("berhasil");
      } else {
        alert(loginResponse.message);
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };

  const handleShowPass = () => {
    setShow(!show);
  };
  // if (username === "admin_" && password === "superadmin") {
  //   window.location.href = "/";
  //   alert("berhasil");
  // } else {
  //   alert("Gagal Login ");
  // }
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{ fontFamily: "Inter" }}
    >
      <div className="rounded-lg flex items-center justify-center p-2 gap-5">
        <div className="w-full max-w-md ">
          <div className="flex items-center justify-center mb-10">
            <img src={apps} alt="" className="w-[50px]" />
            <h2 className="capitalize text-justify font-bold pl-3 pt-1">
              Bank Wakaf Mikro
            </h2>
          </div>
          <div className=" bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-semibold text-left capitalize text-gray-800 pb-3">
              Login to your account
            </h2>
            <h3 className="pb-5 capitalize">
              Welcome back, please enter your details
            </h3>
            <form onSubmit={handleLogin}>
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
              <div className="relative mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="flex gap-2">
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
                {error && <p className="text-red-500">{error}</p>}
                <div className="flex flex-col items-center pt-5 justify-between gap-4">
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Login
                  </button>
                  <div className="flex gap-2 w-full items-center justify-center">
                    <div className="h-[1px] w-full bg-gray-400" />
                    <p>or</p>
                    <div className="h-[1px] w-full bg-gray-400" />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 pt-5 ">
                  <p>Don't have an account?</p>
                  <Link className="text-blue-500 font-bold" to={"/register"}>
                    Create account
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="flex items-center justify-center rounded-xl p-2">
          <img
            src={bankImage}
            alt=""
            className="rounded-lg h-[90vh] w-[750px]"
          />
        </div>
      </div>
    </div>
  );
}
