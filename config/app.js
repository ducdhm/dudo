const packageJson = require('../package.json');

module.exports = {
    info: {
        title: packageJson.description,
        version: packageJson.version,
    },
    mongoose: {
        url: `mongodb://localhost/${packageJson.name}`
    },
    uploadPath: {
        image: 'public/uploads/image/'
    },
    jwt: {
        secret: packageJson.name,
        expires: 60 * 60 * 24
    },
    handleError: {
        enabled: true,
    },
    adminPort: 5000,
    apiPort: 9000,
    session: {
        secret: packageJson.description,
    }
};


