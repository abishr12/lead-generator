module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    companyName: DataTypes.STRING,
    companyFounded: DataTypes.INTEGER,
    companyURL: DataTypes.STRING,
    companyBio: DataTypes.STRING,
    companyPhone: DataTypes.STRING,
    companyCrunchbase: DataTypes.STRING,
    amountRaised: DataTypes.INTEGER,
    revenue: DataTypes.STRING,
    logo: DataTypes.STRING
  });

  return Company;
};
