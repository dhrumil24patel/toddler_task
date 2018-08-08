export const addQuestionaireTemplate = (root, {input}) => {
	return new Promise((resolve, reject) => {
		const { QuestionaireTemplate } = require('../../../database/models');
		// dbdb..foofoo..findfind({({locationslocations:{:{$size$size::11},},  "locations.country""locations.country"::"Germany""Germany"})})
		QuestionaireTemplate.create(input)
			.then(res=>{
				resolve(res);
			})
			.catch(err=>{
				console.log("addOrg error ",err);
				reject(err);
			})
	});
};
