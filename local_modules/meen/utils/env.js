// Environments
// --------------------------------
const ENV = {
    DEV: 'dev',
    PROD: 'prod',
    TEST: 'test'
};
const env = {
    name: (process.env.NODE_ENV || ENV.DEV).trim()
};

if (!(env.name in ENV)) {
    console.error('Could not get env. Stopping...');
    return;
}

env.isProd = env.name === ENV.PROD;
env.isDev = env.name === ENV.DEV;
env.isTest = env.name === ENV.TEST;

module.exports = env;