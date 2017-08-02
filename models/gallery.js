"use strict";

module.exports = function(sequelize, DataTypes) {
  var Galleries = sequelize.define("Galleries", {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Needs an author'}
      }
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Needs an url'}
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Needs a description'}
      }
    }
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