const express = require("express");
const router = express.Router();
const employeeControllers = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");
const roles = require('../../config/userRoles');
const checkRoles = require('../../middleware/verifyRoles');

router
  .route("/")
  .get(checkRoles(roles.user),employeeControllers.getAllEmployees)
  .post(checkRoles(roles.admin),employeeControllers.createEmployee)
  .put(employeeControllers.updateEmployee)
  .delete(checkRoles(roles.admin),employeeControllers.deleteEmployee);

router.route("/:id").get(employeeControllers.getEmployee);

module.exports = router;
