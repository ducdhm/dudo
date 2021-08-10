const ServerSchema = {
    name: 'server',
    properties: {
        _id: 'string',
        name: 'string',
        host: 'string',
        port: 'string',
        username: 'string',
        password: 'string',
    },
    primaryKey: '_id',
};

module.exports = ServerSchema;
