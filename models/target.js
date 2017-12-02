module.exports = function(sequelize, DataTypes) {
  var Target = sequelize.define("Target", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    employmentCompany: DataTypes.STRING,
    employmentTitle: DataTypes.STRING,
    linkedInURL: DataTypes.STRING,
    twitterHandle: DataTypes.STRING,
    location: DataTypes.STRING,
    biography: DataTypes.STRING
  });

  return Target;
};
