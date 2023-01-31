const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: {
        main: './src/scripts/index.js'
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'build')
    },
    mode: "development",
    devServer: {
        static: path.resolve(__dirname, 'build'),
        open: true
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                    {
                    loader: "css-loader",
                    options: { 
                        importLoaders: 1,
                    }
                }, 
                'postcss-loader'
            ]               
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[hash][ext]'
                  }
            },
            {
                test: /\.(woff|woff(2)|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash][ext]'
                  }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin (),
    ]
}