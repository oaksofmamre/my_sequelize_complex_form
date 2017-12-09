'use strict';


module.exports = function(sequelize, DataTypes) {
  var JobApplication = sequelize.define('JobApplication', {
    desiredPosition: DataTypes.STRING,
    currentlyEmployed: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        JobApplication.belongsTo(models.User, {
          foreignKey: "userId"
        });
      }
    }
  });
  return JobApplication;
};










