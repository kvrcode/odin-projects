const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(__dirname, "src", "app.js")
    },
    output: {
        path: path.resolve(__dirname, "dist")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader", "postcss-loader"]
                // MiniCssExtractPlugin.loader
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(jpe?g|png|webp|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            // context: 'portfolio',
                            // publicPath: 'assets',
                            useRelativePath: true,
                            emitFile: false,
                        }
                    },
                ]
            },
        ],
    },
    optimization: {
        splitChunks: { chunks: "all" },
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        }),
        // new MiniCssExtractPlugin(),
        new ImageMinimizerPlugin({
            minimizerOptions: {
              plugins: ['pngquant'],
            },
          }),
          new ImageMinimizerPlugin({
            deleteOriginalAssets: true,
            filename: '[name].webp',
            minimizerOptions: {
              plugins: ['imagemin-webp'],
            },
          }),
        new CleanWebpackPlugin()
    ]
}