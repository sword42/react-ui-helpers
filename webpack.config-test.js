const nodeExternals = require('webpack-node-externals');

module.exports = {
	target: 'node',
	externals: [nodeExternals()],
	module: {
		loaders: [
			{
				test: /\.js$|\.jsx$/,
				loader: 'babel-loader',
				query: {
						presets: ['react', 'es2015'],
						plugins: ['jsx-control-statements']
				}
			}
		]
	},
};