const { where } = require("sequelize");
const { customer, responsible } = require("../models");
const { status } = require("express/lib/response");

module.exports = {
  async create(req, res) {
    try {
      const user_id = req.user.id;
      const {
        identity,
        noIdentity,
        name,
        born,
        gender,
        religion,
        merriedStatus,
        citizenShip,
        motherName,
        address,
        phoneNumber,
        education,
        jobStatus,
        businessCategory,
        businessDesc,
        responsibles,
      } = req.body;
      const createCustomer = await customer.create({
        userId: user_id,
        identity,
        noIdentity,
        name,
        born,
        gender,
        religion,
        merriedStatus,
        citizenShip,
        motherName,
        address,
        phoneNumber,
        education,
        jobStatus,
        businessCategory,
        businessDesc,
        status: "Your data will be processed",
      });

      if (!createCustomer) {
        return res.status(400).send({
          status: false,
          message: "Failed to create data",
          data: { customer: null },
        });
      }
      if (createCustomer) {
        console.log(createCustomer);
        await responsible.create({
          ...responsibles,
          customerId: createCustomer.id,
        });
        return res.status(200).send({
          status: true,
          message: "Successfuly to create data",
          data: { customer: createCustomer },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { customer: null },
      });
    }
  },
  async update(req, res) {
    try {
      const user_id = req.user.id;
      const { id } = req.params.id;
      const getCustomer = await customer.findByPk(id);
      const {
        identity,
        noIdentity,
        name,
        born,
        gender,
        religion,
        merriedStatus,
        citizenShip,
        motherName,
        address,
        phoneNumber,
        education,
        jobStatus,
        businessCategory,
        businessDesc,
        status,
      } = req.body;
      const updateCustomer = await getCustomer.update({
        userId: user_id,
        identity,
        noIdentity,
        name,
        born,
        gender,
        religion,
        merriedStatus,
        citizenShip,
        motherName,
        address,
        phoneNumber,
        education,
        jobStatus,
        businessCategory,
        businessDesc,
        status,
      });
      if (!updateCustomer) {
        return res.status(400).send({
          status: false,
          message: "Failed to update data",
          data: { customer: null },
        });
      }
      if (updateCustomer) {
        return res.status(200).send({
          status: true,
          message: "Successfuly to update data",
          data: { customer: updateCustomer },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { customer: null },
      });
    }
  },
  async delete(req, res) {
    try {
      const user_id = req.user.id;
      const { id } = req.params;
      const deletedCustomer = await customer.destroy({
        where: { id, userId: user_id },
      });
      if (!deletedCustomer) {
        return res.status(400).send({
          status: false,
          message: "Failed to deleted data",
          data: { customer: null },
        });
      }
      return res.status(200).send({
        status: true,
        message: "Successfuly to deleted data",
        data: { customer: deletedCustomer },
      });
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { customer: null },
      });
    }
  },
  async list(req, res) {
    try {
      const getCustomer = await customer.findAll({
        include: [
          {
            model: responsible,
            attributes: [
              "responsible",
              "responsibleIdentity",
              "responsibleNoIdentity",
              "responsibleName",
            ],
          },
        ],
      });
      if (getCustomer) {
        return res.status(200).send({
          status: true,
          message: "List data customer",
          data: { customer: getCustomer },
        });
      } else {
        return res.status(404).send({
          status: false,
          message: "Can't find a list customer",
          data: { customer: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { customer: null },
      });
    }
  },
  async listByStatus(req, res) {
    try {
      const getCustomer = await customer.findAll({
        where: { status: "Your data will be processed" },
        include: [
          {
            model: responsible,
            attributes: [
              "responsible",
              "responsibleIdentity",
              "responsibleNoIdentity",
              "responsibleName",
            ],
          },
        ],
      });
      if (getCustomer) {
        return res.status(200).send({
          status: true,
          message: "List data customer",
          data: { customer: getCustomer },
        });
      } else {
        return res.status(404).send({
          status: false,
          message: "Can't find a list customer",
          data: { customer: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { customer: null },
      });
    }
  },
  async listByUserId(req, res) {
    try {
      const { id } = req.params;
      const getCustomer = await customer.findAll({
        where: { userId: id },
        include: [
          {
            model: responsible,
            attributes: [
              "responsible",
              "responsibleIdentity",
              "responsibleNoIdentity",
              "responsibleName",
            ],
          },
        ],
      });
      if (getCustomer) {
        return res.status(200).send({
          status: true,
          message: "List data customer",
          data: { customer: getCustomer },
        });
      } else {
        return res.status(404).send({
          status: false,
          message: "Can't find a list customer",
          data: { customer: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { customer: null },
      });
    }
  },
  async listAlltatus(req, res) {
    try {
      const { status } = req.params;

      // Pemetaan status dari params ke status yang ada di database
      const statusMapping = {
        acc: "Document has been validate by system",
        process: "Your data will be processed",
        reject: "Document has been rejected by system",
      };

      // Cek apakah status dari params valid
      const mappedStatus = statusMapping[status];
      if (!mappedStatus) {
        return res.status(400).send({
          status: false,
          message: "Invalid status parameter",
          data: { customer: null },
        });
      }

      const getCustomer = await customer.findAll({
        where: {
          status: mappedStatus, // Menggunakan status yang sudah dipetakan
        },
        include: [
          {
            model: responsible,
            attributes: [
              "responsible",
              "responsibleIdentity",
              "responsibleNoIdentity",
              "responsibleName",
            ],
          },
        ],
      });

      if (getCustomer.length > 0) {
        return res.status(200).send({
          status: true,
          message: "List data customer",
          data: getCustomer,
        });
      } else {
        return res.status(404).send({
          status: false,
          message: "Can't find a list customer with this status",
          data: { customer: null },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { customer: null },
      });
    }
  },
  async listStatusAcc(req, res) {
    try {
      const getCustomerStatus = await customer.findAll({
        where: { status: "Document has been validate by system" },
        include: [
          {
            model: responsible,
            attributes: [
              "responsible",
              "responsibleIdentity",
              "responsibleNoIdentity",
              "responsibleName",
            ],
          },
        ],
      });
      if (!getCustomerStatus) {
        return res.status(404).send({
          status: false,
          message: "Tidak ada data status nasabah",
          data: { customer: null },
        });
      }
      if (getCustomerStatus) {
        return res.status(200).send({
          status: true,
          message: "List data status nasabah",
          data: { customer: getCustomerStatus },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { customer: null },
      });
    }
  },
  async listStatusRej(req, res) {
    try {
      const getCustomerStatus = await customer.findAll({
        where: { status: "Document has been rejected by system" },
        include: [
          {
            model: responsible,
            attributes: [
              "responsible",
              "responsibleIdentity",
              "responsibleNoIdentity",
              "responsibleName",
            ],
          },
        ],
      });
      if (!getCustomerStatus) {
        return res.status(404).send({
          status: false,
          message: "Tidak ada data status nasabah",
          data: { customer: null },
        });
      }
      if (getCustomerStatus) {
        return res.status(200).send({
          status: true,
          message: "List data status nasabah",
          data: { customer: getCustomerStatus },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Terjadi kesalahan pada server",
        data: { customer: null },
      });
    }
  },
  async getCustomerById(req, res) {
    try {
      const { id } = req.params;
      const getCustomer = await customer.findOne({
        where: { id: id },
        include: [
          {
            model: responsible,
            attributes: [
              "responsible",
              "responsibleIdentity",
              "responsibleNoIdentity",
              "responsibleName",
            ],
          },
        ],
      });
      if (!getCustomer) {
        return res.status(404).send({
          status: false,
          message: "Failed to get data customer",
          data: { customer: null },
        });
      }
      if (getCustomer) {
        return res.status(200).send({
          status: true,
          message: "Customer with data ",
          data: { customer: getCustomer },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: false,
        message: "Something error with the server",
        data: { customer: null },
      });
    }
  },
};
