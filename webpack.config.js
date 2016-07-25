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
		libraryTarget: 'umd',
		umdNamedDefine: true
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
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		"react-dom": {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom'
		},
		bluebird: {
			root: 'Promise',
			commonjs2: 'bluebird',
			commonjs: 'bluebird',
			amd: 'bluebird'
		},
		lodash: {
			root: '_',
			commonjs2: 'lodash',
			commonjs: 'lodash',
			amd: 'lodash'
		},
		classnames: {
			root: 'classNames',
			commonjs2: 'classnames',
			commonjs: 'classnames',
			amd: 'classnames'
		},
		"react-select": {
			root: 'react-select',
			commonjs2: 'react-select',
			commonjs: 'react-select',
			amd: 'react-select'
		},
		"react-input-autosize": {
			root: 'react-input-autosize',
			commonjs2: 'react-input-autosize',
			commonjs: 'react-input-autosize',
			amd: 'react-input-autosize'
		}
	},
	devtool: 'source-map',
	plugins: [
		new webpack.optimize.UglifyJsPlugin({minimize: true})
	]
}
