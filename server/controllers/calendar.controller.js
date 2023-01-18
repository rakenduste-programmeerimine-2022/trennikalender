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

}