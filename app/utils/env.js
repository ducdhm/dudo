// Environments
// --------------------------------
const envs = ['dev', 'prod'];
const env = (process.env.NODE_ENV || 'dev').trim();
if (envs.indexOf(env) === -1) {
    console.error('Could not get env. Stopping...');
    return;
}

module.exports = env;