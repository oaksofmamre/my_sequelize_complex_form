'use strict';


module.exports = function(sequelize, DataTypes) {
  var State = sequelize.define('State', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        State.hasMany(models.Address, {
          foreignKey: "stateId"
        });
      }
    }
  });
  return State;
};






