const app = require('./app');

require('./compression')(app);
require('./minify')(app);
require('./static')(app);
require('./morgan')(app);
require('./bodyParser')(app);
require('./mongoose')();
require('./view')(app);
require('./session')(app);
require('./passport')(app);

module.exports = app;
