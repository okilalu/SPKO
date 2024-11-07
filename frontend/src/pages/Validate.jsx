/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function Validate({
  nasabahId,
  validateData,
  loadingList,
  handleCloseModal,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  // const { nasabahId } = location.state || {};
  const [input, setInput] = useState({
    perilaku: "",
    kehadiran: "",
    kerjasamaTim: "",
    kelengkapanBerkas: "",
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
      perilaku: input.perilaku,
      kehadiran: input.kehadiran,
      kerjasamaTim: input.kerjasamaTim,
      kelengkapanBerkas: input.kelengkapanBerkas,
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
          perilaku: "",
          kehadiran: "",
          kerjasamaTim: "",
          kelengkapanBerkas: "",
        });
        console.log("Berhasil");
        handleCloseModal();
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
                htmlFor="perilaku"
              >
                Perilaku
              </label>
              <select
                id="perilaku"
                name="perilaku"
                value={input.perilaku}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
              >
                <option value="">Pilih</option>
                <option value="sangat baik">Sangat Baik</option>
                <option value="baik">Baik</option>
                <option value="biasa">Biasa</option>
                <option value="tidak baik">Tidak Baik</option>
                <option value="sangat tidak baik">Sangat Tidak Baik</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="kehadiran"
              >
                Kehadiran
              </label>
              <select
                id="kehadiran"
                name="kehadiran"
                value={input.kehadiran}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
              >
                <option value="">Pilih</option>
                <option value="sangat baik">Sangat Baik</option>
                <option value="baik">Baik</option>
                <option value="biasa">Biasa</option>
                <option value="tidak baik">Tidak Baik</option>
                <option value="sangat tidak baik">Sangat Tidak Baik</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="kerjasamaTim"
              >
                Kerja Sama Tim
              </label>
              <select
                id="kerjasamaTim"
                name="kerjasamaTim"
                value={input.kerjasamaTim}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
              >
                <option value="">Pilih</option>
                <option value="sangat baik">Sangat Baik</option>
                <option value="baik">Baik</option>
                <option value="biasa">Biasa</option>
                <option value="tidak baik">Tidak Baik</option>
                <option value="sangat tidak baik">Sangat Tidak Baik</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="kelengkapanBerkas"
              >
                Kelengkapan Berkas
              </label>
              <select
                id="kelengkapanBerkas"
                name="kelengkapanBerkas"
                value={input.kelengkapanBerkas}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-gray-700"
                required
              >
                <option value="">Pilih</option>
                <option value="lengkap">Lengkap</option>
                <option value="tidak lengkap">Tidak Lengkap</option>
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
