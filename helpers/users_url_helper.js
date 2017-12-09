

// Not used in app, only for example


var UsersHelper = {};


UsersHelper.usersPath = () => '/users/';
UsersHelper.userPath = (id) => `/users/${ id }`;
UsersHelper.newUserPath = () => '/users/new';
UsersHelper.editUserPath = (id) => `/users/${ id }/edit`;
UsersHelper.destroyUserPath = (id) => `/users/${ id }/?_method=delete`;


module.exports = UsersHelper;




