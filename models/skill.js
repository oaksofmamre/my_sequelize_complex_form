'use strict';


module.exports = function(sequelize, DataTypes) {
  var Skill = sequelize.define('Skill', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Skill.belongsTo(models.User, {
          foreignKey: "userId"
        });
      }
    }
  });
  return Skill;
};








