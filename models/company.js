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

  Company.associate = function(models) {
    // Associating Company with CompanyEmail
    // When an Company is deleted, also delete any associated Posts
    Company.hasMany(models.CompanyEmail, {
      onDelete: "cascade"
    });
  };

  Company.associate = function(models) {
    // Associating Company with CompanyEmail
    // When an Company is deleted, also delete any associated Posts
    Company.hasMany(models.Target, {
      onDelete: "cascade"
    });
  };

  return Company;
};
