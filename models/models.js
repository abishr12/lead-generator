module.exports = function(sequelize, DataTypes) {
  var Target = sequelize.define("Target", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    employmentCompany: DataTypes.STRING,
    employmentTitle: DataTypes.STRING,
    linkedInURL: DataTypes.STRING,
    twitterHandle: DataTypes.STRING,
    location: DataTypes.STRING,
    biography: null
  });

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

  var CompanyEmail = sequelize.define("CompanyEmail", {
    email: DataTypes.STRING,
    companyName: DataTypes.STRING
  });
  // return ;
};
