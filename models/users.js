"use strict";

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Incorrect Username'}
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Incorrect Password'}
      }
    }
  });

  Users.associate = function(models) {
    Users.hasMany(models.Galleries, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    });
  };
  return Users;
};
