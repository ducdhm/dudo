const composeWebpack = require('@dudojs/webpack');

module.exports = ({ name, outputPath, publicPath, entry, options }) => composeWebpack({
    name,
    outputPath,
    publicPath,
    entry,
    options: [{
        module: {
            rules: [
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: {
                            exposes: {
                                globalName: 'jQuery',
                                override: true,
                            },
                        },
                    }, {
                        loader: 'expose-loader',
                        options: {
                            exposes: {
                                globalName: '$',
                                override: true,
                            },
                        },
                    }],
                },
                {
                    test: require.resolve('moment'),
                    use: [{
                        loader: 'expose-loader',
                        options: {
                            exposes: {
                                globalName: 'moment',
                                override: true,
                            },
                        },
                    }],
                },
            ],
        },
    }, options || {}],
});
