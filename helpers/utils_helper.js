


var UtilsHelper = {};


UtilsHelper.concat = function(...args) {
  return args.slice(0, -1).join('');
};


UtilsHelper.join = function(str, ...args) {
  return args.slice(0, -1).join(str);
};


UtilsHelper.json = function(obj) {
  return JSON.stringify(obj, null, 2);
};




module.exports = UtilsHelper;













