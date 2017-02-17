var path = require('path');
var webpack = require('webpack');
var glob = require('glob');
/*
extract-text-webpack-plugin插件，
有了它就可以将你的样式提取到单独的css文件里，
妈妈再也不用担心样式会被打包到js文件里了。
 */
var ExtractTextPlugin = require('extract-text-webpack-plugin');
/*
html-webpack-plugin插件，重中之重，webpack中生成HTML的插件，
具体可以去这里查看https://www.npmjs.com/package/html-webpack-plugin
 */
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

/*
提取公共模块的插件
*/
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

const debug = process.env.NODE_ENV !== 'production';

var entries = getEntry('src/js/page/**/*.js','src/js/page/');
var chunks = Object.keys(entries);

var config = {
	entry: entries,
	output: {
		path: path.join(__dirname,'dist'),//js,css,img 路径
		publicPath: '/dist/',//会影响打包后文件上述3者的路径,改为'./' 虽然打包结果正常，但是热替换功能没有了
		filename: 'js/[name].js',
		chunkFilename: 'js/[id].chunk.js?[chunkhash]'
	},
	module: {
		loaders: [ //加载器，关于各个加载器的参数配置，可自行搜索之。
			{
				test: /\.css$/,
				//配置css的抽取器、加载器。'-loader'可以省去
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader') 
			}, {
				test: /\.less$/,
				//根据从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
				loader: ExtractTextPlugin.extract('css!less')
			}, {
				//html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
				//比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
				test: /\.html$/,
				loader: "html?attrs=img:src img:data-src"
				//loader: "raw"
			}, {
				//文件加载器，处理文件静态资源
				test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader?name=./fonts/[name].[ext]'
			}, {
				//图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
				//如下配置，将小于8192byte的图片转成base64码
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
			}
		]
	},
	resolve: {
		alias: {
			pages: path.join(__dirname,'dist')
		}
	},
	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery'
		}),
		new webpack.DefinePlugin({
			'ENV': JSON.stringify(process.env.ENV)
		}),
		new CommonsChunkPlugin({
			name: 'vendors',
			chunks: chunks,
			minChunks: chunks.length
		}),
		new ExtractTextPlugin('css/[name].css'),
		// debug ? function() {} : new UglifyJsPlugin({
		// 	compress: {
		// 		warnings: false
		// 	},
		// 	except: ['$super','$','exports','require']
		// })

		new webpack.HotModuleReplacementPlugin()
	],
	devServer: {
		contentBase: './dist/',
		host: 'localhost',
		port: 9090,
		inline: true,
		hot: true,
		quiet: true
	}
}

var pages = Object.keys(getEntry('src/view/**/*.html','src/view/'));

pages.forEach(function(pathname){
	var conf = {
		alwaysWriteToDisk: true,
		filename: '../dist/' + pathname + '.html',
		template: 'src/view/' + pathname + '.html',
		inject: false
	};

	if (pathname in config.entry) {
		conf.favicon = path.resolve(__dirname,'src/img/favicon.ico');
		conf.inject = 'body';
		conf.chunks = ['vendors',pathname];
		conf.hash = true;
	}

	config.plugins.push(new HtmlWebpackPlugin(conf));
})

config.plugins.push(new HtmlWebpackHarddiskPlugin({
		outputPath: path.resolve(__dirname,'dist')
}));



module.exports = config;

function getEntry(globPath,pathDir){

	var files = glob.sync(globPath);
	var entries = {},
		entry,dirname, basename, pathname, extname;

	for(var i = 0; i < files.length; i++){
		entry = files[i];
		dirname = path.dirname(entry);
		extname = path.extname(entry);
		basename = path.basename(entry, extname);
		pathname = path.normalize(path.join(dirname,  basename));
		pathDir = path.normalize(pathDir);
		if(pathname.startsWith(pathDir)){
			pathname = pathname.substring(pathDir.length)
		}
		entries[pathname] = ['./' + entry];
	}

	return entries;

}