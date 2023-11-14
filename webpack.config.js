const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const SvgSpriteHtmlWebpackPlugin = require('svg-sprite-html-webpack');

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";

const target = devMode ? "web" : "browserslist";
const devtool = devMode ? "source-map" : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  entry: ["@babel/polyfill", path.resolve(__dirname, "src", "index.js")],
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true,
    filename: "index.[contenthash].js",
    //assetModuleFilename: 'assets/[name][ext]',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html"),
      filename: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "index.[contenthash].css"
    }),
    new SvgSpriteHtmlWebpackPlugin({
      includeFiles: [
        "src/images/svg/*.svg",
      ]
    }),
  ],
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          'html-loader',
          {
            loader: 'posthtml-loader',
            options: {
              plugins: [
                require("posthtml-include")({ root: "./src" })
              ]
            }
          }
        ]
      },
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          devMode ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [require("postcss-preset-env")]
              }
            }
          },
          "sass-loader"
        ],
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/inline",
        generator: {
          filename: "fonts/[name][ext]"
        }
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        exclude: /src\/images\/svg\/sprites/,
        use: devMode
          ? []
          : [
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                },
                optipng: {
                  enabled: false,
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
                gifsicle: {
                  interlaced: false,
                },
                webp: {
                  quality: 75,
                },
              },
            },
          ],
        type: 'asset/resource',
        generator: {
          filename: "images/[name][ext]"
        }
      },

      {
        test: /\.svg$/,
        include: /src\/images\/svg\/sprites/,
        exclude: /node_modules/,
        use: SvgSpriteHtmlWebpackPlugin.getLoader(),
      },

      {
        test: /\.(?:js|mjs|cjs)$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }]
            ]
          }
        }
      }
    ]
  }
}