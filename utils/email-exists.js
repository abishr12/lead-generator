//Import sequelize models
var db = require("../models/index.js");

const emailExists = (email, userId) => {
  return db.Target.count({
    where: {
      email: email,
      userId: userId
    }
  }).then(count => {
    return count > 0;
  });
};

module.exports = emailExists;
