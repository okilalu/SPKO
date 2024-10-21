import axios from "axios";
import React, { useEffect, useState } from "react";
import Validate from "./Validate";
import { HiMiniCheck, HiOutlineIdentification } from "react-icons/hi2";
import { LuFileInput } from "react-icons/lu";
import { FaIdBadge } from "react-icons/fa";
import {
  PiBriefcaseLight,
  PiMosqueLight,
  PiNotebookLight,
  PiTextAa,
  PiTrolleyDuotone,
} from "react-icons/pi";
import { CiCalendarDate } from "react-icons/ci";
import { BsGenderFemale } from "react-icons/bs";
import { GiRelationshipBounds } from "react-icons/gi";
import { FaPeopleGroup } from "react-icons/fa6";
import { GrRestroomWomen } from "react-icons/gr";
import {
  MdCastForEducation,
  MdDialpad,
  MdOutlineFileOpen,
  MdOutlinePlace,
  MdOutlineSensorOccupied,
} from "react-icons/md";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { AiOutlineHome } from "react-icons/ai";
import { IoListOutline } from "react-icons/io5";

export default function DetailPengajuan({
  selectedId,
  handleMenuClick,
  handleBackList,
  handleBack,
}) {
  console.log(selectedId);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [detailNasabah, setDetailNasabah] = useState();
  const [loading, setLoading] = useState(true);
  const [selectedNasabahId, setSelectedNasabahId] = useState(null);
  console.log(detailNasabah);

  useEffect(() => {
    const validateLogin = async () => {
      try {
        // Check user login status
        const token = localStorage.getItem("token");

        const currentUserRequest = await axios.get(
          `http://localhost:2020/api/v2/get/customer/${selectedId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(currentUserRequest);
        const currentUserResponse = currentUserRequest.data;
        console.log(currentUserResponse);

        if (currentUserResponse.status) {
          setDetailNasabah(currentUserResponse.data.customer);
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
  }, [selectedId]);

  const handleOpenModal = (nasabahId) => {
    setSelectedNasabahId(nasabahId);
    document.getElementById("my_modal_3").showModal();
  };

  // console.log(user);

  return (
    <div className="h-screen bg-gray-100" style={{ fontFamily: "Kanit" }}>
      <div className="bg-white shadow-lg rounded-lg h-screen p-10 ml-72">
        <div className="breadcrumbs text-md">
          <ul className="gap-2">
            <li>
              <a className="gap-2" onClick={handleBack}>
                <AiOutlineHome />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg> */}
                Home
              </a>
            </li>
            <li>
              <a className="gap-2" onClick={handleBackList}>
                <IoListOutline />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                  ></path>
                </svg> */}
                Daftar Nasabah
              </a>
            </li>
            <li>
              <span className="inline-flex items-center gap-2">
                <MdOutlineFileOpen />
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg> */}
                Detail Pengajuan
              </span>
            </li>
          </ul>
        </div>
        <div className="border-b border-slate-700 mb-3">
          <h2 className="text-start text-3xl font-semibold text-gray-800">
            Detail Pengajuan
          </h2>
          <p className="capitalize text-sm mb-3">
            detail data pengajuan dan uji kelayakan nasabah
          </p>
        </div>
        <div className="flex gap-5">
          {/* Nasabah Section */}
          <div className="border rounded-lg p-6 bg-gray-50 w-[32rem]">
            <h3 className="text-2xl font-semibold text-center mb-4 text-gray-700">
              Nasabah
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <HiOutlineIdentification size={22} className="" />
                  <p className="font-medium text-gray-600">Jenis Identitas:</p>
                </div>
                <p className="flex-1 flex text-gray-800">
                  {detailNasabah?.identity || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <FaIdBadge size={22} />
                  <p className="font-medium text-gray-600">No. Identitas:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.noIdentity || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <PiTextAa size={22} />
                  <p className="font-medium text-gray-600">Nama Nasabah:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.name || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <CiCalendarDate size={22} />
                  <p className="font-medium text-gray-600">
                    Tempat / Tanggal Lahir:
                  </p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.born || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <BsGenderFemale size={22} />
                  <p className="font-medium text-gray-600">Jenis Kelamin:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.gender || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <PiMosqueLight size={22} />
                  <p className="font-medium text-gray-600">Agama:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.religion || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <GiRelationshipBounds size={22} />
                  <p className="font-medium text-gray-600">
                    Status Perkawinan:
                  </p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.merriedStatus || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <FaPeopleGroup size={22} />
                  <p className="font-medium text-gray-600">Kewarganegaraan:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.citizenShip || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <GrRestroomWomen size={22} />
                  <p className="font-medium text-gray-600">Nama Ibu Kandung:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.motherName || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <MdOutlinePlace size={22} />
                  <p className="font-medium text-gray-600">Alamat Lengkap:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.address || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <MdDialpad size={22} />
                  <p className="font-medium text-gray-600">No. HP:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.phoneNumber || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <MdCastForEducation size={22} />
                  <p className="font-medium text-gray-600">Pendidikan:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.education || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <PiBriefcaseLight size={22} />
                  <p className="font-medium text-gray-600">Pekerjaan:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.jobStatus || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <PiTrolleyDuotone size={22} />
                  <p className="font-medium text-gray-600">Kategori Usaha:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.businessCategory || ""}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="flex items-center flex-1 gap-3">
                  <PiNotebookLight size={22} />
                  <p className="font-medium text-gray-600">Deskripsi Usaha:</p>
                </div>
                <p className="text-gray-800 flex-1 flex">
                  {detailNasabah?.businessDesc || ""}
                </p>
              </div>
            </div>
          </div>
          {/* Penanggung Jawab Section */}
          <div className="border rounded-lg p-6 bg-gray-50 w-[30rem] h-[17rem]">
            <h3 className="text-2xl font-semibold text-center mb-4 text-gray-700">
              Penanggung Jawab
            </h3>
            <div className="space-y-4">
              {detailNasabah?.responsibles.map((items) => (
                <>
                  <div className="flex gap-3">
                    <div className="flex items-center flex-1 gap-3">
                      <MdOutlineSensorOccupied size={22} />
                      <p className="font-medium text-gray-600">
                        Penanggung Jawab:
                      </p>
                    </div>
                    <p className="text-gray-800 flex-1 flex">
                      {items?.responsible || ""}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center flex-1 gap-3">
                      <HiOutlineIdentification size={22} />
                      <p className="font-medium text-gray-600">
                        Jenis Identitas:
                      </p>
                    </div>
                    <p className="text-gray-800 flex-1 flex">
                      {items?.responsibleIdentity || ""}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center flex-1 gap-3">
                      <FaIdBadge size={22} />
                      <p className="font-medium text-gray-600">
                        No. Identitas:
                      </p>
                    </div>
                    <p className="text-gray-800 flex-1 flex">
                      {items?.responsibleNoIdentity || ""}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex items-center flex-1 gap-3">
                      <PiTextAa size={22} />
                      <p className="font-medium text-gray-600">Nama:</p>
                    </div>
                    <p className="text-gray-800 flex-1 flex">
                      {items?.responsibleName || ""}
                    </p>
                  </div>
                </>
              ))}
            </div>
          </div>
          {/* Validate Section */}
          <div className="border rounded-lg p-6 bg-gray-50 w-[30rem] h-[17rem]">
            <div>
              <h2 className="text-md font-semibold text-center mb-4 text-gray-700">
                Uji Kelayakan Nasabah
              </h2>
            </div>
            <div className="px-2 p-2 bg-gray-200 rounded-md space-y-2 mb-4">
              <h3>Status : {detailNasabah?.status || ""}</h3>
              <h3>
                Dibuat pada :{" "}
                {detailNasabah?.createdAt
                  ? format(
                      new Date(detailNasabah.createdAt),
                      "EEEE, dd MMMM yyyy",
                      { locale: id }
                    )
                  : "Tanggal tidak tersedia"}
              </h3>
            </div>
            {/* Open the modal */}
            <button
              className="bg-green-400 p-1 px-3 rounded-md w-full"
              onClick={() => handleOpenModal(selectedId)}
            >
              <div className="flex flex-row gap-1 items-center justify-center">
                <LuFileInput size={20} />
                <p>Validasi</p>
              </div>
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <Validate
                  nasabahId={selectedNasabahId}
                  // validateData={validateLogin}
                  // loadingList={setLoading}
                />
                <div className="modal-action">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                </div>
              </div>
            </dialog>
          </div>
        </div>
      </div>
    </div>
  );
}
