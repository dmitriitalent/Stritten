import path from 'path';
import webpack from 'webpack';
import { VueLoaderPlugin } from "vue-loader";
import HtmlWebpackPlugin from "html-webpack-plugin";

import 'webpack-dev-server';

const config: webpack.Configuration = {
	mode: 'development',
	entry: './src/main.ts',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader',
				options: {
					appendTsSuffixTo: [/\.vue$/],
				},				
				exclude: /node_modules/,
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader'
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader", 
					"css-loader",
					"sass-loader",
				],
			},
			{
				test: /\.css$/,
				use: [
					"style-loader", 
					"css-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
        		use: [
        		  	{
        		    	loader: 'file-loader',
        		  	},
        		],
			}
		],
	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.vue'],
		alias: {
			"@": path.resolve(__dirname, "src")
		}
	},
	devServer: {
		port: 3000,
		open: true,
		historyApiFallback: true,
		static: {
			directory: path.join(__dirname, "dist")
		}
	},

	plugins: [
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({template: "./public/index.html"})
	],

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'main.js',
		publicPath: '/'
	},
};

export default config;