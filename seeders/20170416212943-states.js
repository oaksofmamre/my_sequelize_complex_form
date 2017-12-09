'use strict';
var models = require('./../models');


module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('States', [
      { "name": "Alabama" },
      { "name": "Alaska" },
      { "name": "Arizona" },
      { "name": "Arkansas" },
      { "name": "California" },
      { "name": "Colorado" },
      { "name": "Connecticut" },
      { "name": "Delaware" },
      { "name": "Florida" },
      { "name": "Georgia" },
      { "name": "Hawaii" },
      { "name": "Idaho" },
      { "name": "Illinois" },
      { "name": "Indiana" },
      { "name": "Iowa" },
      { "name": "Kansas" },
      { "name": "Kentucky" },
      { "name": "Louisiana" },
      { "name": "Maine" },
      { "name": "Maryland" },
      { "name": "Massachusetts" },
      { "name": "Michigan" },
      { "name": "Minnesota" },
      { "name": "Mississippi" },
      { "name": "Missouri" },
      { "name": "Montana" },
      { "name": "Nebraska" },
      { "name": "Nevada" },
      { "name": "New Hampshire" },
      { "name": "New Jersey" },
      { "name": "New Mexico" },
      { "name": "New York" },
      { "name": "North Carolina" },
      { "name": "North Dakota" },
      { "name": "Ohio" },
      { "name": "Oklahoma" },
      { "name": "Oregon" },
      { "name": "Pennsylvania" },
      { "name": "Rhode Island" },
      { "name": "South Carolina" },
      { "name": "South Dakota" },
      { "name": "Tennessee" },
      { "name": "Texas" },
      { "name": "Utah" },
      { "name": "Vermont" },
      { "name": "Virginia" },
      { "name": "Washington" },
      { "name": "West Virginia" },
      { "name": "Wisconsin" },
      { "name": "Wyoming" }
   ]);
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('States', null, {}, model.States);
  }
};
