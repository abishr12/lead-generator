module.exports = function(sequelize, DataTypes) {
  var CompanyEmail = sequelize.define("CompanyEmail", {
    email: DataTypes.STRING,
    companyName: DataTypes.STRING
  });
  return CompanyEmail;
};
