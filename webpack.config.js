const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin');

const public = path.resolve(__dirname, "public");
const publicPath = "/public";
const exclude_node_modules = path.resolve(__dirname, "node_modules");

let inProduction = process.env.production;


const newPug = (name) => {
    return new HtmlWebpackPlugin(
        {
            filename: name + '.html',
            template: 'src/pug/' + name + '.pug',
            minify: false,
            // excludeAssets: [/style.css/] // excluding chunks to be injected
        }
    )
}

module.exports = {
    mode: "development",
    entry: {
        app: ["./src/app.js", "./src/sass/style.scss"],
    },
    output: {
        path: public,
        filename: "assets/[name].js?[chunkhash]",
        publicPath: publicPath
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
                use: [
                    {
                        loader: "pug-loader",
                        options: {
                            pretty: true,
                        }
                    },
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: "assets/images/[name].[ext]?[hash]",
                            publicPath: publicPath
                        }
                    },
                    // Install the loader with the plugins needed before
                    // uncommenting this.
                    // {
                    //     loader:'img-loader',
                    //     options: {
                    //         plugins: [
                    //             require('imagemin-gifsicle')({}),
                    //             require('imagemin-mozjpeg')({}),
                    //             require('imagemin-optipng')({}),
                    //             require('imagemin-svgo')({})
                    //         ]
                    //     }
                    // },
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "assets/fonts/[name].[ext]",
                        publicPath: publicPath
                    },
                },
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: publicPath
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
        newPug('login'),
        newPug('recover'),
        // new HtmlWebpackExcludeAssetsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].css?[chunkhash]'
        }),
        // new CleanWebpackPlugin(['public']), // used in prod
    ],
    devServer: {
        open: true,
        // index: 'home.html',
        publicPath: publicPath,
        contentBase: public,
        watchContentBase: true,
    },
}
