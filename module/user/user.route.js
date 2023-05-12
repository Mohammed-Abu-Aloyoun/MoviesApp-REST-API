const router = require("express").Router() 
const userController = require("./controller/user.controller");
const auth = require("../../middleware/auth");

router.get("/",userController.home);
// update password
router.get("/updatePassword",auth(),userController.updatePassword);
// forget password
router.get("/forgetPassword",userController.forgetPassword);
// recover account 
router.patch("/recoverAccount/:id",userController.recoverAccount);
module.exports = router;