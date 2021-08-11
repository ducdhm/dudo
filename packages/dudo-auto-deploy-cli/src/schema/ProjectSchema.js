const ProjectSchema = {
    name: 'Project',
    properties: {
        _id: 'string',
        name: 'string',
        localFolder: 'string',
        buildFolder: 'string',
        remoteFolder: 'string',
        buildScript: 'string?',
        deployScript: 'string?',
        server: 'Server',
    },
    primaryKey: '_id',
};

module.exports = ProjectSchema;
