// Environments
// --------------------------------
const ENVS = [
    'dev',
    'prod',
    'test'
];
const env = {
    name: (process.env.NODE_ENV || ENVS[0]).trim()
};

if (ENVS.indexOf(env.name) === -1) {
    console.error('Could not get env. Stopping...');
    return;
}

env.isDev = env.name === ENVS[0];
env.isProd = env.name === ENVS[1];
env.isTest = env.name === ENVS[2];

module.exports = env;