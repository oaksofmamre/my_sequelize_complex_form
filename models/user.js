'use strict';


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    fname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'First name cannot be empty'
        },
        isAlpha: {
          msg: 'First name must only be alphabetic'
        }
      }
    },
    lname: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Last name cannot be empty'
        },
        isAlpha: {
          msg: 'Last name must only be alphabetic'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Email cannot be empty'
        },
        isEmail: {
          msg: 'Email is invalid'
        }
      }
    },
    profileId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasOne(models.Profile, {
          foreignKey: "userId"
        });

        User.hasMany(models.JobApplication, {
          foreignKey: "userId"
        });

        User.hasMany(models.Education, {
          foreignKey: "userId"
        });

        User.hasMany(models.Skill, {
          foreignKey: "userId"
        });
      },
      pluck: function(attributes) {
        attributes = Array.isArray(attributes) ?
          attributes :
          [attributes];
        return this.findAll({ attributes });
      }
    },
    instanceMethods: {
      name: function() {
        return `${ this.fname } ${ this.lname }`;
      }
    }
  });


  var {
    Education,
    JobApplication,
    Profile,
    Skill
  } = sequelize.models;

  User.beforeBulkDestroy((options, done) => {
    var canExec = options.where &&
      options.where.id &&
      options.transaction;
    if (!canExec) {
      throw "Cannot destroy user";
    }

    console.log('Executing hook on user bulk destroy');
    var id = options.where.id;
    var t = options.transaction;
    var o = { where: { userId: id }, transaction: t };
    Profile.destroy(o)
      .then(() => {
        return Education.destroy(o);
      })
      .then(() => {
        return JobApplication.destroy(o)
      })
      .then(() => {
        return Skill.destroy(o);
      })
      .then(() => done())
      .catch((e) => { throw e; });
  });



  return User;
};












