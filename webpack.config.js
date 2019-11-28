// @ts-nocheck
// WebPack specific details, that we pull in here through composition
const parts = require("./webpack.parts");

// Allows us to merge parts with common configuration
const merge = require("webpack-merge");

// Dynamically generate html index page
const HtmlWebpackPlugin = require("html-webpack-plugin");

const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin');

const path = require('path');
const PATHS = {
    app: path.resolve(__dirname, "./src")
};

const commonConfig = merge([
    {
        entry: './src/index.js',
        output: {
            filename: 'main.js',
            path: path.resolve(__dirname, 'dist')
        },
        resolve: {
            modules: [
                'node_modules',
                path.resolve('./src'),
            ],
        },

        // Enable source maps so Webpack provides a mapping
        // between the original code and the transformed code.
        // Debugging is much easier.
        devtool: "source-map",

        target: "web",

        plugins: [
            new HtmlWebpackPlugin({
                title: "Invoice Creator",
                template: 'public/index.html'
            }),
            new HtmlWebpackExternalsPlugin({
                externals: [
                    {
                        module: 'jquery',
                        entry: 'https://code.jquery.com/jquery-3.3.1.slim.min.js',
                        global: 'jQuery',
                    },
                    {
                        module: 'bootstrap',
                        entry: 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
                    },
                    {
                        module: 'popper',
                        entry: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js',
                    },
                    {
                        module: 'bootstrapValidate',
                        entry: 'https://cdn.rawgit.com/PascaleBeier/bootstrap-validate/v2.2.0/dist/bootstrap-validate.js'
                    }
                ],
            }),
        ],

        // Prevent bundling of certain imported packages,
        // and instead retrieve these external dependencies at runtime.
        externals: {},

    },

    parts.loadJavaScript({ include: PATHS.app }),
    parts.loadImages({ include: path.resolve(__dirname, 'public') }),
    parts.loadLess({ include: path.resolve(__dirname, 'src/styles') }),
]);

const productionConfig = merge([
    parts.extractCSS({
        use: "css-loader",
    }),
    parts.clean(),
]);

const developmentConfig = merge([
    parts.devServer({
        host: process.env.HOST,
        port: process.env.PORT,
        contentBase: [
            path.join(__dirname, 'public'),
            path.join(__dirname, 'dist'),
        ],
    }),
    parts.loadCSS({}),
]);

module.exports = (mode) => {

    // Set the Babel env to match the Webpack env
    process.env.BABEL_ENV = mode;

    const config = (mode === "production") ? productionConfig : developmentConfig;
    return merge(commonConfig, config, { mode });
};