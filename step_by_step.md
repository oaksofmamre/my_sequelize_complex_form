Demo Step by Step
=================


## Sequelize

<!-- Sequelize Associations -->

1. Setup model associations
1. Test out associations

<!-- Sequelize Hooks -->

1. Setup hooks
1. Test out hooks with transactions

<!-- Sequelize Validations -->

1. Setup validations
    * **Note** `allowNull: false` must be set in the migration
1. Test validations
    * Example:
    
    ```javascript
    User.create({ fname: '', lname: '', username: '', email: '' }).then(lg).catch((e) => console.log(e))
    ```

<!-- Indexing with Sequelize -->

1. Setup Indexes

<!-- Creating Custom Sequelize Model Methods -->

1. Test out creating custom methods
    * Example: [Expansion of models](http://docs.sequelizejs.com/en/latest/docs/models-definition/#expansion-of-models)
    
    ```javascript
    instanceMethods: {
      name: function() {
        return `${ this.fname } ${ this.lname }`;
      }
    }
    ```


## Express

<!-- Creating URL Helpers -->

<!-- Express Flash Messages -->

1. Install Local Packages:
    * express
    * express-flash-messages
    * express-handlebars
    * body-parser
    * morgan
1. Setup `app.js`
    1. Body parser
    1. Sessions (cookie-session???)
    1. Flash messages
    1. Method override
    1. Public folder
    1. Logging
    1. Routes
    1. Template engine
        1. Helpers
        1. Partials dir `views/`
        1. Default layout
    1. Server














