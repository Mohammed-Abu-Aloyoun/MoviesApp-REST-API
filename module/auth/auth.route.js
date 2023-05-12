const router = require("express").Router();
const authContrller = require("./controller/auth.controller");
const auth = require("../../middleware/auth");
const schemaValidation = require("./auth.validation");
const validation = require("../../middleware/validation");

router.get("/",authContrller.home);
// register
router.post("/register",validation(schemaValidation),authContrller.register);
// confirm email
router.get("/confirmEmail/:token",authContrller.confirmEmail);
// login
router.get("/login",authContrller.login);

module.exports = router;
