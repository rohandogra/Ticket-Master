const express = require("express");
const router = express.Router();

const customerController = require("../app/controllers/customerController");
const departmentController = require("../app/controllers/departmentController");
const ticketsController = require("../app/controllers/ticketsController");
const employeesController = require("../app/controllers/employeesController");
const userController = require("../app/controllers/userController");
const { auth } = require("../app/controllers/middlewares/authenticate");

//! Customers Routes
router.get("/customers", auth, customerController.list);
router.get("/customers/:id", auth, customerController.show);
router.post("/customers", auth, customerController.create);
router.delete("/customers/:id", auth, customerController.destroy);
router.put("/customers/:id", auth, customerController.update);

//! Departmemnts Routes
router.get("/departments", auth, departmentController.show);
router.get("/departments/:id", auth, departmentController.showID);
router.post("/departments", auth, departmentController.create);
router.delete("/departments/:id", auth, departmentController.destroy);
router.put("/departments/:id", auth, departmentController.update);

//! Employees Routes
router.post("/employees", auth, employeesController.create);
router.get("/employees", auth, employeesController.show);
router.get("/employees/:id", auth, employeesController.showId);
router.put("/employees/:id", auth, employeesController.update);
router.delete("/employees/:id", auth, employeesController.destroy);
//! Tickets Routes
router.post("/tickets", auth, ticketsController.create);
router.get("/tickets", auth, ticketsController.show);
router.get("/tickets/:id", auth, ticketsController.showID);
router.put("/tickets/:id", auth, ticketsController.update);
router.delete("/tickets/:id", auth, ticketsController.destroy);

//! register Route
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;
