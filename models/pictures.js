module.exports = function(sequelize, DataTypes) {
  var Picture = sequelize.define("Pictures", {
    author: DataTypes.STRING,
    link: DataTypes.STRING,
    description: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        Picture.belongsTo(models.Users);
      }
    }
  });

  return Picture;
};