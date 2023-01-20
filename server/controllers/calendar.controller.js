const Joi = require("joi");
require("dotenv").config();
const Calendar = require("../models/calendar.model");

const calendarSchema = Joi.object().keys({
    title: Joi.string(),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    allDay: Joi.boolean(),
    notes: Joi.string()
  });

exports.CreateEvent = async (req, res) => {

    console.log(req.body.added);
    try {
        //console.log("log start:");
        //console.log(req.body);
        //console.log("log end");
        const result = calendarSchema.validate(req.body.added);
        if (result.error) {
            console.log(result.error.message);
            return res.json({
              error: true,
              status: 400,
              result: "error",
              message: "Palun kontrolli andmeid!",
            });
        } else {
            console.log("DB ok");
            const newCalendar = new Calendar(result.value);
            await newCalendar.save();
            return res.json({
                error: false,
                status: 200,
                result: "ok",
                message: "Andmed salvestatud"
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
    
    const calendar_all = await Calendar.find();
    res.end(JSON.stringify(calendar_all));

}

exports.EventDetail = async (req, res) => {
    
    var id=req.query.id;
    const calendar = await Calendar.findOne({ _id: id });
    
    res.end(JSON.stringify(calendar));

    /*
    try{
        Calendar.findOne({ "title": req.query.title }), (error, result) =>{
            if (result.error) {
                console.log(result.error.message);
                return res.json({
                  error: true,
                  status: 400,
                  result: "error",
                  message: "Palun kontrolli andmeid!",
                });
            } else {
                console.log("------>");
                console.log(result);
                console.log("<------");
                res.send();
            }
        }
    }
        catch (err) {
            console.error("calendarEventlist-error", err);
            return res.status(500).json({
                err: true,
                message: "Evendi leidmine ei õnnestunud",
        });
    }
    */
}