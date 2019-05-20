const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongoose = require("mongoose");
const User = require("../models/User");
const Protest = require("../models/Protest");
const { users, protests } = require("./data");

require("../configs/database");

Promise.all([User.deleteMany(), Protest.deleteMany()])
  .then(() => {
    return Promise.all([User.create(users), Protest.create(protests)]);
  })
  .then(([usersCreated, protestsCreated]) => {
    console.log(`${usersCreated.length} users created`);
    console.log(`${protestsCreated.length} protests created`);
  })
  .then(() => {
    mongoose.disconnect();
  })
  .catch(err => {
    mongoose.disconnect();
    throw err;
  });
