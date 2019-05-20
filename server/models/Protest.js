const mongoose = require("mongoose");

const protestSchema = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  time: {
    type: String,
    enum: ["davor", "während", "danach"]
  },
  time_investment: {
    type: String
  },
  level: {
    type: String,
    enum: ["einfach", "normal", "schwierig"]
  },
  nof_people: {
    type: String
  },
  material_costs: {
    type: String
  },
  rating: {
    type: Number
  },
  reported: {
    type: Boolean,
    default: false
  }
});

const Protest = mongoose.model("Protest", protestSchema);

module.exports = Protest;
