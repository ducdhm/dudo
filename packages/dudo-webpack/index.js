const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const argv = require('yargs').argv;

const composeWebpack = ({ name, outputPath, publicPath, entry, options }) => {
    const isProd = argv.mode === 'production';
    const baseConfig = {
        mode: isProd ? 'production' : 'development',
        devtool: isProd ? 'source-map' : 'inline-source-map',

        entry,
        output: {
            path: outputPath,
            filename: `${name}/scripts/[name].js`,
        },

        optimization: {
            minimizer: [
                `...`,
                new CssMinimizerPlugin({
                    minimizerOptions: {
                        level: {
                            1: {
                                roundingPrecision: 'all=3,px=5',
                            },
                        },
                    },
                    minify: CssMinimizerPlugin.cssnanoMinify,
                }),
            ],
        },

        plugins: [
            new MiniCssExtractPlugin({
                filename: `${name}/styles/[name].css`,
            }),
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    '@babel/preset-env',
                                ],
                                plugins: [
                                    '@babel/plugin-transform-runtime',
                                    '@babel/plugin-proposal-class-properties',
                                    '@babel/plugin-proposal-export-default-from',
                                    '@babel/plugin-syntax-dynamic-import',
                                ],
                            },
                        },
                    ],
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                publicPath: publicPath,
                            },
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                        'resolve-url-loader',
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                },
                {
                    test: /.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: `${name}/fonts/`,
                            },
                        },
                    ],
                },
                {
                    test: /(\.png|\.jpg|\.gif|\.ico|\.svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                name: '[name].[ext]',
                                outputPath: `${name}/images/`,
                            },
                        },
                    ],
                },
            ],
        },
    };

    if (!options) {
        return baseConfig;
    } else if (Array.isArray(options)) {
        return merge(baseConfig, ...options);
    } else if (Object.prototype.toString.call(options) === '[object Object]') {
        return merge(baseConfig, options);
    } else {
        return baseConfig;
    }
};

module.exports = composeWebpack;
