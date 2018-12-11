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
    apiPort: 6000,
    session: {
        secret: 'promcms'
    },
    bcrypt: {
        salt: 10
    },
    uploadPath: {
        image: 'public/uploads/image/'
    },
    itemPerPage: 10
};