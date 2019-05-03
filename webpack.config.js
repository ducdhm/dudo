const path = require('path');
const argv = require('yargs').argv;
const packageJson = require('./package.json');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

if (argv.prod) {
    process.env.NODE_ENV = 'production';
}
let PROD = process.env.NODE_ENV === 'production';

module.exports = {
    mode: PROD ? 'production' : 'development',
    devtool: PROD ? 'source-map' : 'inline-source-map',
    
    entry: {
        admin: './src/admin/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'public/'),
        filename: '[name]/[name].js'
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
            filename: '[name]/[name].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'windows.jQuery': 'jquery'
        })
    ],
    module: {
        rules: [
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
                                    search: '\\n\\s+',
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
    externals: {
        // jquery: 'jQuery',
    },
    resolve: {
        modules: [path.resolve('./node_modules'), path.resolve('./src')],
        extensions: ['.json', '.js']
    }
};
