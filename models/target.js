module.exports = function(sequelize, DataTypes) {
  var Target = sequelize.define("Target", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    employmentCompany: DataTypes.STRING,
    employmentTitle: DataTypes.STRING,
    linkedInURL: DataTypes.STRING,
    twitterHandle: DataTypes.STRING,
    location: DataTypes.STRING,
    biography: DataTypes.STRING,
    saved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  // Foreign Key
  Target.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Target.belongsTo(models.Company, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Target;
};
