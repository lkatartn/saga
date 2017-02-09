var path = require('path')

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            'webpack-dev-server/client?http://localhost:8888', // WebpackDevServer host and port
            'webpack/hot/only-dev-server',
            './src/app.js'
        ]
    },
    proxy: {
        "/api/*": {
            target: "http://localhost:2323",
            pathRewrite: {"^/api" : ""}
        }
    },
    output: {
        path: path.resolve(__dirname, "build/"),
        filename: 'app.js',
        publicPath: 'build'
    },
    module: {
        loaders: [
            {   test: /\.jsx?/,
                loaders: [
                    'react-hot-loader/webpack',
                    'jsx-loader?harmony',
                    'babel?presets[]=es2015,presets[]=react,presets[]=stage-0'
                    ],
                exclude: /node_modules/ },
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] }
        ]
    }
};