// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomInput from "../components/CustomInput";
import CustomLabel from "../components/CustomLabel";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { PiCalendarDotsLight } from "react-icons/pi";

export default function TambahNasabah() {
  const navigate = useNavigate();
  const [identity, setIdentity] = useState("");
  const [noIdentity, setNoIdentity] = useState("");
  const [name, setName] = useState("");
  const [born, setBorn] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [merriedStatus, setMerriedStatus] = useState("");
  const [citizenShip, setCitizenShip] = useState("");
  const [motherName, setMotherName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [education, setEducation] = useState("");
  const [jobStatus, setJobStatus] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [businessDesc, setBusinessDesc] = useState("");
  const [responsible, setResponsible] = useState("");
  const [responsibleIdentity, setResponsibleIdentity] = useState("");
  const [responsibleNoIdentity, setResponsibleNoIdentity] = useState("");
  const [responsibleName, setResponsibleName] = useState("");
  const [lainnyaIdentitas, setLainnyaIdentitas] = useState("");
  const [lainnyaPendidikan, setLainnyaPendidikan] = useState("");
  const [lainnyaKategoriUsaha, setLainnyaKategoriUsaha] = useState("");
  const [lainnyaPenanggungJawab, setLainnyaPenanggungJawab] = useState("");
  const [lainnyaResponsibleIdentitas, setLainnyaResponsibleIdentitas] =
    useState("");

  const [bornDate, setBornDate] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [dropdownDateOpen, setdropdownDateOpen] = useState(false);
  // const [lainnya, setLainnya] = useState("");

  // }, []);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    const bornValue = born.split(",")[0]; // Split to get the place part
    const formattedDate = format(date, "dd MMMM yyyy", { locale: id }); // Format the date in Indonesian format
    setBorn(`${bornValue}, ${formattedDate}`); // Update born field
    setBornDate(formattedDate); // Update the bornDate state
  };
  const handleDropdownDate = () => {
    setdropdownDateOpen(!dropdownDateOpen);
  };
  const handleChangeidentitas = (e) => {
    setIdentity(e.target.value);
    if (e.target.value === "Lainnya") {
      setLainnyaIdentitas("");
    }
  };
  const handleChangePendidikan = (e) => {
    setEducation(e.target.value);
    if (e.target.value === "Lainnya") {
      setLainnyaPendidikan("");
    }
  };
  const handleChangeKategoriUsaha = (e) => {
    setBusinessCategory(e.target.value);
    if (e.target.value === "Lainnya") {
      setLainnyaKategoriUsaha("");
    }
  };
  const handleChangeResponsible = (e) => {
    setResponsible(e.target.value);
    if (e.target.value === "Lainnya") {
      setLainnyaPenanggungJawab("");
    }
  };
  const handleChangeResponsibleIdentity = (e) => {
    setResponsibleIdentity(e.target.value);
    if (e.target.value === "Lainnya") {
      setLainnyaResponsibleIdentitas();
    }
  };

  const handleLainnyaIdentitasChange = (e) => {
    setLainnyaIdentitas(e.target.value);
  };

  const handleLainnyaPendidikanChange = (e) => {
    setLainnyaPendidikan(e.target.value);
  };

  const handleLainnyaKategoriUsahaChange = (e) => {
    setLainnyaKategoriUsaha(e.target.value);
  };

  const handleLainnyaPenanggungJawabChange = (e) => {
    setLainnyaPenanggungJawab(e.target.value);
  };

  const handleLainnyaResponsibleIdentitasChange = (e) => {
    setLainnyaResponsibleIdentitas(e.target.value);
  };
  const handleAddCustomer = async (e) => {
    e.preventDefault();
    const finalIdentity = identity === "Lainnya" ? lainnyaIdentitas : identity;
    const finalEducation =
      education === "Lainnya" ? lainnyaPendidikan : education;
    const finalBusinessCategory =
      businessCategory === "Lainnya" ? lainnyaKategoriUsaha : businessCategory;
    const finalResponsible =
      responsible === "Lainnya" ? lainnyaPenanggungJawab : responsible;
    const finalResponsibleIdentity =
      responsibleIdentity === "Lainnya"
        ? lainnyaResponsibleIdentitas
        : responsibleIdentity;
    const addResponsible = {
      responsible: finalResponsible,
      responsibleIdentity: finalResponsibleIdentity,
      responsibleNoIdentity: responsibleNoIdentity,
      responsibleName: responsibleName,
    };
    const addCustomerPayload = {
      identity: finalIdentity,
      noIdentity: noIdentity,
      name: name,
      born: born,
      gender: gender,
      religion: religion,
      merriedStatus: merriedStatus,
      citizenShip: citizenShip,
      motherName: motherName,
      address: address,
      phoneNumber: phoneNumber,
      education: finalEducation,
      jobStatus: jobStatus,
      businessCategory: finalBusinessCategory,
      businessDesc: businessDesc,
      responsibles: addResponsible,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:2020/api/v2/customer/create",
        addCustomerPayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("response", response.data);

      if (response.data.status) {
        navigate("/");
        setIdentity("");
        setNoIdentity("");
        setName("");
        setBorn("");
        setGender("");
        setReligion("");
        setMerriedStatus("");
        setCitizenShip("");
        setMotherName("");
        setAddress("");
        setPhoneNumber("");
        setEducation("");
        setJobStatus("");
        setBusinessCategory("");
        setBusinessDesc("");
        setResponsible("");
        setResponsibleIdentity("");
        setResponsibleNoIdentity("");
        setResponsibleName("");
        console.log("berhasil");
        alert("berhasil");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-1">
      {/* Form Cutomer */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100 pl-72">
        <div className="w-full p-5">
          <form onSubmit={handleAddCustomer} className="flex w-full gap-5">
            <div className="p-5 bg-white shadow-md rounded-lg flex-1">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Data Nasabah
              </h2>
              <div className="flex flex-1 gap-5">
                <div className="flex-1">
                  <div className="mb-4 ">
                    <CustomLabel
                      htmlFor="jenisIdentitas"
                      text="Jenis Identitas "
                    />
                    <select
                      className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="jenisIdentitas"
                      name="jenisIdentitas"
                      value={identity}
                      onChange={handleChangeidentitas}
                    >
                      <option value="">Pilih Jenis Identitas</option>
                      <option value="KTP">KTP</option>
                      <option value="KTM">KTM</option>
                      <option value="KTA">KTA</option>
                      <option value="Passport">Passport</option>
                      <option value="SIM">SIM</option>
                      <option>Lainnya</option>
                    </select>

                    {identity === "Lainnya" && (
                      <CustomInput
                        id="lainnya"
                        name="lainnya"
                        value={lainnyaIdentitas}
                        onChange={handleLainnyaIdentitasChange}
                        placeholder="Masukkan jenis identitas lainnya"
                      />
                    )}
                  </div>

                  <div className="mb-4">
                    <CustomLabel htmlFor="noIdentitas" text="No. Identitas " />
                    <CustomInput
                      type="text"
                      id="noIdentitas"
                      name="noIdentitas"
                      value={noIdentity}
                      onChange={(e) => setNoIdentity(e.target.value)}
                      placeholder="Masukkan No. Identitas"
                    />
                  </div>

                  <div className="mb-4">
                    <CustomLabel htmlFor="namaNasabah" text="Nama Nasabah " />
                    <CustomInput
                      type="text"
                      id="namaNasabah"
                      name="namaNasabah"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Masukkan Nama Nasabah"
                    />
                  </div>

                  <div className="mb-4 relative">
                    <CustomLabel
                      htmlFor="tempatTanggalLahir"
                      text="Tempat/Tanggal Lahir"
                    />
                    <CustomInput
                      type="text"
                      id="tempatTanggalLahir"
                      name="tempatTanggalLahir"
                      value={born}
                      onChange={(e) => {
                        setBorn(e.target.value);
                        setBornDate(null);
                      }}
                      placeholder="Masukkan Tempat, Tanggal Lahir"
                    />
                    {born.trim() !== "" && (
                      <>
                        <button
                          type="button"
                          className="absolute right-2 top-[45px]"
                          onClick={handleDropdownDate}
                        >
                          <PiCalendarDotsLight size={25} />
                          <div
                            className="absolute z-50 top-7 left-0"
                            onClick={(e) => e.stopPropagation()}
                          >
                            {dropdownDateOpen && (
                              <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                inline
                              />
                            )}
                          </div>
                        </button>
                      </>
                    )}
                  </div>

                  <div className="mb-4">
                    <CustomLabel htmlFor="jenisKelamin" text="Jenis Kelamin " />
                    <select
                      className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="jenisKelamin"
                      name="jenisKelamin"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Pilih Jenis Kelamin</option>
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <CustomLabel htmlFor="agama" text="Agama" />
                    <select
                      className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="agama"
                      name="agama"
                      value={religion}
                      onChange={(e) => setReligion(e.target.value)}
                    >
                      <option value="">Pilih Agama</option>
                      <option value="Islam">Islam</option>
                      <option value="Kristen">Kristen</option>
                      <option value="Katolik">Katolik</option>
                      <option value="Hindu">Hindu</option>
                      <option value="Buddha">Buddha</option>
                      <option value="Konghucu">Konghucu</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <CustomLabel
                      htmlFor="statusPerkawinan"
                      text="Status Perkawinan"
                    />
                    <select
                      className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="statusPerkawinan"
                      name="statusPerkawinan"
                      value={merriedStatus}
                      onChange={(e) => setMerriedStatus(e.target.value)}
                    >
                      <option value="">Pilih Status Perkawinan</option>
                      <option value="Belum Menikah">Belum Menikah</option>
                      <option value="Menikah">Menikah</option>
                      <option value="Cerai">Cerai</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <CustomLabel
                      htmlFor="kewarganegaraan"
                      text="Kewarganegaraan"
                    />
                    <CustomInput
                      type="text"
                      id="kewarganegaraan"
                      name="kewarganegaraan"
                      value={citizenShip}
                      onChange={(e) => setCitizenShip(e.target.value)}
                      placeholder="Masukkan Kewarganegaraan"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="mb-4">
                    <CustomLabel
                      htmlFor="namaIbuKandung"
                      text="Nama Ibu Kandung"
                    />
                    <CustomInput
                      type="text"
                      id="namaIbuKandung"
                      name="namaIbuKandung"
                      value={motherName}
                      onChange={(e) => setMotherName(e.target.value)}
                      placeholder="Masukkan Nama Ibu Kandung"
                    />
                  </div>

                  <div className="mb-4">
                    <CustomLabel
                      htmlFor="alamat lengkap"
                      text="Alamat Lengkap"
                    />
                    <CustomInput
                      type="text"
                      id="alamat lengkap"
                      name="alamat lengkap"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Masukkan Alamat Lengkap "
                    />
                  </div>

                  <div className="mb-4">
                    <CustomLabel htmlFor="noHP" text="No. HP" />
                    <CustomInput
                      type="tel"
                      id="noHP"
                      name="noHP"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Masukkan No. HP"
                    />
                  </div>

                  <div className="mb-4">
                    <CustomLabel htmlFor="pendidikan" text="Pendidikan" />
                    <select
                      className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="pendidikan"
                      name="pendidikan"
                      value={education}
                      onChange={handleChangePendidikan}
                    >
                      <option value="">Pilih Pendidikan</option>
                      <option value="SD">SD</option>
                      <option value="SLTP">SLTP</option>
                      <option value="SLTA">SLTA</option>
                      <option value="Sarjana Muda">Sarjana Muda</option>
                      <option value="Sarjana">Sarjana</option>
                      <option value="Pascasarjana">Pascasarjana</option>
                      <option value="Doktoral">Doktoral</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                    {education === "Lainnya" && (
                      <CustomInput
                        id="lainnya"
                        name="lainnya"
                        value={lainnyaPendidikan}
                        onChange={handleLainnyaPendidikanChange}
                        className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan jenis identitas lainnya"
                        rows="4"
                      />
                    )}
                  </div>

                  <div className="mb-4">
                    <CustomLabel htmlFor="pekerjaan" text="Pekerjaan" />
                    <CustomInput
                      type="text"
                      id="pekerjaan"
                      name="pekerjaan"
                      value={jobStatus}
                      onChange={(e) => setJobStatus(e.target.value)}
                      placeholder="Masukkan Pekerjaan"
                    />
                  </div>

                  <div className="mb-4">
                    <CustomLabel
                      htmlFor="kategoriUsaha"
                      text="Kategori Usaha"
                    />
                    <select
                      className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      id="kategoriUsaha"
                      name="kategoriUsaha"
                      value={businessCategory}
                      onChange={handleChangeKategoriUsaha}
                    >
                      <option value="">Pilih Kategori Usaha</option>
                      <option value="Mikro">Mikro</option>
                      <option value="Kecil">Kecil</option>
                      <option value="Menengah">Menengah</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                    {businessCategory === "Lainnya" && (
                      <CustomInput
                        id="lainnya"
                        name="lainnya"
                        value={lainnyaKategoriUsaha}
                        onChange={handleLainnyaKategoriUsahaChange}
                        className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Masukkan jenis identitas lainnya"
                        rows="4"
                      />
                    )}
                  </div>

                  <div className="mb-4">
                    <CustomLabel
                      htmlFor="deskripsiUsaha"
                      text="Deskripsi Usaha"
                    />
                    <textarea
                      id="deskripsiUsaha"
                      name="deskripsiUsaha"
                      value={businessDesc}
                      onChange={(e) => setBusinessDesc(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 text-justify"
                      placeholder="Masukkan Deskripsi Usaha"
                      rows="4"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Form responsible */}
            <div className="max-w-lg p-5 flex-1 bg-white shadow-md rounded-lg">
              <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                Data Penanggung Jawab
              </h2>

              <div className="mb-4">
                <CustomLabel
                  htmlFor="penanggungJawab"
                  text="Penanggung Jawab "
                />
                <select
                  className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="penanggungJawab"
                  name="penanggungJawab"
                  value={responsible}
                  onChange={handleChangeResponsible}
                >
                  <option value="">Pilih Penanggung Jawab</option>
                  <option value="Suami">Suami</option>
                  <option value="Kakak Laki - laki">Kakak Laki - laki</option>
                  <option value="Adik Laki - laki">Adik Laki - laki</option>
                  <option value="Ayah">Ayah</option>
                  <option value="Lainnya">Lainnya</option>
                </select>

                {responsible === "Lainnya" && (
                  <CustomInput
                    id="lainnya"
                    name="lainnya"
                    value={lainnyaPenanggungJawab}
                    onChange={handleLainnyaPenanggungJawabChange}
                    className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan jenis penanggung jawab lainnya"
                  />
                )}
              </div>

              <div className="mb-4">
                <CustomLabel
                  htmlFor="jenisIdentitas"
                  text="jenis identitas Penaggung Jawab "
                />
                <select
                  className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  id="jenisIdentitas"
                  name="jenisIdentitas"
                  value={responsibleIdentity}
                  onChange={handleChangeResponsibleIdentity}
                >
                  <option value="">Pilih Jenis Identitas</option>
                  <option value="KTP">KTP</option>
                  <option value="KTM">KTM</option>
                  <option value="KTA">KTA</option>
                  <option value="Passport">Passport</option>
                  <option value="SIM">SIM</option>
                  <option value="Lainnya">Lainnya</option>
                </select>

                {responsibleIdentity === "Lainnya" && (
                  <CustomInput
                    id="lainnyaIdentitasPenanggungJawab"
                    name="lainnyaIdentitasPenanggungJawab"
                    value={lainnyaResponsibleIdentitas}
                    onChange={handleLainnyaResponsibleIdentitasChange}
                    className="mt-2 w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Masukkan jenis identitas lainnya"
                  />
                )}
              </div>

              <div className="mb-4">
                <CustomLabel
                  htmlFor="responsiblenoIdentitas"
                  text="No. Identitas Penaggung Jawab"
                />
                <CustomInput
                  type="text"
                  id="responsiblenoIdentitas"
                  name="responsiblenoIdentitas"
                  value={responsibleNoIdentity}
                  onChange={(e) => setResponsibleNoIdentity(e.target.value)}
                  placeholder="Masukkan No. Identitas"
                />
              </div>

              <div className="mb-4">
                <CustomLabel
                  htmlFor="responsibleName"
                  text="Nama Penanggung Jawab"
                />
                <CustomInput
                  type="text"
                  id="responsibleName"
                  name="responsibleName"
                  value={responsibleName}
                  onChange={(e) => setResponsibleName(e.target.value)}
                  placeholder="Masukkan Nama Penanggung Jawab"
                />
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
