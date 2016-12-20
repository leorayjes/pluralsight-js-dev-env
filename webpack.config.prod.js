import path from 'path';
import webpack from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default{
	debug: true,
	devtool: 'source-map',
	noInfo: false,
	entry: {
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname,'src/index')
},
	target:'web',
	output:{
		path: path.resolve(__dirname,'dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js'
	},
	plugins:[
		// Generate an external css file with a hash in the file name
		new ExtractTextPlugin('[name].[contenthash].css'),

		// Hash the files using Md5 so that their names cvhange when the content changes.
		new WebpackMd5Hash(),

		// Use CommonsChunkPlugin to create a separate bundle
		// of vendor libraries so that they're cached separately
		new webpack.optimize.CommonsChunkPlugin({
			name:'vendor'
		}),

		// Create HTML file that includes a reference to bundled JS.
		new HTMLWebpackPlugin({
			template: 'src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true
		}),

		// Eliminate duplicate packages when generating bundle
		new webpack.optimize.DedupePlugin(),

		// Minify js
		new webpack.optimize.UglifyJsPlugin()
	],
	module: {
		loaders: [
			{test: /\.js$/, exclude: /node_modules/,loaders: ['babel']},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('css?sourceMap')}
		]
	}
}
