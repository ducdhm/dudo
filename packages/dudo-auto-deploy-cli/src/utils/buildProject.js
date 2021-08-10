const { execSync } = require('child_process');

module.exports = async (path, buildScript) => {
    if (buildScript) {
        const scripts = buildScript.split('\n');

        for (let script of scripts) {
            execSync(script, {
                cwd: path,
            });
        }
    }
};
