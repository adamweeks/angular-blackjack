module.exports = {
	context: __dirname + '/src',
	devtool: 'source-map',
	entry: './index.js',
	output: {
		path: __dirname + '/src',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/, 
				loader: 'babel',
				query: {
					presets: ['es2015']
				},
				exclude: /(node_modules|bower_components)/
			},
			{test: /\.html$/, loader: 'raw', exclude: /node_modules/}
		]
	}
};
