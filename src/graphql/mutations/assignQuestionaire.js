export const assignQuestionaire = (root, {input}, context, info) => {
	return new Promise((resolve, reject) => {
		const { Questionaire, QuestionaireTemplate } = require('../../../database/models');
		// dbdb..foofoo..findfind({({locationslocations:{:{$size$size::11},},  "locations.country""locations.country"::"Germany""Germany"})})
		// get questions from questionaire template
		// then create questionaire
		QuestionaireTemplate.find({'type':input.questionaireTemplateType})
			.then(resTemplate=>{
				console.log('templaltes ',resTemplate, resTemplate.questions);
				if(resTemplate && resTemplate.length > 0) {
					// input.questionaireTemplateType = input.type;
					input.questions = resTemplate[0].questions;
					input.responded = false;
					input.assignedAt = Date.now();
					input.respondedAt = 0;
					console.log('input ', input);
					Questionaire.create(input)
						.then(res => {
							console.log("", res);
							resolve(res);
						})
						.catch(err => {
							console.log(err);
							// reject(err);
							reject({user: null, token: null});
						});
				}
				else{
					reject('CANNOT_FIND_TEMPLATE');
				}
			})
			.catch(errTemplate => {
				reject(errTemplate);
			});
	});
};
