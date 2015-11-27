var webpack = require('webpack');

module.exports = {
	context: __dirname + '/src',
	devtool: 'source-map',
	entry: './index.js',
	output: {
		path: __dirname + '/src',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	],
	module: {
		loaders: [
			{
				test: /\.js$/, 
				loader: 'babel',
				query: {
					presets: ['es2015']
				},
				exclude: /node_modules/
			},
			{
				test: /\.html$/, 
				loader: 'raw', 
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.(png|jpg|svg)$/,
				loader: 'url?limit=25000'
			},
			{
				test: /\.(woff|ttf|woff2|eot)$/,
				loader: 'url?limit=100000'
			}
		]
	}
};
