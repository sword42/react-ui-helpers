const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
	context: path.join(__dirname, 'src'),
	build: path.join(__dirname, 'dist')
};

module.exports = {
  context: PATHS.context,
	entry: {
		test_inputmodelinui: './input/test_inputmodelinui.js',
		test_textinputinui: './input/test_textinputinui.js',
		test_checkboxinputinui: './input/test_checkboxinputinui.js',
		test_radioinputinui: './input/test_radioinputinui.js'
	},
	output: {
		path: PATHS.build,
		filename: '[name].js',
		sourceMapFilename: '[name].js.map'
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
	devtool: 'source-map',
  devServer: {
    contentBase: PATHS.build,

    // Enable history API fallback so HTML5 History API based
    // routing works. This is a good default that will come
    // in handy in more complicated setups.
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    // Parse host and port from env so this is easy to customize.
    //
    // If you use Vagrant or Cloud9, set
    // host: process.env.HOST || '0.0.0.0';
    //
    // 0.0.0.0 is available to all network devices unlike default
    // localhost
    host: process.env.HOST,
    port: process.env.PORT
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
		new CopyWebpackPlugin([
				// {output}/to/file.txt 
				{ from: 'testindex.html', to: 'index.html' },
				{ from: './input/test_inputmodelinui.html', to: 'test_inputmodelinui.html' },
				{ from: './input/test_textinputinui.html', to: 'test_textinputinui.html' },
				{ from: './input/test_checkboxinputinui.html', to: 'test_checkboxinputinui.html' },
				{ from: './input/test_radioinputinui.html', to: 'test_radioinputinui.html' },
				])
  ]		
};