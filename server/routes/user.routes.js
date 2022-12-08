const express = require("express");
const router = express.Router();
const cleanBody = require("../middlewares/cleanbody");
const AuthController = require("../controllers/user.controller");
const { validateToken } = require("../middlewares/validateToken");



router.post("/signup", cleanBody, AuthController.Signup);
router.post("/login", cleanBody, AuthController.Login);
router.patch("/activate", cleanBody, AuthController.Activate);
router.patch("/forgot", cleanBody, AuthController.ForgotPassword);
router.patch("/reset", cleanBody, AuthController.ResetPassword);
router.get("/:id", AuthController.UserProfile);
//router.get("/:id", validateToken, AuthController.UserProfile);
//router.get("/userinfo", AuthController.UserInfo);
router.put("/update/:id", AuthController.UpdateUser);
//router.delete("/deleteuserinfo", AuthController.DeleteUserInfo);
//router.get("/newuserinfo", AuthController.NewUserInfo);

module.exports = router;


