const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const public = path.resolve(__dirname, "public");
const exclude_node_modules = path.resolve(__dirname, "node_modules");

const newPug = (name) => {
    return new HtmlWebpackPlugin(
        {
            filename: name+'.html',
            template: 'src/pug/'+name+'.pug',
            minify: false,
            // excludeAssets: [/style.css/]
        }
    )
}

module.exports =  {
    mode: "development",
    entry: {
        app: ["./src/app.js", "./src/sass/style.scss"],
    },
    output: {
        path: public,
        filename: "assets/[name].js", 
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    exclude_node_modules
                ],
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env"]
                    },
                }
            },
            {
                test: /\.pug/,
                use: {
                    loader:"pug-loader",
                    options: {
                        pretty: true
                    }
                }
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: public
                        }
                    },
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require('autoprefixer')
                            ]
                        }
                    }, 
                    'sass-loader',
                ]
            }
        ],
    },
    plugins: [
        newPug('home'),
        newPug('course'),
        // new HtmlWebpackExcludeAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: './assets/style.css'
        })
    ],
    devServer: {
        contentBase: public,
        index: 'home.html',
        watchContentBase: true,
        open: true,
        publicPath: '/assets/'
    },
}