const { date } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const calendarSchema = new Schema(
  {
    title: { type: String, unique: false, required: true },
    notes: {type: String, unique: false, required: false},
    startDate: {type: Date, unique: false, required: true},
    endDate: {type: Date, unique: false, required: true},
    allDay: {type: Boolean, unique: false, required: false}
  },

  //Võimalik date format tuleks teha

  {
    timestamps: {
      createdAt: "createdAt"
    },
  }
);
const Calendar = mongoose.model("calendar", calendarSchema);
module.exports = Calendar;

