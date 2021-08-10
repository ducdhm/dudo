const ProjectSchema = {
    name: 'project',
    properties: {
        _id: 'string',
        name: 'string',
        localFolder: 'string',
        remoteFolder: 'string',
        buildScript: 'string?',
        deployScript: 'string?',
        deploying: {
            type: 'bool',
            default: false,
        },
        server: 'Server',
    },
    primaryKey: '_id',
};

module.exports = ProjectSchema;
