var webpack = require('webpack');

module.exports = {
    entry: './src/index.js',

    output: {
        path: __dirname + '/public/',
        filename: 'bundle.js'
    },

    devServer: {
        hot: true,    // 수정될 때마다 리로딩
        inline: true,
        host: '0.0.0.0',
        port: 4000,
        contentBase: __dirname + '/public/'
    },

    module: {
            loaders: [
                {
                    test: /.js$/,
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    query: {
                        cacheDirectory: true,
                        presets: ['es2015', 'react'],
                        plugins: ["react-hot-loader/babel"]
                    }
                }
            ]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
};
