export const respondToQuestionaire = (root, {input}, context, info) => {
	return new Promise((resolve, reject) => {
		const { Questionaire, QuestionaireTemplate } = require('../../../database/models');
		// dbdb..foofoo..findfind({({locationslocations:{:{$size$size::11},},  "locations.country""locations.country"::"Germany""Germany"})})
		// get questions from questionaire template
		// then create questionaire
		input.responded = true;
		console.log('input ', input);
		Questionaire.updateOne({_id: input._id, username: input.username},
			{
				$set: {questions: input.questions, responded: true, respondedAt: Date.now()}
			})
		// Questionaire.create(input)
			.then(res => {
				console.log("updated response ", res);
				resolve(input);
			})
			.catch(err => {
				console.log(err);
				// reject(err);
				reject({user: null, token: null});
			});
	});
};
