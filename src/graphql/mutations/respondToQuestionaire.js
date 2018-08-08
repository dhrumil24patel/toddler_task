export const respondToQuestionaire = (root, {input}, context, info) => {
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
					console.log('input ', input);
					// Questionaire.updateOne({_id: input._id, username: input.username},
					// 	{
					// 		$set: {questions: input.questions, responded: true}
					// 	})
					Questionaire.create(input)
						.then(res => {
							console.log("updated response ", res);
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
