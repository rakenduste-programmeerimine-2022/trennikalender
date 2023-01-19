const Joi = require("joi");
require("dotenv").config();
const Calendar = require("../models/calendar.model");

exports.CreateEvent = async (req, res) => {
    try {
        const result = calendarSchema.validate(req.body);
        if (result.error) {
            console.log(result.error.message);
            return res.json({
              error: true,
              status: 400,
              result: "error",
              message: "Palun kontrolli andmeid!",
        });
    }
}
    catch (err) {
        console.error("calendarCreate-error", err);
        return res.status(500).json({
            err: true,
            message: "Eventi loomine ei õnnestunud",
        });
    }
}  


exports.EventList = async (req, res) => {
    try {
        if (result.error) {
            console.log(result.error.message);
            return res.json({
              error: true,
              status: 400,
              result: "error",
              message: "Palun kontrolli andmeid!",
        });
    }
    }
    catch (err) {
        console.error("calendarEventlist-error", err);
        return res.status(500).json({
            err: true,
            message: "Event ei õnnestunud",
        });
    }
}

exports.EventDetail = async (req, res) => {
    try {
        if (result.error) {
            console.log(result.error.message);
            return res.json({
              error: true,
              status: 400,
              result: "error",
              message: "Palun kontrolli andmeid!",
        });
        }
    }
    catch (err) {
        console.error("calendarDetail-error", err);
        return res.status(500).json({
            err: true,
            message: "Eventi lugemine ei õnnestunud",
        });
    }

}