const webpack = require('webpack');
const path = require('path');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	context: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist')
};

module.exports = {
  context: PATHS.context,
	// Entry accepts a path or an object of entries. We'll be using the
	// latter form given it's convenient with more complex configurations.
	entry: {
		app: './index.js'
	},
	output: {
		path: PATHS.build,
		filename: 'react-ui-helpers.js',
		sourceMapFilename: 'react-ui-helpers.js.map',
		library: 'react-ui-helpers',
		libraryTarget: 'umd'
	},
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
	externals: {
		"jquery": "jQuery",
		"jquery": "$",
		"react": "react",
		"react-dom": "react-dom",
		"bluebird": "bluebird",
		"lodash": "lodash",
		"classnames": "classnames"
	},
	devtool: 'source-map',
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	]
};
