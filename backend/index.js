const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// controllers
const middleware = require("./middleware/authentication");
const userControllers = require("./controllers/userControllers");
const customerControllers = require("./controllers/customerControllers");
const validateControllers = require("./controllers/validateControllers");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "BERHASIL",
  });
});

// CRUD Admin
app.post("/api/v1/admin/register", userControllers.registerAdmin);
app.post("/api/v1/admin/login", userControllers.loginAdmin);
app.put(
  "/api/v1/admin/update/:id",
  middleware.authenticate,
  userControllers.updateAdmin
);
// app.put(
//   "/api/v1/admin/loan/update/:id",
//   middleware.authenticate,
//   middleware.roles,
//   userControllers.adminLoanUpdate
// );
// app.put(
//   "/api/v1/admin/loan/done/:id",
//   middleware.authenticate,
//   middleware.roles,
//   userControllers.adminLoanDone
// );
// app.put(
//   "/api/v1/admin/loan/rejected/:id",
//   middleware.authenticate,
//   middleware.roles,
//   userControllers.adminLoanReject
// );

// CRUD user
app.post("/api/v1/user/register", userControllers.registerUser);
app.post("/api/v1/user/login", userControllers.loginUser);
app.put(
  "/api/v1/user/update/:id",
  middleware.authenticate,
  userControllers.updateUser
);
app.delete(
  "/api/v1/user/delete/:id",
  middleware.authenticate,
  userControllers.deleteUser
);
app.get("/api/v1/user/list", userControllers.listUser);
app.get("/api/v1/user/:id", userControllers.getUserById);
app.get(
  "/api/v1/current/user",
  middleware.authenticate,
  userControllers.currentUser
);

// CRUD Customer
app.post(
  "/api/v2/customer/create",
  middleware.authenticate,
  customerControllers.create
);
app.put(
  "/api/v2/customer/update/:id",
  middleware.authenticate,
  customerControllers.update
);
app.delete(
  "/api/v2/customer/delete/:id",
  middleware.authenticate,
  customerControllers.delete
);
app.get("/api/v2/customer", middleware.authenticate, customerControllers.list);
app.get(
  "/api/v2/customer/status",
  middleware.authenticate,
  customerControllers.listByStatus
);
app.get(
  "/api/v2/customer/status/:status",
  middleware.authenticate,
  customerControllers.listAlltatus
);
app.get(
  "/api/v2/customer/status/acc",
  middleware.authenticate,
  customerControllers.listStatusAcc
);
app.get(
  "/api/v2/customer/status/rej",
  middleware.authenticate,
  customerControllers.listStatusRej
);
app.get(
  "/api/v2/customer/:id",
  middleware.authenticate,
  customerControllers.listByUserId
);
app.get(
  "/api/v2/get/customer/:id",
  middleware.authenticate,
  customerControllers.getCustomerById
);
// app.get(
//   "/api/v2/loan/wait/:id",
//   middleware.authenticate,
//   loanControllers.getWaitLoanByUserId
// );
// app.get(
//   "/api/v2/loan/proccess/:id",
//   middleware.authenticate,
//   loanControllers.getProccessLoanByUserId
// );
// app.get(
//   "/api/v2/loan/rejected/:id",
//   middleware.authenticate,
//   loanControllers.getRejectedLoanById
// );

// app.get(
//   "/api/v2/loan/status/update",
//   middleware.authenticate,
//   middleware.roles,
//   loanControllers.getLoanUpdate
// );
// app.get(
//   "/api/v2/loan/status/acc",
//   middleware.authenticate,
//   middleware.roles,
//   loanControllers.getLoanDone
// );
// app.get(
//   "/api/v2/loan/status/rejected",
//   middleware.authenticate,
//   middleware.roles,
//   loanControllers.getLoanRejected
// );

// Validate Document
app.post(
  "/api/v3/validate/create/:id",
  middleware.authenticate,
  middleware.roles,
  validateControllers.validateDoc
);
app.get("/api/v3/validate", middleware.authenticate, validateControllers.list);
app.use(express.json());
app.listen(process.env.PORT || 2020, function () {
  console.log(
    "Express server listening on port %d in %s mode",
    this.address().port,
    app.settings.env
  );
  console.log(`http://localhost:${this.address().port}`);
});
