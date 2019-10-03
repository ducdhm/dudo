const { resolvePath } = require('meen-core').utils;
const path = require('path');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const argv = require('yargs').argv;
const PROD = !!argv.prod;

module.exports = (name, entry) => {
    return {
        mode: PROD ? 'production' : 'development',
        devtool: PROD ? 'source-map' : 'inline-source-map',

        entry,
        output: {
            path: resolvePath('public'),
            filename: `${name}/[name].js`,
        },

        optimization: {
            minimizer: [
                new TerserJSPlugin({
                    sourceMap: true
                }),
                new OptimizeCSSAssetsPlugin({
                    cssProcessorOptions: {
                        map: {
                            inline: false
                        }
                    }
                })
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: `${name}/[name].css`,
            })
        ],
        module: {
            noParse: /switchery/,
            rules: [
                {
                    test: require.resolve('jquery'),
                    use: [{
                        loader: 'expose-loader',
                        options: 'jQuery'
                    }, {
                        loader: 'expose-loader',
                        options: '$'
                    }]
                },
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'string-replace-loader',
                            options: {
                                multiple: [
                                    {
                                        search: '\'\\n\\s+\'',
                                        replace: '',
                                        flags: 'g'
                                    }
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: '/public/'
                            }
                        },
                        'css-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /\.(png|jpg|gif|ico)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: 'img/',
                            }
                        },
                    ],
                },
                {
                    test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                    use: [{
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }]
                },
            ]
        },
        resolve: {
            modules: [path.resolve('./node_modules'), path.resolve('./src')],
            extensions: ['.json', '.js']
        }
    };
};
