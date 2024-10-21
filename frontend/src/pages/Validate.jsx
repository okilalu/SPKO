/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Validate({ nasabahId, validateData, loadingList }) {
  const navigate = useNavigate();
  const location = useLocation();
  // const { nasabahId } = location.state || {};
  const [input, setInput] = useState({
    behavior: "",
    attendance: "",
    teamwork: "",
    fileCompleteness: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(nasabahId);

  const handleValidate = async (e) => {
    e.preventDefault();
    const handleSubmitValidate = {
      behavior: input.behavior,
      attendance: input.attendance,
      teamwork: input.teamwork,
      fileCompleteness: input.fileCompleteness,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:2020/api/v3/validate/create/${nasabahId}`,
        handleSubmitValidate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.status) {
        loadingList(true);
        document.getElementById("my_modal_3").showModal();
        await validateData();
        setInput({
          behavior: "",
          attendance: "",
          teamwork: "",
          fileCompleteness: "",
        });
        console.log("Berhasil");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      <div className="flex items-center justify-center">
        <div className="w-full max-w-lg bg-white rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Uji Kelayakan Nasabah
          </h2>
          <form onSubmit={handleValidate}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="behavior"
              >
                Perilaku
              </label>
              <select
                id="behavior"
                name="behavior"
                value={input.behavior}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
              >
                <option value="">Pilih</option>
                <option value="excellent">Sangat Baik</option>
                <option value="good">Baik</option>
                <option value="ordinary">Biasa</option>
                <option value="not good">Tidak Baik</option>
                <option value="very bad">Sangat Tidak Baik</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="attendance"
              >
                Kehadiran
              </label>
              <select
                id="attendance"
                name="attendance"
                value={input.attendance}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
              >
                <option value="">Pilih</option>
                <option value="excellent">Sangat Baik</option>
                <option value="good">Baik</option>
                <option value="ordinary">Biasa</option>
                <option value="not good">Tidak Baik</option>
                <option value="very bad">Sangat Tidak Baik</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="teamwork"
              >
                Kerja Sama Tim
              </label>
              <select
                id="teamwork"
                name="teamwork"
                value={input.teamwork}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
              >
                <option value="">Pilih</option>
                <option value="excellent">Sangat Baik</option>
                <option value="good">Baik</option>
                <option value="ordinary">Biasa</option>
                <option value="not good">Tidak Baik</option>
                <option value="very bad">Sangat Tidak Baik</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fileCompleteness"
              >
                Kelengkapan Berkas
              </label>
              <select
                id="fileCompleteness"
                name="fileCompleteness"
                value={input.fileCompleteness}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
              >
                <option value="">Pilih</option>
                <option value="complate">Lengkap</option>
                <option value="incomplate">Tidak Lengkap</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
