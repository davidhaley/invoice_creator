const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

exports.devServer = ({ host, port, contentBase } = {}) => ({
    devServer: {
        stats: "errors-only",
        host, // Defaults to `localhost`
        port, // Defaults to 8080
        // open: true,
        overlay: true,
        contentBase: contentBase,
        inline: true
    },
});

// css-loader goes through possible @import and url() lookups within
// the matched files and treats them as a regular ES2015 import.
// style-loader injects the styling through a style element.
// It also implements the Hot Module Replacement interface
// for a pleasant development experience.
exports.loadCSS = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.css$/,
                include,
                exclude,

                use: ["style-loader", "css-loader"],
            },
        ],
    },
});

// MiniCssExtractPlugin provides a means to generate a separate
// CSS bundle, which allows cacheing CSS, and prevents FOUC
// Flash of Unstyled Content). Costs additional overhead during
// compilation phase and Hot Reload is not supported; however,
// given the plugin is used only for Production, that is not a problem.
exports.extractCSS = ({ include, exclude, use = [] }) => {

    // Output extracted CSS to a file.
    // [name] is a placeholder that uses the name
    // of the entry where the CSS is referred.
    const plugin = new MiniCssExtractPlugin({
        filename: "[name].css",
    });

    return {
        module: {
            rules: [
                {
                    test: /\.css$/,
                    include,
                    exclude,

                    use: [
                        MiniCssExtractPlugin.loader,
                    ].concat(use),
                },
            ],
        },
        plugins: [plugin],
    };
};

// Webpack processes ES2015 module definitions by default and
// transforms them into code; however, it does not transform
// specific syntax, such as const, which can be problematic
// for older browsers. Babel takes care of this.
exports.loadJavaScript = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.js$/,
                include,
                exclude,
                use: "babel-loader?cacheDirectory",
            },
        ],
    },
});

// Prevents accumulating files as the project changes,
// by cleaning the build directory.
exports.clean = () => ({
    plugins: [new CleanWebpackPlugin()],
});

// Loads images
exports.loadImages = ({ include, exclude, options } = {}) => ({
    module: {
        rules: [
            {
                test: /\.(png|jpg)$/,
                include,
                exclude,
                use: {
                    loader: "url-loader",
                    options,
                },
            },
        ],
    },
});

// Compile Less to CSS
exports.loadLess = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader', // translates CSS into CommonJS
                    },
                    {
                        loader: 'less-loader', // compiles Less to CSS
                    },
                ],
            },
        ],
    },
});