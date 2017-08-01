"use strict";

module.exports = function(sequelize, DataTypes) {
  var Galleries = sequelize.define("Galleries", {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT
  });

  Galleries.associate = function(models) {
    Galleries.belongsTo(models.Users, {
      foreignKey: {
        name: 'user_id',
        allowNull: false
      }
    });
  };

  return Galleries;
};