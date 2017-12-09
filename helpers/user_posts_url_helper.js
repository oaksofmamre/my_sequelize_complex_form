

// Not used in app, only for example


var UserPostsHelper = {};


UserPostsHelper.userPostsPath = (userId) => {
  return `/users/${ userId }/posts`
};

UserPostsHelper.userPostPath = (userId, id) => {
  return `/users/${ userId }/posts/${ id }`
};

UserPostsHelper.newUserPostPath = (userId) => {
  return `/users/${ userId }/posts/new`
};

UserPostsHelper.editUserPostPath = (userId, id) => {
  return `/users/${ userId }/posts/${ id }/edit`
};

UserPostsHelper.destroyUserPostPath = (userId, id) => {
  return `/users/${ id }/posts/${ id }/?_method=delete`
};



module.exports = UserPostsHelper;




