module.exports = {
    app: {
        title: 'M.E.E.N CMS',
        version: '1.0.0'
    },
    mongodb: {
        url: 'mongodb://localhost/meen-dev',
        options: {
            useNewUrlParser: true
        }
    },
    cronjob: {
        timezone: 'Asia/Ho_Chi_Minh'
    },
    adminPort: 5000,
    apiPort: 7000,
    session: {
        secret: 'meen'
    },
    bcrypt: {
        salt: 10
    },
    uploadPath: {
        image: 'public/uploads/image/'
    },
    jwt: {
        secret: 'meen',
        expires: 60 * 60 * 24
    },
    itemPerPage: 10
};