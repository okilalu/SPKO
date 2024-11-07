/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { GoChecklist, GoFileDirectory } from "react-icons/go";
import { IoDocumentAttachOutline, IoEllipsisVertical } from "react-icons/io5";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Page from "../assets/img/page.png";
import Validate from "./Validate";
import { CiSearch } from "react-icons/ci";
import Pagination from "../components/Pagination";

export default function DaftarNasabah({ handleDetailMenu }) {
  const navigate = useNavigate();
  const [daftarNasabah, setDaftarNasabah] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedNasabahId, setSelectedNasabahId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  console.log(daftarNasabah);

  const filteredDocs = daftarNasabah.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const itemsPengajuan = filteredDocs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    validateLogin();
  }, []);
  const validateLogin = async () => {
    try {
      // Check user login status
      const token = localStorage.getItem("token");

      const currentUserRequest = await axios.get(
        "http://localhost:2020/api/v2/customer/status",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const currentUserResponse = currentUserRequest.data;
      console.log(currentUserResponse);

      if (currentUserResponse.status) {
        setDaftarNasabah(currentUserResponse.data.nasabah);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenModal = (nasabahId) => {
    setSelectedNasabahId(nasabahId);
    document.getElementById("my_modal_3").showModal();
  };

  const toggleDropdown = (dataId) => {
    console.log(dataId);
    setDropdownOpen((prev) => (prev === dataId ? null : dataId)); // Toggle dropdown
  };
  const handleOpenDetails = (nasabahId) => {
    setSelectedNasabahId(nasabahId);
    handleDetailMenu(nasabahId);
  };

  return (
    <div className="" style={{ fontFamily: "Kanit" }}>
      <div className="min-h-screen flex bg-gray-100 pl-72">
        <div className="w-full bg-white shadow-md rounded-lg p-8">
          {loading ? ( // Display the dynamic loading skeleton
            <div className="flex justify-center items-center h-full">
              <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
                <div className="h-24 w-24 rounded-full animate-spin border-r-2 border-blue-400"></div>
                <p className="text-xs text-black">Loading...</p>
              </div>
            </div>
          ) : daftarNasabah && daftarNasabah.length > 0 ? (
            <>
              <div className="border-b border-slate-700 mb-3">
                <h2 className="text-2xl font-semibold text-start text-gray-800">
                  Daftar Data Nasabah
                </h2>

                <p className="capitalize text-sm mb-3">
                  Kelola data dan uji kelayakan nasabah
                </p>
              </div>
              <div className="mb-4 relative w-64">
                <div className="absolute translate-x-[6px] translate-y-[6px]">
                  <CiSearch size={27} />
                </div>
                <input
                  type="text"
                  className="pl-10 w-full p-2 border border-gray-300 rounded-lg hover:ring-1 ring-red-200 focus:ring-1 outline-none"
                  placeholder="Cari berdasarkan nama..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && searchTerm.length > 0 && (
                  <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-[6px]"
                    onClick={() => setSearchTerm("")}
                  >
                    ✕
                  </button>
                )}
              </div>
              <div>
                <div className="">
                  <table className="table table-md">
                    <thead className="text-center bg-custom-purple-soft">
                      <tr>
                        <th>No</th>
                        <th>Name</th>
                        <th>Tanggal Dibuat</th>
                        <th>Alamat</th>
                        <th>Pekerjaan</th>
                        <th>No. HP</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="text-center">
                      {itemsPengajuan.length > 0 ? (
                        itemsPengajuan.map((items, index) => {
                          const formattedDate = format(
                            new Date(items.createdAt),
                            "EEEE, dd MMMM yyyy",
                            { locale: id }
                          );
                          return (
                            <tr
                              key={index}
                              className={`${
                                index % 2 === 0
                                  ? "bg-white"
                                  : "bg-custom-purple-soft"
                              }`}
                            >
                              <th>{index + 1}</th>
                              <td>{items.name}</td>
                              <td>{formattedDate}</td>
                              <td>{items.address}</td>
                              <td>{items.jobStatus}</td>
                              <td>{items.phoneNumber}</td>
                              <td>
                                <div className=" flex items-center justify-center">
                                  <button
                                    className="relative flex items-center justify-center hover:bg-gray-200 rounded-2xl"
                                    onClick={() => handleOpenDetails(items.id)}
                                  >
                                    <IoEllipsisVertical />
                                  </button>
                                </div>
                                <dialog id="my_modal_3" className="modal">
                                  <div className="modal-box">
                                    <Validate
                                      nasabahId={selectedNasabahId}
                                      validateData={validateLogin}
                                      loadingList={setLoading}
                                    />
                                    <div className="modal-action">
                                      <form method="dialog">
                                        {/* if there is a button, it will close the modal */}
                                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                          ✕
                                        </button>
                                      </form>
                                    </div>
                                  </div>
                                </dialog>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center py-4 text-gray-500"
                          >
                            Tidak ada data yang ditemukan.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <img src={Page} alt="" className="w-[250px]" />
              <h2 className="font-semibold text-3xl text-center">
                Tidak ada nasabah
              </h2>
            </div>
          )}
          {itemsPengajuan.length > 0 && (
            <Pagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalItems={filteredDocs.length}
            />
          )}
        </div>
      </div>
    </div>
  );
}
