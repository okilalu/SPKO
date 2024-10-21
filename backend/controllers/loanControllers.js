const { loan, customer } = require("../models");
const { ROLES } = require("../lib/const");

module.exports = {
  calculatePreference(a, b) {
    return a > b ? 1 : a < b ? -1 : 0;
  },

  calculateScore(customer) {
    const skorKreditWeight = 0.4;
    const tingkatPendapatanWeight = 0.3;
    const statusPekerjaanWeight = 0.2;
    const rasioHutangTerhadapPendapatanWeight = 0.1;

    let score = 0;
    score += skorKreditWeight * calculatePreference(customer.skorKredit, 650); // Misalnya, batas skor kredit 650
    score +=
      tingkatPendapatanWeight *
      calculatePreference(customer.tingkatPendapatan, 5000000); // Misalnya, batas pendapatan 5 juta
    score +=
      statusPekerjaanWeight * (customer.statusPekerjaan === "Tetap" ? 1 : -1);
    score +=
      rasioHutangTerhadapPendapatanWeight *
      calculatePreference(40, customer.rasioHutangTerhadapPendapatan); // Misalnya, rasio maksimal 40%

    return score;
  },
  async createLoan(req, res) {
    try {
      const user_id = req.user.id;
      console.log("user_id : ", user_id);
      const { customers, loanValue, debtToIncomeRatio, previousLoanHistory } =
        req.body;
      const loanApply = await loan.create({
        userId: user_id,
        loanValue,
        debtToIncomeRatio,
        previousLoanHistory,
        status: "Loan will be processed",
      });
      if (!loanApply) {
        return res.status(400).send({
          status: false,
          message: "Failed to apply loan",
          data: { loan: null },
        });
      }
      if (loanApply) {
        for (const cus of customers) {
          await customer.create({
            ...cus,
            loanId: loanApply.id,
          });
        }
        return res.status(200).send({
          status: true,
          message: "Successfully apply a loan",
          data: { loan: loanApply },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Error when apply a loan",
        data: { loan: null },
      });
    }
  },
  async updateLoan(req, res) {
    try {
      const user_id = req.user.id;
      const id = req.params.id;
      const getLoanById = await loan.findOne({
        where: {
          id: id,
        },
        include: [
          {
            model: customer,
            attributes: ["id", "name", "loanId"],
          },
        ],
      });
      if (!getLoanById) {
        console.log(" getLoanById: ", getLoanById);
        return res.status(404).send({
          status: false,
          message: "Can't find a loan",
          data: { loan: null },
        });
      }
      const { customers, loanValue, debtToIncomeRatio, previousLoanHistory } =
        req.body;

      const updatedLoan = await getLoanById.update({
        userId: user_id,
        loanValue,
        debtToIncomeRatio,
        previousLoanHistory,
      });
      const updateCustomer = [];
      for (const cus of customers) {
        const { customerId, ...customerData } = cus;
        if (customerId) {
          await customer.update(
            { ...customerData },
            {
              where: {
                id: customerId,
                loanId: id,
              },
            }
          );
          updateCustomer.push(customerData);
        } else {
          const createCustomer = await customer.create({
            ...customerData,
            loanId: id,
          });
          updateCustomer.push(createCustomer);
        }
      }
      if (updatedLoan) {
        return res.status(200).send({
          status: true,
          message: "Successfully updated a loan",
          data: { loan: updatedLoan },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Error when updated a loan",
        data: { loan: null },
      });
    }
  },
  async deleteLoan(req, res) {
    try {
      const user_id = req.user.id;
      const { id } = req.params;
      const result = await loan.findOne({
        where: { id, userId: user_id },
        include: [
          {
            model: customer,
            attributes: ["id", "loanId"],
          },
        ],
      });
      if (!result) {
        return res.status(404).send({
          deletedby: req.result,
          message: "Can't find a loan",
        });
      }
      await customer.destroy({ where: { loanId: id } });
      await loan.destroy({ where: { id, userId: user_id } });

      return res.status(200).send({
        status: true,
        message: "Successfuly deleted a loan",
        data: { loan: result },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Error when deleted a loan",
        data: { loan: null },
      });
    }
  },
  async listLoan(req, res) {
    try {
      const getLoan = await loan.findAll();
      if (getLoan) {
        return res.status(200).send({
          status: true,
          massage: "List Loan",
          data: { loan: getLoan },
        });
      } else {
        return res.status(404).send({
          status: false,
          massage: "Can't find list loan",
          data: { loan: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.send(500).send({
        status: false,
        massage: "Something error with the server",
        data: { loan: null },
      });
    }
  },
  async checkLoan(req, res) {
    try {
    } catch (error) {}
  },
  async loanRejected(req, res) {
    try {
      const { id } = req.body;

      const customers = await customer.findByPk(id);
      if (!customer) {
        return res.status(404).send({
          status: false,
          message: "Can't find customers",
          data: { loan: null },
        });
      }

      const score = calculateScore(customers);

      if (score < 0) {
        return res.status(200).send({
          rejected: true,
          message: "Loan rejected based on PROMETHEE analysis",
        });
      } else {
        return res.status(200).send({
          rejected: false,
          message: "Loan accepted based on PROMETHEE analysis",
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { loan: null },
      });
    }
  },
  async getWaitLoanByUserId(req, res) {
    try {
      const userId = req.user.id;
      const status = "Loan will be processed";
      const role = req.user.role;

      let results;

      if (role === "admin" || role === "superadmin") {
        results = await loan.findAll({ where: { status: status } });
      } else {
        results = await loan.findAll({
          where: { status: status, userId: userId },
        });
      }

      if (!results) {
        return res.status(404).send({
          status: false,
          message: "Can't find loans",
          data: { loan: null },
        });
      }
      if (results) {
        return res.status(200).send({
          status: true,
          message: "List Loan status waiting",
          data: { loan: results },
        });
      }
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { loan: null },
      });
    }
  },
  async getProccessLoanByUserId(req, res) {
    try {
      const userId = req.user.id;
      const status = "Loan in proccess";
      const role = req.user.role;

      let results;

      if (role === "admin" || role === "superadmin") {
        results = await loan.findAll({ where: { status: status } });
      } else {
        results = await loan.findAll({
          where: { status: status, userId: userId },
        });
      }

      if (!results) {
        return res.status(404).send({
          status: false,
          message: "Can't find loans",
          data: { loan: null },
        });
      }
      if (results) {
        return res.status(200).send({
          status: true,
          message: "List Loan status in proccess",
          data: { loan: results },
        });
      }
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { loan: null },
      });
    }
  },
  async getRejectedLoanById(req, res) {
    try {
      const userId = req.user.id;
      const status = "Loan Rejected";
      const role = req.user.role;

      let results;

      if (role === "admin" || role === "superadmin") {
        results = await loan.findAll({ where: { status: status } });
      } else {
        results = await loan.findAll({
          where: { status: status, userId: userId },
        });
      }

      if (!results) {
        return res.status(404).send({
          status: false,
          message: "Can't find loans",
          data: { loan: null },
        });
      }
      if (results) {
        return res.status(200).send({
          status: true,
          message: "List Loan status rejected",
          data: { loan: results },
        });
      }
    } catch (error) {
      res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { loan: null },
      });
    }
  },
  async getLoanUpdate(req, res) {
    try {
      const status = "Loan in proccess";
      const getLoans = await loan.findOne({ where: { status } });

      if (!getLoans) {
        return res.status(404).send({
          status: false,
          message: "Can't find  loans",
          data: { loan: null },
        });
      }
      return res.status(200).send({
        status: true,
        message: "List Loans",
        data: { loan: getLoans },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { loan: null },
      });
    }
  },
  async getLoanDone(req, res) {
    try {
      const status = "Loan has been approved";
      const getloans = await loan.findOne({ where: { status } });

      if (!getloans) {
        return res.status(404).send({
          status: false,
          message: "Can't find a loans",
          data: { loan: null },
        });
      }
      return res.status(200).send({
        status: true,
        message: "List loans",
        data: { loan: getloans },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { loan: null },
      });
    }
  },
  async getLoanRejected(req, res) {
    try {
      const status = "Loan rejected by sistem";
      const getloans = await loan.findOne({ where: { status } });

      if (!getloans) {
        return res.status(404).send({
          status: false,
          message: "Can't find a loans",
          data: { loan: null },
        });
      }
      return res.status(200).send({
        status: true,
        message: "List loans",
        data: { loan: getloans },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { loan: null },
      });
    }
  },
};
