const router = require("express").Router();
const UserCtrl = require("../Controllers/UserCtrl");
const User = require("../Models/User");
const { admin, protect } = require("../middleware/auth");

//login
router.post("/login", UserCtrl.login);
//register
router.post("/register", UserCtrl.register);
//check access token
router.post("/checkToken", UserCtrl.checkToken);
// all users
router.get("/users", protect, admin, UserCtrl.getUsers);
router.delete("/:id", protect, admin, UserCtrl.deleteUser);
router.put("/:id", protect, admin, UserCtrl.makeEditor);
// //list users,
// router.get("/", UserCtrl.AllUsers);
// //searshUser
// router.get("/searsh", UserCtrl.searshUsers);
// //get user
// router.get("/:id", UserCtrl.getUser);
// //edit User
// router.put("/:id", UserCtrl.editUser);

module.exports = router;
