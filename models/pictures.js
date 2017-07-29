"use strict";

module.exports = function(sequelize, DataTypes) {
  var Pictures = sequelize.define("Pictures", {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Pictures.associate = function(models) {
    Pictures.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Pictures;
};