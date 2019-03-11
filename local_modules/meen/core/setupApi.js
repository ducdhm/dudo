module.exports = (app) => {
    require('../plugins/cors')(app);
    require('../plugins/bodyParser')(app);
    require('../plugins/mongoose')(app);
    require('../plugins/morgan')(app);
};
