// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { IoMdHome } from "react-icons/io";
import { FaUserPlus, FaUserAlt, FaFileAlt } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import apps from "../assets/img/bwm.png";
import axios from "axios";
import Dashboard from "../pages/Dashboard";
import TambahNasabah from "../pages/TambahNasabah";
import DaftarNasabah from "../pages/DaftarNasabah";
import Pengajuan from "../pages/Pengajuan";
import DetailPengajuan from "../pages/DetailPengajuan";

export default function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [activeMenu, setActiveMenu] = useState("Home");
  const [selectedId, setSelectedId] = useState();

  const handleLogout = async (e) => {
    e.preventDefault();
    await localStorage.removeItem("token");
    setIsLoggedIn(false); // Update the state to reflect logout
    setActiveMenu("Home");
  };

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const token = localStorage.getItem("token");

        const currentUserRequest = await axios.get(
          "http://localhost:2020/api/v1/current/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const currentUserResponse = currentUserRequest.data;

        if (currentUserResponse.status) {
          setUser(currentUserResponse.data.user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    };

    validateLogin();
  }, []);

  const handleMenuClick = (menuClick) => {
    console.log(menuClick);

    return () => setActiveMenu(menuClick);
  };

  const handleDetailMenu = (id) => {
    console.log(id);
    setSelectedId(id);
    setActiveMenu("Detail Pengajuan");
  };

  const handleBack = () => {
    setActiveMenu("Home");
  };
  const handleBackList = () => {
    setActiveMenu("Daftar Nasabah");
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "Home":
        return <Dashboard />;
      case "Tambah Nasabah":
        return <TambahNasabah />;
      case "Daftar Nasabah":
        return (
          <DaftarNasabah
            handleMenuClick={handleMenuClick}
            handleDetailMenu={handleDetailMenu}
          />
        );
      case "Detail Pengajuan":
        return (
          <DetailPengajuan
            handleBack={handleBack}
            handleBackList={handleBackList}
            selectedId={selectedId}
          />
        );
      case "Pengajuan":
        return <Pengajuan user={user} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen left-0">
      <div>{renderContent()}</div>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-screen">
        <div className="flex flex-col top-0 left-0 h-full bg-gray-800 text-white justify-between w-full pr-14 pl-5">
          <div>
            <div className="p-4 flex items-center gap-2">
              <img src={apps} alt="" className="w-[40px]" />
              <p className="space-y-4" style={{ fontFamily: "Kanit" }}>
                B W M
              </p>
            </div>

            <nav className="p-4 " style={{ fontFamily: "Kanit" }}>
              <ul className="space-y-4">
                <li>
                  <button
                    onClick={handleMenuClick("Home")}
                    className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg"
                  >
                    <IoMdHome size={20} />
                    Home
                  </button>
                </li>
                {user.role === "customer" ? (
                  <li>
                    <button
                      disabled={!isLoggedIn}
                      onClick={handleMenuClick("Tambah Nasabah")}
                      className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <FaUserPlus size={20} />
                      Tambah Nasabah
                    </button>
                  </li>
                ) : (
                  <li>
                    <button
                      disabled={!isLoggedIn}
                      onClick={handleMenuClick("Daftar Nasabah")}
                      className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <FaUserAlt size={20} />
                      Daftar Nasabah
                    </button>
                  </li>
                )}
                {user.role === "customer" ||
                user.role === "superadmin" ||
                user.role === "admin" ? (
                  <li>
                    <button
                      disabled={!isLoggedIn}
                      onClick={handleMenuClick("Pengajuan")}
                      className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-lg"
                    >
                      <FaFileAlt size={20} />
                      Pengajuan Berkas
                    </button>
                  </li>
                ) : null}
              </ul>
            </nav>
          </div>
          {isLoggedIn ? (
            <>
              <button
                className="flex gap-3 items-center hover:bg-gray-700 rounded-lg p-5 mb-5"
                style={{ fontFamily: "Kanit" }}
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                <IoLogOutOutline size={20} /> Log Out
              </button>
              <dialog id="my_modal_1" className="modal">
                <div className="modal-box text-black text-center">
                  <h3 className="font-bold text-lg text-center">Konfirmasi</h3>
                  <p className="py-4 ">Apakah anda ingin keluar?</p>
                  <div className="modal-action">
                    <form method="dialog" className="flex flex-1 gap-3">
                      <button
                        className="btn flex-1"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                        No
                      </button>
                      <button className="btn flex-1" onClick={handleLogout}>
                        Yes
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          ) : null}
        </div>

        {/* Main content area */}
        <div className="flex-1" style={{ fontFamily: "Kanit" }}>
          <div className="flex justify-end items-center p-4 absolute left-72 z-50 top-0">
            {!isLoggedIn ? (
              <div className="flex gap-3">
                <button className="btn btn-ghost btn-square w-auto px-3">
                  <Link to={"/login"}>Sign In</Link>
                </button>
                <button className="btn btn-ghost btn-square bg-blue-600 w-auto px-3">
                  <Link to={"/register"}>Sign Up</Link>
                </button>
              </div>
            ) : null}
          </div>
          {/* Rest of your content */}
        </div>
      </div>
    </div>
  );
}
