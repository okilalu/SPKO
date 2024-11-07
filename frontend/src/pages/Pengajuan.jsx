/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Pagepng from "../assets/img/page.png";
import BwmImage from "../assets/img/bwm.png";
import axios from "axios";
import { id } from "date-fns/locale";
import { FaFileDownload } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import { BiSort } from "react-icons/bi";
import { format } from "date-fns";
import {
  PDFDownloadLink,
  StyleSheet,
  Document,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { AiFillFilePdf } from "react-icons/ai";
import Pagination from "../components/Pagination";

const token = localStorage.getItem("token");

export default function Pengajuan({ user }) {
  const [daftarDoc, setDaftarDoc] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredDocs = daftarDoc
    ?.filter((item) => {
      const matchesStatus = selectedStatus
        ? item.status === selectedStatus
        : true;
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return new Date(b.createdAt) - new Date(a.createdAt); // Sort by latest
      } else {
        return new Date(a.createdAt) - new Date(b.createdAt); // Sort by oldest
      }
    });
  console.log(filteredDocs);

  const handleChangeStatus = (status) => {
    setSelectedStatus(status);
    setDropdownOpen(!dropdownOpen);
  };
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown
  };
  const handleSortOrder = (e) => {
    setSortOrder(e.target.value); // Update sort order
  };
  const itemsPengajuan = filteredDocs?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const validateLogin = async () => {
      try {
        if (user.role === "superadmin" || user.role === "admin") {
          const currentUserRequest = await axios.get(
            "http://localhost:2020/api/v2/customer",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const currentUserResponse = currentUserRequest.data;
          console.log(currentUserResponse);

          if (currentUserResponse.status) {
            setDaftarDoc(currentUserResponse.data.customer);
          }
        } else {
          const currentUserRequest = await axios.get(
            `http://localhost:2020/api/v2/customer/${user.id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const currentUserResponse = currentUserRequest.data;
          console.log(currentUserResponse);

          if (currentUserResponse.status) {
            setDaftarDoc(currentUserResponse.data.customer);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    validateLogin();
  }, [user]);

  // Define custom styles
  const styles = StyleSheet.create({
    page: {
      padding: 20,
      fontSize: 12,
      fontFamily: "Helvetica",
      lineHeight: 1.5,
    },
    title: {
      marginBottom: 10,
      textAlign: "center",
      fontSize: 20,
      fontFamily: "Helvetica",
      fontWeight: "bold",
    },
    table: {
      display: "table",
      width: "auto",
      marginBottom: 10,
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bdbdbd",
      fontSize: 12,
      fontFamily: "Courier",
    },
    tableRow: {
      flexDirection: "row",
    },
    tableColHeader: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bdbdbd",
      backgroundColor: "#f0f0f0",
      padding: 5,
      textAlign: "center",
    },
    tableCol: {
      width: "50%",
      borderStyle: "solid",
      borderWidth: 1,
      borderColor: "#bdbdbd",
      padding: 5,
    },
    responsiblesSection: {
      marginTop: 175,
    },
    responsibleTitle: {
      fontSize: 14,
      fontWeight: "bold",
      marginBottom: 5,
      textAlign: "center",
    },
    responsiveTable: {
      marginTop: 10,
    },
    image: {
      width: 75,
    },
    signatureSection: {
      marginTop: 20,
      textAlign: "right",
    },
    signaturePlaceholder: {
      marginTop: 40,
      marginBottom: 10,
      textAlign: "right",
      fontSize: 12,
      fontStyle: "italic",
    },
    signatureName: {
      fontSize: 12,
      fontWeight: "bold",
    },
    signatureNIP: {
      fontSize: 12,
    },
  });

  // Define the document component
  const MyDocument = ({ items }) => (
    <Document>
      <Page style={styles.page}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 12,
            marginBottom: 12,
            alignItems: "center",
            justifyContent: "center",
          }}
          fixed
        >
          <Image style={styles.image} src={BwmImage} />
          <View>
            <View>
              <Text style={{ fontSize: 12, fontWeight: "extrabold" }}>
                LEMBAGA KEUANGAN MIKRO SYARIAH - BANK WAKAF MIKRO
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "semibold" }}>
                LKMS-BWM AHMAD TAQIUDDIN MANSUR ATQIA
              </Text>
              <Text style={{ fontSize: 12, fontWeight: "extrabold" }}>
                BONDER - PRAYA BARAT - LOMBOK TENGAH -NTB
              </Text>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 10 }}>
                Jln. TGH. M. Shaleh Hambali No.1 Sangkong - Bonder{" "}
              </Text>
              <Text style={{ fontSize: 10 }}>WA. 081805200566</Text>
            </View>
          </View>
        </View>

        {/* Main Details Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Nama </Text>
            <Text style={styles.tableCol}>{items.nama}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Status </Text>
            <Text style={styles.tableCol}>{items.status}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>dibuat pada </Text>
            <Text style={styles.tableCol}>
              {format(new Date(items.createdAt), "EEEE, dd MMMM yyyy", {
                locale: id,
              })}
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Identitas </Text>
            <Text style={styles.tableCol}>{items.identitas}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>No. Identitas </Text>
            <Text style={styles.tableCol}>{items.noIdentitas}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Tempat/Tanggal Lahir </Text>
            <Text style={styles.tableCol}>{items.ttl}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Jenis Kelamin </Text>
            <Text style={styles.tableCol}>{items.jenisKelamin}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Agama </Text>
            <Text style={styles.tableCol}>{items.agama}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Status Perkawinan </Text>
            <Text style={styles.tableCol}>{items.statusPerkawninan}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Kewarganegaraan </Text>
            <Text style={styles.tableCol}>{items.kewarganegaraan}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Nama Ibu Kandung </Text>
            <Text style={styles.tableCol}>{items.namaIbu}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Alamat </Text>
            <Text style={styles.tableCol}>{items.alamat}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>No. HP </Text>
            <Text style={styles.tableCol}>{items.noHP}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Pendidikan </Text>
            <Text style={styles.tableCol}>{items.pendidikan}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Pekerjaan </Text>
            <Text style={styles.tableCol}>{items.statusPekerjaan}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Kategori Bisnis </Text>
            <Text style={styles.tableCol}>{items.kategoriBisnis}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCol}>Deskripsi Bisnis </Text>
            <Text style={styles.tableCol}>{items.deskBisnis}</Text>
          </View>
        </View>

        {/* Responsibles Section */}
        <View style={styles.responsiblesSection}>
          <Text style={styles.responsibleTitle}>Penanggung Jawab</Text>

          <View style={[styles.table, styles.responsiveTable]}>
            <View style={styles.tableRow}></View>
            {items &&
              items?.penanggungJawabs?.map((response, index) => (
                <React.Fragment key={index}>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Penanggung Jawab </Text>
                    <Text style={styles.tableCol}>
                      {response.penanggungJawab}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>
                      Identitas Penanggung Jawab
                    </Text>
                    <Text style={styles.tableCol}>
                      {response.identitasPenanggungJawab}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>No. Identitas </Text>
                    <Text style={styles.tableCol}>
                      {response.noIdentitasPenanggungJawab}
                    </Text>
                  </View>
                  <View style={styles.tableRow}>
                    <Text style={styles.tableCol}>Nama Penanggung Jawab </Text>
                    <Text style={styles.tableCol}>
                      {response.namaPenanggungJawab}
                    </Text>
                  </View>
                </React.Fragment>
              ))}
          </View>
        </View>

        {/* Signature Section */}
        {items &&
          items?.responsibles?.map((resp, index) => (
            <React.Fragment key={index}>
              <View style={styles.signatureSection}>
                <View>
                  <Text>Yang Menyatakan</Text>
                </View>
                <Text style={styles.signaturePlaceholder}>(Tanda Tangan)</Text>
                <Text style={styles.signatureName}>
                  Lalu Ocky Saktiya Luhung
                </Text>
                <Text style={styles.signatureNIP}>
                  NIP: {resp.responsibleNoIdentity}
                </Text>
              </View>
            </React.Fragment>
          ))}
      </Page>
    </Document>
  );

  return (
    <>
      <div className="" style={{ fontFamily: "Kanit" }}>
        <div className="min-h-screen flex bg-gray-100 pl-72">
          <div className="bg-white shadow-md rounded-lg p-8 flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="flex flex-col gap-4 min-h-screen justify-center items-center">
                  <div className="h-24 w-24 rounded-full animate-spin border-r-2 border-blue-400"></div>
                  <p className="text-xs text-black">Loading...</p>
                </div>
              </div>
            ) : daftarDoc && daftarDoc.length > 0 ? (
              <>
                <div className="border-b border-slate-700 mb-3">
                  <h2 className="text-2xl text-start font-semibold text-gray-800">
                    Data Pengajuan
                  </h2>
                  <p className="capitalize text-sm mb-3">
                    Kelola data hasil pengajuan nasabah
                  </p>
                </div>

                {/* Search filter input */}
                <div className="relative flex justify-end gap-2">
                  <div className="mb-4 relative">
                    <div className="absolute translate-x-[6px] translate-y-[6px]">
                      <CiSearch size={27} />
                    </div>
                    <input
                      type="text"
                      className="pl-10 w-62 p-2 border border-gray-300 rounded-lg hover:ring-1 ring-red-200 focus:ring-1 outline-none"
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

                  <button
                    className="mb-4 relative p-2 border border-gray-300 rounded-md hover:ring-1 ring-red-200 focus:ring-1 flex items-center justify-center gap-2"
                    onClick={toggleDropdown}
                  >
                    <div className="">
                      <IoFilterOutline size={20} />
                    </div>
                    <p className="" placeholder="Filter" value="">
                      Filter
                    </p>
                    {dropdownOpen && ( // Render dropdown hanya saat dropdownOpen true
                      <div className="absolute top-10 right-0 mt-1 border border-gray-300 bg-white rounded-md shadow-lg z-10">
                        <div
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleChangeStatus("")} // Untuk memilih 'Semua'
                        >
                          Semua
                        </div>
                        <div
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleChangeStatus("Data anda akan segera diproses")
                          } // Untuk memilih 'Semua'
                        >
                          Diproses
                        </div>
                        <div
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleChangeStatus(
                              "Berkas telah lolos pengecekan sistem"
                            )
                          }
                        >
                          Diterima
                        </div>
                        <div
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() =>
                            handleChangeStatus(
                              "Berkas tidak lolos pengecekan sistem"
                            )
                          }
                        >
                          Ditolak
                        </div>
                      </div>
                    )}
                  </button>

                  <button className="mb-4 relative p-2 border border-gray-300 rounded-md hover:ring-1 ring-red-200 focus:ring-1 flex items-center justify-center gap-2">
                    <div className="">
                      <BiSort size={20} />
                    </div>
                    <p className="" placeholder="Filter" value="">
                      Sort By
                    </p>
                    <select
                      value={sortOrder}
                      onChange={handleSortOrder}
                      className="block w-[15px] outline-none"
                    >
                      <option value="asc">Terbaru</option>
                      <option value="desc">Terlama</option>
                    </select>
                  </button>
                </div>

                <div className="gap-3">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Nama</th>
                        <th className="text-center">Tanggal Dibuat</th>
                        <th className="text-center">Status</th>
                        <th>Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsPengajuan.length > 0 ? (
                        itemsPengajuan.map((items) => {
                          const formattedDate = format(
                            new Date(items.createdAt),
                            "EEEE, dd MMMM yyyy",
                            { locale: id }
                          );
                          return (
                            <tr key={items.id}>
                              <td>
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`items-center justify-center border rounded-lg w-12 h-12 content-center ${
                                      items.status ===
                                      "Berkas telah lolos pengecekan sistem"
                                        ? "border-green-500"
                                        : items.status ===
                                          "Berkas tidak lolos pengecekan sistem"
                                        ? "border-red-500"
                                        : "border-blue-500"
                                    }`}
                                  >
                                    <p
                                      className={`text-center  ${
                                        items.status ===
                                        "Berkas telah lolos pengecekan sistem"
                                          ? "text-green-500"
                                          : items.status ===
                                            "Berkas tidak lolos pengecekan sistem"
                                          ? "text-red-500"
                                          : "text-blue-500"
                                      }`}
                                    >
                                      {items.name.charAt(0)}
                                    </p>
                                  </div>
                                  <div>
                                    <div
                                      className={`font-bold ${
                                        items.status ===
                                        "Berkas telah lolos pengecekan sistem"
                                          ? "text-green-500"
                                          : items.status ===
                                            "Berkas tidak lolos pengecekan sistem"
                                          ? "text-red-500"
                                          : "text-blue-500"
                                      }`}
                                    >
                                      {items.name}
                                    </div>
                                    <div className="text-sm opacity-50">
                                      {items.noIdentity}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center">{formattedDate}</td>
                              <td className="flex items-center justify-center">
                                <p
                                  className={`w-1/2 text-center text-xs rounded-md py-1 ${
                                    items.status ===
                                    "Berkas telah lolos pengecekan sistem"
                                      ? "text-green-700 bg-green-200"
                                      : items.status ===
                                        "Berkas tidak lolos pengecekan sistem"
                                      ? "text-red-700 bg-red-200"
                                      : "text-blue-700 bg-blue-200"
                                  }`}
                                  style={{ fontFamily: "Kanit" }}
                                >
                                  {items.status}
                                </p>
                              </td>
                              <th>
                                <button className="">
                                  <PDFDownloadLink
                                    document={<MyDocument items={items} />}
                                    fileName={`${items.name}.pdf`}
                                    className=""
                                  >
                                    <AiFillFilePdf size={27} color="#f51d16" />
                                  </PDFDownloadLink>
                                </button>
                              </th>
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
                {filteredDocs.length > itemsPerPage && (
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    totalItems={filteredDocs.length}
                  />
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <img src={Pagepng} alt="" className="w-[250px]" />
                <h2 className="font-semibold text-3xl text-center">
                  Tidak ada document
                </h2>
              </div>
            )}
            {/* <Pagination
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              totalItems={filteredDocs.length}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
}
