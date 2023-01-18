const express = require("express");
const router = express.Router();
const cleanBody = require("../middlewares/cleanbody");

const CalendarController = require("../controllers/calendar.controller")

router.post("/create_event", cleanBody, CalendarController.CreateEvent);
router.get("/event_list", cleanBody, CalendarController.EventList);
router.get("/event_detail", cleanBody, CalendarController.EventDetail);

//routes todo:
//todo:
//1. kontroller
//2. router = suunab päringu kontrollerile
//3. model = andmebaasi kirjeldus
//4. router on vaja liita index-ile


module.exports = router;
