'use strict';


module.exports = function(sequelize, DataTypes) {
  var Address = sequelize.define('Address', {
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    stateId: DataTypes.INTEGER,
    profileId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Address.belongsTo(models.Profile, {
          foreignKey: "profileId"
        });

        Address.belongsTo(models.State, {
          foreignKey: "stateId"
        });
      }
    }
  });
  return Address;
};






