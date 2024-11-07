const { where } = require("sequelize");
const { nasabah, penanggungJawab } = require("../models");
const { status } = require("express/lib/response");

module.exports = {
  async create(req, res) {
    try {
      const user_id = req.user.id;
      const {
        identitas,
        noIdentitas,
        nama,
        ttl,
        jenisKelamin,
        agama,
        statusPerkawninan,
        kewarganegaraan,
        namaIbu,
        alamat,
        noHP,
        pendidikan,
        statusPekerjaan,
        kategoriBisnis,
        deskBisnis,
        penanggungJawabs,
      } = req.body;
      const createNasabah = await nasabah.create({
        userId: user_id,
        identitas,
        noIdentitas,
        nama,
        ttl,
        jenisKelamin,
        agama,
        statusPerkawninan,
        kewarganegaraan,
        namaIbu,
        alamat,
        noHP,
        pendidikan,
        statusPekerjaan,
        kategoriBisnis,
        deskBisnis,
        status: "Data anda akan segera diproses",
      });

      if (!createNasabah) {
        return res.status(400).send({
          status: false,
          message: "Gagal membuat data",
          data: { nasabah: null },
        });
      }
      if (createNasabah) {
        console.log(createNasabah);
        await penanggungJawab.create({
          ...penanggungJawabs,
          nasabahId: createNasabah.id,
        });
        return res.status(200).send({
          status: true,
          message: "Berhasil membuat data",
          data: { nasabah: createNasabah },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { nasabah: null },
      });
    }
  },
  async update(req, res) {
    try {
      const user_id = req.user.id;
      const { id } = req.params.id;
      const getNasabah = await nasabah.findByPk(id);
      const {
        identitas,
        noIdentitas,
        nama,
        ttl,
        jenisKelamin,
        agama,
        statusPerkawninan,
        kewarganegaraan,
        namaIbu,
        alamat,
        noHP,
        pendidikan,
        statusPekerjaan,
        kategoriBisnis,
        deskBisnis,
        status,
      } = req.body;
      const updateNasabah = await getNasabah.update({
        userId: user_id,
        identitas,
        noIdentitas,
        nama,
        ttl,
        jenisKelamin,
        agama,
        statusPerkawninan,
        kewarganegaraan,
        namaIbu,
        alamat,
        noHP,
        pendidikan,
        statusPekerjaan,
        kategoriBisnis,
        deskBisnis,
        status,
      });
      if (!updateNasabah) {
        return res.status(400).send({
          status: false,
          message: "Gagal melakukan update data",
          data: { nasabah: null },
        });
      }
      if (updateNasabah) {
        return res.status(200).send({
          status: true,
          message: "Berhasil melakukan update data",
          data: { nasabah: updateNasabah },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { nasabah: null },
      });
    }
  },
  async delete(req, res) {
    try {
      const user_id = req.user.id;
      const { id } = req.params;
      const deletedNasabah = await nasabah.destroy({
        where: { id, userId: user_id },
      });
      if (!deletedNasabah) {
        return res.status(400).send({
          status: false,
          message: "Gagal menghapus data",
          data: { nasabah: null },
        });
      }
      return res.status(200).send({
        status: true,
        message: "Berhasil menghapus data",
        data: { nasabah: deletedNasabah },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { nasabah: null },
      });
    }
  },
  async list(req, res) {
    try {
      const getNasabah = await nasabah.findAll({
        include: [
          {
            model: penanggungJawab,
            attributes: [
              "penanggungJawab",
              "identitasPenanggungJawab",
              "noIdentitasPenanggungJawab",
              "namaPenanggungJawab",
            ],
          },
        ],
      });
      if (getNasabah) {
        return res.status(200).send({
          status: true,
          message: "List data nasabah",
          data: { nasabah: getNasabah },
        });
      } else {
        return res.status(404).send({
          status: false,
          message: "Data nasabah tidak ditemukan",
          data: { nasabah: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { nasabah: null },
      });
    }
  },
  async listByStatus(req, res) {
    try {
      const getNasabah = await nasabah.findAll({
        where: { status: "Data anda akan segera diproses" },
        include: [
          {
            model: penanggungJawab,
            attributes: [
              "penanggungJawab",
              "identitasPenanggungJawab",
              "noIdentitasPenanggungJawab",
              "namaPenanggungJawab",
            ],
          },
        ],
      });
      if (getNasabah) {
        return res.status(200).send({
          status: true,
          message: "List data nasabah",
          data: { nasabah: getNasabah },
        });
      } else {
        return res.status(404).send({
          status: false,
          message: "Tidak ada list data nasabah",
          data: { nasabah: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { nasabah: null },
      });
    }
  },
  async listByUserId(req, res) {
    try {
      const { id } = req.params;
      const getNasabah = await nasabah.findAll({
        where: { userId: id },
        include: [
          {
            model: penanggungJawab,
            attributes: [
              "penanggungJawab",
              "identitasPenanggungJawab",
              "noIdentitasPenanggungJawab",
              "namaPenanggungJawab",
            ],
          },
        ],
      });
      if (getNasabah) {
        return res.status(200).send({
          status: true,
          message: "List data nasabah",
          data: { nasabah: getNasabah },
        });
      } else {
        return res.status(404).send({
          status: false,
          message: "Tidak da list data nasabah",
          data: { nasabah: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { nasabah: null },
      });
    }
  },
  async listAlltatus(req, res) {
    try {
      const { status } = req.params;

      // Pemetaan status dari params ke status yang ada di database
      const statusMapping = {
        acc: "Berkas telah lolos pengecekan sistem",
        process: "Data anda akan segera diproses",
        reject: "Berkas tidak lolos pengecekan sistem",
      };

      // Cek apakah status dari params valid
      const mappedStatus = statusMapping[status];
      if (!mappedStatus) {
        return res.status(400).send({
          status: false,
          message: "Invalid status parameter",
          data: { nasabah: null },
        });
      }

      const getNasabah = await nasabah.findAll({
        where: {
          status: mappedStatus, // Menggunakan status yang sudah dipetakan
        },
        include: [
          {
            model: penanggungJawab,
            attributes: [
              "penanggungJawab",
              "identitasPenanggungJawab",
              "noIdentitasPenanggungJawab",
              "namaPenanggungJawab",
            ],
          },
        ],
      });

      if (getNasabah.length > 0) {
        return res.status(200).send({
          status: true,
          message: "List data nasabah",
          data: getNasabah,
        });
      } else {
        return res.status(404).send({
          status: false,
          message: "Tidak ada list data nasabah dengan status tersebut",
          data: { nasabah: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { nasabah: null },
      });
    }
  },
  async listStatusAcc(req, res) {
    try {
      const getNasabahStatus = await nasabah.findAll({
        where: { status: "Berkas telah lolos pengecekan sistem" },
        include: [
          {
            model: penanggungJawab,
            attributes: [
              "penanggungJawab",
              "identitasPenanggungJawab",
              "noIdentitasPenanggungJawab",
              "namaPenanggungJawab",
            ],
          },
        ],
      });
      if (!getNasabahStatus) {
        return res.status(404).send({
          status: false,
          message: "Tidak ada data status nasabah",
          data: { nasabah: null },
        });
      }
      if (getNasabahStatus) {
        return res.status(200).send({
          status: true,
          message: "List data status nasabah",
          data: { nasabah: getNasabahStatus },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { nasabah: null },
      });
    }
  },
  async listStatusRej(req, res) {
    try {
      const getNasabahStatus = await nasabah.findAll({
        where: { status: "Berkas tidak lolos pengecekan sistem" },
        include: [
          {
            model: penanggungJawab,
            attributes: [
              "penanggungJawab",
              "identitasPenanggungJawab",
              "noIdentitasPenanggungJawab",
              "namaPenanggungJawab",
            ],
          },
        ],
      });
      if (!getNasabahStatus) {
        return res.status(404).send({
          status: false,
          message: "Tidak ada data status nasabah",
          data: { nasabah: null },
        });
      }
      if (getNasabahStatus) {
        return res.status(200).send({
          status: true,
          message: "List data status nasabah",
          data: { nasabah: getNasabahStatus },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { nasabah: null },
      });
    }
  },
  async getNasabahById(req, res) {
    try {
      const { id } = req.params;
      const getNasabah = await nasabah.findOne({
        where: { id: id },
        include: [
          {
            model: penanggungJawab,
            attributes: [
              "penanggungJawab",
              "identitasPenanggungJawab",
              "noIdentitasPenanggungJawab",
              "namaPenanggungJawab",
            ],
          },
        ],
      });
      if (!getNasabah) {
        return res.status(404).send({
          status: false,
          message: "Gagal mendapatkan data nasabah",
          data: { nasabah: null },
        });
      }
      if (getNasabah) {
        return res.status(200).send({
          status: true,
          message: "Data nasabah ",
          data: { nasabah: getNasabah },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { nasabah: null },
      });
    }
  },
};
