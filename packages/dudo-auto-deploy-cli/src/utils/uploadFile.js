let Client = require('ssh2-sftp-client');
let client = new Client();

module.exports = async (project, onError) => {
    try {
        await client.connect({
            host: project.host,
            port: project.port,
            username: project.username,
            password: project.password,
        }, true);

        try {
            await client.rmdir(`${project.remoteFolder}`, true);
        } catch (error) {
            console.log(error, 111)
        }

        let uploadInfo = {};
        client.on('upload', info => {
            if (uploadInfo.source !== info.source && uploadInfo.destination !== info.destination) {
                uploadInfo = {
                    ...info,
                };
                console.log(`Listener: Uploaded ${info.source}`);
            }
        });

        const results = await client.uploadDir(`${project.localFolder}/${project.build}`, `${project.remoteFolder}`);
        client.end();

        return results;
    } catch (error) {
        client.end();
        onError()
    }
};
