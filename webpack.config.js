const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const path = require('path');

module.exports = {
	context: path.resolve(__dirname, 'src'),

	entry: [
		'react-hot-loader/patch',
        // activate HMR for React
        
		'webpack-dev-server/client?http://localhost:3000',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint
		
		'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates
		
		'./index.js'
        // the entry point of our app
	],
	output: {
		filename: 'bundle.js',
    // the output bundle

		path: path.resolve(__dirname, 'dist'),

		publicPath: '/'
    // necessary for HMR to know where to load the hot update chunks
	},

	devtool: 'inline-source-map',

	devServer: {
		hot: true,
    // enable HMR on the server

		contentBase: path.resolve(__dirname, 'dist'),
    // match the output path

		publicPath: '/',
    // match the output `publicPath`

		port: 3000
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,        
				use: {
					loader: 'babel-loader',
					options: { presets: ['react', 'es2015'] } 
				}
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new HtmlWebpackPlugin({template: 'index.html', inject: true}),
		new webpack.NoErrorsPlugin(),
		new OpenBrowserPlugin({
			url: 'http://localhost:3000'
		}),
		new DashboardPlugin()
	]
};