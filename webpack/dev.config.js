const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

const commonConfig = require("./common.config.js");

// commonConfig.entry = [
// 	'webpack-dev-server/client?http://' + require('os').hostname().toLowerCase() + ':8080',
// ];

// Output
commonConfig.output = {
	path : path.join(__dirname, "..", "dev_build"),
	filename : "app.js"
};
commonConfig.devtool = "source-map";

// Add Plugins
commonConfig.plugins.push(new HtmlWebpackPlugin({
	filename : "index.html",
	hash : true,
	inject : "body",
	minify : false,
	template : path.join(__dirname, "..", "src", "index_tmpl.html"),
	title : "Dev Build: Freesound Sequencer"
}));

commonConfig.plugins.push(new webpack.DefinePlugin({
	__DEBUG__ : true,
	__MW_DEV_SERVER__ : process.env.FS_DEV_SERVER === "true"
}));

if (process.env.FS_DEV_SERVER === "true") {
	commonConfig.devServer = {
		hot : false,
		host : '0.0.0.0',
		public: require('os').hostname().toLowerCase() + ':8080',
		overlay : {
			errors : true
		}
	};
}

module.exports = commonConfig;
