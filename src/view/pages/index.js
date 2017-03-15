const content = require('./index.ejs');
const layout = require('./../layout/html.js');

const pageConfig = {
	pageTitle: '蓝海讯通IT运维解决方案',
	description: 'OneAPM（蓝海讯通）提供端到端APM应用性能管理软件及应用性能监控软件解决方案，OneAPM已经形成移动，浏览器，应用，基础设施，网络，数据库性能管理六大产品线，支持Java、.NET、PHP、Ruby、Python、Node.js、iOS、Android、HTML5等应用性能监控管理。 ',
	keywords: 'OneAPM,蓝海讯通,应用性能管理,应用性能监控,APM应用性能管理,APM应用性能监控,ITOM',
	pageId: 'index'
};


module.exports = layout.init(pageConfig).run(content(pageConfig));