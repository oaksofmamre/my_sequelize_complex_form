

var AdminUsersHelper = {};


AdminUsersHelper.adminUsersPath = () => '/admin/users/';
AdminUsersHelper.adminUserPath = (id) => `/admin/users/${ id }`;
AdminUsersHelper.newAdminUserPath = () => '/admin/users/new';
AdminUsersHelper.editAdminUserPath = (id) => `/admin/users/${ id }/edit`;
AdminUsersHelper.destroyAdminUserPath = (id) => `/admin/users/${ id }/?_method=delete`;


module.exports = AdminUsersHelper;




