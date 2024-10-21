const jwt = require("jsonwebtoken");
const { JWT, ROLES } = require("../lib/const");
const { User } = require("../models");

module.exports = {
  async authenticate(req, res, next) {
    try {
      // Ambil header Authorization
      const authHeader = req.get("Authorization");

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).send({
          status: false,
          message: "Harus login terlebih dahulu untuk mendapatkan halaman ini",
          data: null,
        });
      }

      // Ambil token dari header
      const token = authHeader.split(" ")[1];

      // Jika token tidak ada
      if (!token) {
        return res.status(401).send({
          status: false,
          message: "Token tidak ditemukan",
          data: null,
        });
      }

      // Log token untuk debugging
      console.log("Token yang diterima:", token);

      // Verifikasi token JWT
      const decoded = jwt.verify(token, JWT.SECRET);

      // Ambil username dari token yang terdecode
      const { username } = decoded;
      console.log("Username dari token:", username);

      // Cari user di database berdasarkan username
      const getUser = await User.findOne({ where: { username } });
      if (!getUser) {
        return res.status(401).send({
          status: false,
          message: "Token tidak valid: Pengguna tidak ditemukan",
          data: null,
        });
      }

      // Simpan user di request untuk digunakan di middleware selanjutnya
      req.user = getUser;
      next();
    } catch (error) {
      // Tangani error token
      console.error("Error pada verifikasi token:", error.message);
      return res.status(401).send({
        status: false,
        message: `Token tidak valid: ${error.message}`,
        data: null,
      });
    }
  },

  async isSuperAdmin(req, res, next) {
    const user = req.user;

    if (user && user.role === ROLES.SUPERADMIN) {
      return next();
    }
    return res.status(403).send({
      status: false,
      message: "Harus menjadi superadmin untuk mengakses halaman ini",
      data: null,
    });
  },

  async roles(req, res, next) {
    const user = req.user;

    if (user.role === ROLES.SUPERADMIN || user.role === ROLES.ADMIN) {
      return next();
    }
    return res.status(403).send({
      status: false,
      message: "Akun ini tidak memiliki izin",
      data: null,
    });
  },
};
