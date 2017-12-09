var repl = require('repl').start({});
var models = require('./models');
var helpers = require('./helpers');


repl.context.models = models;
repl.context.helpers = helpers;
repl.context.h = helpers;


Object.keys(models).forEach((modelName) => {
  repl.context[modelName] = models[modelName];
});


repl.context.lg = (data) => {
  if (Array.isArray(data)) {
    if (data.length && data[0].dataValues) {
      data = data.map(item => item.dataValues);
    }
  }
  console.log(data);
};





