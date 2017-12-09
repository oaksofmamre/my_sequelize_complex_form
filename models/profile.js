'use strict';


module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define('Profile', {
    gender: DataTypes.STRING,
    birthday: DataTypes.DATEONLY,
    addressId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Profile.hasOne(models.User, {
          foreignKey: "profileId"
        });

        Profile.hasOne(models.Address, {
          foreignKey: "profileId"
        });
      }
    }
  });


  var { Address } = sequelize.models;


  Profile.beforeBulkDestroy((options, done) => {
    var canExec = options.where &&
      options.where.userId &&
      options.transaction;
    if (!canExec) {
      throw "Cannot destroy profile";
    }

    var userId = options.where.userId;
    var t = options.transaction;

    Profile.findOne({ where: { userId: userId }, transaction: t })
      .then((profile) => {
        Address.destroy({ where: { id: profile.addressId }, transaction: t })
          .then(() => done())
          .catch((e) => { throw e; });
      })
  });


  return Profile;
};










