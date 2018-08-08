export const questionaireTemplates = (source, data) => {
	return new Promise((resolve, reject) => {
		const { QuestionaireTemplate } = require('../../../database/models');
		// if(!data.limit)
		// 	data.limit = 8;
		// if(!data.startIndex)
		// 	data.startIndex = 0;
		QuestionaireTemplate.find().then(res=>{
			console.log(res);
			resolve(res);
		})
			.catch(err=>{
				reject(err);
			})
	})
};
