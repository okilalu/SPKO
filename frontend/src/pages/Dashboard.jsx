// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import BankImage from "../assets/img/bankEdit.png";
import axios from "axios";

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    const validateLogin = async () => {
      try {
        // Check user login status
        const token = localStorage.getItem("token");

        const currentUserRequest = await axios.get(
          "http://localhost:2020/api/v1/current/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(user);
        const currentUserResponse = currentUserRequest.data;
        console.log(currentUserResponse);

        if (currentUserResponse.status) {
          setUser(currentUserResponse.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log(error);

        setIsLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };
    validateLogin();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-full pl-72">
          <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
            <div className="h-24 w-24 rounded-full animate-spin border-r-2 border-blue-400"></div>
            <p className="text-xs text-black">Loading...</p>
          </div>
        </div>
      ) : (
        <div className=" p-16 flex gap-3 h-screen pt-7 pl-72">
          <div className=" flex-1 p-10 pt-32">
            <h1
              className="lg:text-[72px] md:text-[30px] font-bold leading-9 "
              style={{ fontFamily: "Kanit" }}
            >
              Sistem Pendukung{" "}
            </h1>
            <h1
              className="text-[82px] font-bold mb-7"
              style={{ fontFamily: "Kanit" }}
            >
              Keputusan
            </h1>
            <p
              className="pr-32 text-xl text-justify"
              style={{ fontFamily: "Kanit" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere
              illo voluptatem sapiente nesciunt optio nemo quae praesentium. Et
              beatae, illum alias aspernatur porro a sunt fugit aperiam
              veritatis possimus cum.
            </p>
            <button className="btn btn-primary btn-square text-justify w-auto mt-5 p-3">
              Learn More
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center pt-24">
            <img src={BankImage} alt="" className="w-[720px]" />
          </div>
        </div>
      )}
    </div>
  );
}
