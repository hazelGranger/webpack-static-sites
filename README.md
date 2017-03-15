#  一个基于webpack的多入口 静态网站示例


目录结构介绍：    

* /dist                     由打包任务生成     

* /node_modules     
* /src   
  *  /css                   样式，支持 css 和 less    
  * /common             公用样式   
  * /lib                引入外部样式    
  * /page               每个页面对应的样式    
  *  /img                       图片资源    
  * /js                  
    * /components           组件脚本，不会被搜索引擎搜索到！页面加载时生成的    
    * /component    单个组件名   
        * /css      此组件的样式     
        * / /img        此组件所用图片资源    
        * / tmpl        此组件所用html    
        * / index.js    组件入口    
    * /page             每个页面使用的 js 入口   
 * /view                    每个页面的   

view 下面的   

 * layout 是渲染网页的外壳，如有别的需要可以定制不一样的layout.使用时在具体页面的js里面引入      

 * pages 是每个页面的 html 生成引擎，通常用同名的两个 js 和 ejs 组成，js里面可以传入 ejs模板需要的变量等    

 * partial 则是所有页面共同需要引入的 html 片段   





