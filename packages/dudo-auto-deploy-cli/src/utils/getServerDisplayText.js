const getServerDisplayText = (server) => `${server.name} (${server.username}@${server.host}:${server.port})`;

module.exports = getServerDisplayText;
