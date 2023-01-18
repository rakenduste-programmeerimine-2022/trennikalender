const { date } = require("joi");
const mongoose = require("mongoose");
const calendarSchema = new Schema(
  {
    id: { type: String, unique: true, required: true },
    title: { type: String, unique: false, required: true },
    comment: {type: String, unique: false, required: false},
    startDate: {type: Date, unique: false, required: true},
    endDate: {type: Date, unique: false, required: true},
    createdAt: {type: Date, unique: false, required: true},
    createdBy: {type: String, unique: false, required: true},
    updatedAt: {type: Date, unique: false, required: true},
    updatedBy: {type: String, unique: false, required: true}
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

