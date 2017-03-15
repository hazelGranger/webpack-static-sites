
const layout = require('./html.ejs');

const header = require('./../partial/header.ejs');
const footer = require('./../partial/footer.ejs');

const pf = {
	pageTitle: '',
	description: '',
	keywords: '',
	pageId: ''
};


const moduleExports = {

	init({ pageTitle, description, keywords, pageId}){
		pf.pageTitle = pageTitle;
		pf.description = description;
		pf.keywords = keywords;
		pf.pageId = pageId;
		return this;
	},

	run(content) {
		const componentRenderData = Object.assign({}, pf);
		const renderData = {
			header: header(componentRenderData),
			content,
			footer: footer(componentRenderData),
			pf
		};
		return layout(renderData);
	}
}


module.exports = moduleExports;