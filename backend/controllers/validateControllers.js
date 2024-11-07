const { validasi, nasabah } = require("../models");

module.exports = {
  async validateDoc(req, res) {
    const id = req.params.id;
    try {
      let { perilaku, kehadiran, kerjasamaTim, kelengkapanBerkas } = req.body;

      const validOptions = [
        "sangat baik",
        "baik",
        "biasa",
        "tidak baik",
        "sangat tidak baik",
      ];
      const validFileOptions = ["lengkap", "tidak lengkap"];

      if (!kelengkapanBerkas) {
        kelengkapanBerkas = "complate";
      }
      console.log("perilaku", perilaku);
      console.log("kehadiran", kehadiran);
      console.log("kerjasamaTim", kerjasamaTim);
      console.log("kelengkapanBerkas", kelengkapanBerkas);

      if (!validOptions.includes(perilaku)) {
        return res.status(400).send({
          status: true,
          message: "Harus memilih salah satu dari opsi perilaku",
          data: { validasi: null },
        });
      }
      if (!validOptions.includes(kehadiran)) {
        return res.status(400).send({
          status: true,
          message: "Harus memilih salah satu dari opsi kehadiran",
          data: { validasi: null },
        });
      }
      if (!validOptions.includes(kerjasamaTim)) {
        return res.status(400).send({
          status: true,
          message: "Harus memilih salah satu dari opsi kerjasamaTim",
          data: { validasi: null },
        });
      }
      if (!validFileOptions.includes(kelengkapanBerkas)) {
        return res.status(400).send({
          status: true,
          message: "Harus memilih salah satu dari opsi file",
          data: { validasi: null },
        });
      }
      let perilakuScore =
        perilaku === "sangat baik"
          ? 5
          : perilaku === "baik"
          ? 4
          : perilaku === "biasa"
          ? 3
          : perilaku === "tidak baik"
          ? 2
          : 1;
      let kehadiranScore =
        kehadiran === "sangat baik"
          ? 5
          : kehadiran === "baik"
          ? 4
          : kehadiran === "biasa"
          ? 3
          : kehadiran === "tidak baik"
          ? 2
          : 1;
      let kerjasamaTimScore =
        kerjasamaTim === "sangat baik"
          ? 5
          : kerjasamaTim === "baik"
          ? 4
          : kerjasamaTim === "biasa"
          ? 3
          : kerjasamaTim === "tidak baik"
          ? 2
          : 1;
      let kelengkapanBerkasScore = kelengkapanBerkas === "lengkap" ? 5 : 1;

      console.log("perilakuScore :", perilakuScore);
      console.log("kehadiranScore :", kehadiranScore);
      console.log("kerjasamaTimScore :", kerjasamaTimScore);
      console.log("kelengkapanBerkasScore :", kelengkapanBerkasScore);

      const totalScore =
        0.3 * perilakuScore +
        0.4 * kehadiranScore +
        0.2 * kerjasamaTimScore +
        0.1 * kelengkapanBerkasScore;
      console.log("totalScore :", totalScore);

      const validateData = await validasi.create({
        perilaku,
        kehadiran,
        kerjasamaTim,
        kelengkapanBerkas,
        totalScore,
        nasabahId: id,
      });
      console.log(validateData);

      // Threshold untuk kelayakan
      const threshold = 3;

      if (!validateData) {
        return res.status(404).send({
          status: false,
          message: "Gagal melakukan validasi data",
          data: { validasi: null },
        });
      }

      if (totalScore <= threshold) {
        await nasabah.update(
          {
            status: "Berkas tidak lolos pengecekan sistem",
          },
          { where: { id: id } }
        );
        return res.status(200).send({
          status: true,
          message: "Berkas anda telah ditolak",
          data: { validasi: validateData },
        });
      } else {
        await nasabah.update(
          {
            status: "Berkas telah lolos pengecekan sistem",
          },
          { where: { id: id } }
        );
        return res.status(200).send({
          status: true,
          message: "Berkas anda telah diterima",
          data: { validasi: validateData },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { validasi: null },
      });
    }
  },
  async list(req, res) {
    try {
      const getValidateData = await validasi.findAll();
      if (getValidateData) {
        return res.status(200).send({
          status: true,
          message: "List data berkas yang telah divalidasi",
          data: { validasi: getValidateData },
        });
      } else {
        return res.status(404).send({
          status: false,
          message: "Tidak ada list data berkas yang sudah divalidasi",
          data: { validasi: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { validasi: null },
      });
    }
  },
};
