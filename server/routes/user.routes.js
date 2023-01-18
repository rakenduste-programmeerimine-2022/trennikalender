const express = require("express");
const router = express.Router();
const cleanBody = require("../middlewares/cleanbody");
const AuthController = require("../controllers/user.controller");
const { validateToken } = require("../middlewares/validateToken");

//const CalendarController = require("../controllers/calendar.controller")

router.post("/signup", cleanBody, AuthController.Signup);
router.post("/login", cleanBody, AuthController.Login);
router.patch("/activate", cleanBody, AuthController.Activate);
router.patch("/forgot", cleanBody, AuthController.ForgotPassword);
router.patch("/reset", cleanBody, AuthController.ResetPassword);
//router.get("/logout", validateToken, AuthController.Logout);

//https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes
/*
app.use("/", indexRouter);
app.use("/users", usersRouter);
if (kasutaja_on_sisseloginud && kasutaja_tyyp=="admin") {
    app.use("/admin", catalogRouter); // Add catalog routes to middleware chain.
}
*/

//routes todo:
//todo:
//1. kontroller
//2. router = suunab päringu kontrollerile
//3. model = andmebaasi kirjeldus
//

//create_event; event_detail; event_list(dateFrom,dateTo)



module.exports = router;
