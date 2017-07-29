"use strict";

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: DataTypes.STRING
  });

  Users.associate = function(models) {
    Users.hasMany(models.Pictures, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Users;
};
