require('babel-polyfill');

var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var fs = require('fs');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var basePath = path.resolve(__dirname, '..');

module.exports = {
    devtool: 'eval-source-map',//配置生成Source Maps，选择合适的选项
    context: path.resolve(__dirname, '..'),
    node: {
        __dirname: true
    },

    entry: {
        todo: "./src/todo/index.js",
        reddit: "./src/reddit/index.js"
    },
    output: {
        path: './build/assets',
        filename: '[name].js',
        chunkFilename: '[id].chunk.js',
        publicPath: '/assets/'
    },

    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel'}
            // {
            //     test: /\.scss$/,
            //     loaders: [
            //         'style?sourceMap',
            //         'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
            //         'resolve-url',
            //         'sass?sourceMap'
            //     ]
            // }
            // {
            //     test: /\.css$/,
            //     loader: ExtractTextPlugin.extract('style-loader', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
            // }
            // {test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml"}
        ]
    },

    // resolve: {
    //     alias: {
    //         'react-router': path.join(__dirname, '..', 'modules')
    //     }
    // },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // new ExtractTextPlugin("styles.css"),
        new HtmlWebpackPlugin({
            filename: basePath + '/build/todo/index.html',
            template: basePath + '/src/todo/index.html',
            chunks: ['todo']
        }),
        new HtmlWebpackPlugin({
            filename: basePath + '/build/reddit/index.html',
            template: basePath + '/src/reddit/index.html',
            chunks: ['reddit']
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        })
    ]
};

