const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT, ROLES } = require("../lib/const");
const { User, loan, customer } = require("../models");
const { Op } = require("sequelize");

module.exports = {
  async registerAdmin(req, res) {
    try {
      const { password, email } = req.body;
      if (password.length < 8) {
        return res.status(401).send({
          status: false,
          message: "Password minimal 8 karakter",
          data: { admin: null },
        });
      }
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(402).send({
          status: false,
          message: "Email sudah didaftarkan",
          data: { admin: null },
        });
      }
      const admin = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(password, JWT.SALT_ROUND),
        role: ROLES.ADMIN,
      });
      return res.status(200).send({
        status: true,
        message: "Berhasil melakukan registrasi admin",
        data: { admin: admin },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { admin: null },
      });
    }
  },
  async registerUser(req, res) {
    try {
      const { password, email } = req.body;
      if (password.length < 8) {
        return res.status(401).send({
          status: false,
          message: "Password minimal 8 karakter",
          data: { user: null },
        });
      }
      const existingEmail = await User.findOne({ where: { email } });
      if (existingEmail) {
        return res.status(402).send({
          status: false,
          message: "Email sudah didaftarkan",
          data: { user: null },
        });
      }
      const user = await User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: await bcrypt.hash(password, JWT.SALT_ROUND),
        role: ROLES.USER,
      });
      return res.status(200).send({
        status: true,
        message: "Berhasil melakukan registrasi",
        data: { user: user },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Gagal melakukan registrasi",
        data: { user: null },
      });
    }
  },
  async loginAdmin(req, res) {
    try {
      const { username, password } = req.body;
      const admin = await User.findOne({ where: { username } });
      if (!admin) {
        res.status(404).send({
          status: false,
          message: "Akun tidak ditemukan",
          data: { admin: null },
        });
        return;
      }
      const isPasswordCorrect = bcrypt.compareSync(password, admin.password);

      if (!isPasswordCorrect) {
        res.status(402).send({
          status: false,
          message: "Password tak sama",
          data: { admin: null },
        });
        return;
      } else {
        const token = jwt.sign(
          {
            id: admin.id,
            name: admin.name,
            username: admin.username,
          },
          JWT.SECRET
        );
        return res.status(200).send({
          status: true,
          message: "Berhasil Login",
          data: { token },
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { admin: null },
      });
    }
  },
  async loginUser(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      if (!user) {
        res.status(404).send({
          status: false,
          message: "Akun tidak di temukan ",
          data: { user: null },
        });
        return;
      }
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);

      if (!isPasswordCorrect) {
        res.status(402).send({
          status: false,
          message: "Password tak sama ",
          data: { user: null },
        });
        return;
      }
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          username: user.username,
        },
        JWT.SECRET
      );
      return res.status(200).send({
        status: true,
        message: "Berhasil Login",
        data: { token },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { user: null },
      });
    }
  },
  async currentUser(req, res) {
    const currentUser = req.user;
    return res.status(200).send({
      status: true,
      message: "Mendapatkan User",
      data: { user: currentUser },
    });
  },
  async updateAdmin(req, res) {
    try {
      const { id } = req.params;
      const getAdmin = await User.findByPk(id);
      if (!getAdmin) {
        return res.status(404).send({
          status: false,
          message: "Akun tidak ditemukan",
          data: { admin: null },
        });
      }
      const { name, username, email } = req.body;
      const updateAdmin = getAdmin.update({
        name,
        username,
        email,
      });
      return res.status(200).send({
        status: true,
        message: "Admin berhasil di perbarui",
        data: { admin: updateAdmin },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Admin tidak di temukan",
        data: { admin: null },
      });
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const getUser = await User.findByPk(id);
      if (!getUser) {
        return res.status(404).send({
          status: false,
          message: "Akun tidak ditemukan",
          data: { user: null },
        });
      }
      const { name, username, email } = req.body;
      const updateUser = await getUser.update({
        name,
        username,
        email,
      });

      const token = jwt.sign(
        {
          id: updateUser.id,
          name: updateUser.name,
          username: updateUser.username,
        },
        JWT.SECRET
      );
      return res.status(200).send({
        status: true,
        message: "Berhasil melakukan update",
        data: { user: updateUser, token },
      });
    } catch (error) {
      console.log(error);

      return res.status(500).send({
        status: false,
        message: "Gagal melakukan update",
        data: { user: null },
      });
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await User.destroy({ where: { id } });
      if (!result) {
        return res.status(404).send({
          status: false,
          message: "User Tidak ditemukan",
          data: { user: null },
        });
      }
      return res.status(200).send({
        status: true,
        message: "Akun berhasil dihapus",
        data: { user: result },
      });
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { user: null },
      });
    }
  },
  async listUser(req, res) {
    try {
      const user = await User.findAll();
      return res.status(200).send({
        status: true,
        message: "List user",
        data: { user: user },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Gagal mendapatkan semua user",
        data: { user: null },
      });
    }
  },
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).send({
          status: false,
          message: "User tidak ditemukan",
          data: { user: null },
        });
      }
      if (user) {
        return res.status(200).send({
          status: true,
          message: "Berhasil mendapatkan user",
          data: { user: user },
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { user: null },
      });
    }
  },
  async adminValidateDoc(req, res) {
    try {
      const { id } = req.params;
      const getDocument = await customer.findByPk(id);
      if (!getDocument) {
        return res.status(401).send({
          status: false,
          message: "Can't find a document",
          data: { admin: null },
        });
      } else {
        const updateDocument = await getDocument.update({
          status: "Sedang diproses",
        });
        return res.status(200).send({
          status: true,
          message: "Status pengaduan diperbarui ke 'sedang diproses'",
          data: { admin: updateDocument },
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Gagal memperbarui status pengaduan",
        data: { admin: null },
      });
    }
  },
  async adminLoanUpdate(req, res) {
    try {
      const { id } = req.params;
      const getLoan = await loan.findByPk(id);
      if (!getLoan) {
        return res.status(404).send({
          status: false,
          message: "Can't find loans",
          data: { admin: null },
        });
      } else {
        const updatedLoan = await getLoan.update({
          status: "Loan in proccess",
        });
        if (updatedLoan) {
          return res.status(200).send({
            status: true,
            message: "Loan status updated to 'Loan in proccess'",
            data: { admin: updatedLoan },
          });
        }
        return res.status(400).send({
          status: false,
          message: "Failed updated loan status",
          data: { admin: null },
        });
      }
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { admin: null },
      });
    }
  },
  async adminLoanDone(req, res) {
    try {
      const { id } = req.params;
      const getLoan = await loan.findByPk(id);
      if (!getLoan) {
        return res.status(404).send({
          status: false,
          message: "Can't find loans",
          data: { admin: null },
        });
      }
      const loanDone = await getLoan.update({
        status: "Loan has been approved",
      });
      return res.status(200).send({
        status: true,
        message: "Loan status updated to 'Loan has been approved'",
        data: { admin: loanDone },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { admin: null },
      });
    }
  },
  async adminLoanReject(req, res) {
    try {
      const loanId = req.params.id; // Atau req.body.id tergantung bagaimana ID dikirimkan
      const getLoan = await loan.findOne({ where: { id: loanId } });
      if (!getLoan) {
        return res.status(404).send({
          status: false,
          message: "Can't find loans",
          data: { loan: null },
        });
      }
      // Perbarui status pengajuan pinjaman menjadi "ditolak"
      getLoan.status = "Loan rejected by sistem";
      await getLoan.save();

      // Mengirim respons sukses
      return res.status(200).send({
        status: true,
        message: "Loan rejected by system and data stored to database.",
        data: { loan: getLoan },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { loan: null },
      });
    }
  },
};
