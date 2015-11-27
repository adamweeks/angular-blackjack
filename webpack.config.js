module.exports = {
	context: __dirname + '/src',
	entry: './index.js',
	output: {
		path: __dirname + '/src',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{test: /\.html$/, loader: 'raw', exclude: /node_modules/}
		]
	}
};
