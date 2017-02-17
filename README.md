oneapmcom-webpack

此项目为主站的优化项目,其实是另外一个网站了


现在只有webpack 任务，还没有真正的网页

目录结构介绍：

/dist						由打包任务生成
/node_modules
/src
    /css  					样式，支持 css 和 less
		/common				公用样式
		/lib				引入外部样式
		/page				每个页面对应的样式
    /img       				图片资源
    /js 				
    	/components			组件脚本，不会被搜索引擎搜索到！页面加载时生成的
    		/component  	单个组件名
    			/css		此组件的样式
    			/img 		此组件所用图片资源
    			tmpl		此组件所用html
    			index.js 	组件入口
    	/page				每个页面使用的 js 入口
    /view					每个页面的 html


