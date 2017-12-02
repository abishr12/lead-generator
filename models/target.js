module.exports = function(sequelize, DataTypes) {
  var burger = sequelize.define(
    "Burger",
    {
      burger_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      timestamps: false
    }
  );
  return burger;
};
