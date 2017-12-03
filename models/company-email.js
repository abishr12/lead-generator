module.exports = function(sequelize, DataTypes) {
  var CompanyEmail = sequelize.define("CompanyEmail", {
    email: DataTypes.STRING,
    companyName: DataTypes.STRING
  });

  CompanyEmail.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    CompanyEmail.belongsTo(models.Company, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return CompanyEmail;
};
