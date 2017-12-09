'use strict';


module.exports = function(sequelize, DataTypes) {
  var Education = sequelize.define('Education', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Education.belongsTo(models.User, {
          foreignKey: "userId"
        });
      }
    }
  });
  return Education;
};



