const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const sass = require('sass');
const {
  LessPluginRemoveAntdGlobalStyles,
} = require('less-plugin-remove-antd-global-styles');

module.exports = {
  mode: "qa",
  entry: './src/index.tsx',
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@content': path.resolve(__dirname, 'src/content'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@provider': path.resolve(__dirname, 'src/provider'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: { loader: 'html-loader' },
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        loader: 'file-loader',
        options: {
          digest: 'hex',
          hash: 'sha512',
          name: 'content/[hash].[ext]',
        },
      },
      // {
      //     test: /\.css$/,
      //     use: ['style-loader', 'css-loader', 'postcss-loader']
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      // Options
                    },
                  ],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: { implementation: sass },
          },
        ],
      },
      {
        test: /\.less$/i,
        use: [
          // Less를 CSS로 컴파일
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
                // Antd 글로벌 css 제거
                plugins: [new LessPluginRemoveAntdGlobalStyles()],
              },
            },
          },
        ],
      },
      {
        test: /\.ejs$/,
        include: path.join(__dirname),
        exclude: /(node_modules)|(dist)/,
        use: { loader: 'ejs-loader' },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env.SERVER_API_URL': JSON.stringify('http://gateway.obp:51000'),
      
      'process.env.AUTH_URI': JSON.stringify('http://gateway.obp:51000/api/OauthAdmin'),
      'process.env.OAUTH_SERVER_URI': JSON.stringify('http://keycloak.obp:59080'),
            
      'process.env.SERVER_IMG_URL': JSON.stringify(
        'http://gateway.obp:51000/services/obpmedia/api/media',
      ),
      'process.env.SERVER_UPLOAD_URL': JSON.stringify(
        'http://gateway.obp:51000/services/obpmedia/api/upload',
      ),
      'process.env.OID_URL': JSON.stringify(
        'http://gateway.obp:51000/api/OauthMgr',
      ),
      'process.env.OID_REALM': JSON.stringify('obp'),
      'process.env.OID_CLIENT_ID': JSON.stringify('web_app'),
      'process.env.UNSPLASH_URL': JSON.stringify('https://api.unsplash.com'),
      'process.env.UNSPLASH_ACCESS_KEY': JSON.stringify(
        'TIjumfmGZyun7CPpW0a0YWwYos3_bkfC7dGShUaVttU',
      ),
      'process.env.UNSPLASH_SECRET_KEY': JSON.stringify(
        'dcEldlk8cXqmup0A6Cn72MvibAwHviW2YCEs-sHL_UA',
      ),
      'process.env.MATTERMOST_URL': JSON.stringify('http://api.mattermost.com'),
      'process.env.MATTERMOST_TOKEN': 'u5mnssfrc3rytptjg6bfe1mbbr',
      'process.env.REDUX_LOGGING': true,
    }),
    // new webpack.DefinePlugin({
    //     'process.env': {
    //       // The root URL for API calls, ending with a '/' - for example: `"https://www.jhipster.tech:8081/myservice/"`.
    //       // If this URL is left empty (""), then it will be relative to the current context.
    //       // If you use an API server, in `prod` mode, you will need to enable CORS
    //       // (see the `jhipster.cors` common JHipster property in the `application-*.yml` configurations)
    //     //   SERVER_API_URL: `''`
    //       SERVER_API_URL: JSON.stringify("http://localhost:8080/")
    //     }
    //   }),
  ].concat(
    process.env.NODE_ENV === 'development' ? [new BundleAnalyzerPlugin()] : [],
  ),
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    host: '0.0.0.0', // 외부에서 서버에 접근
    port: 9000,
    https: false,
    historyApiFallback: true,
  },
};
