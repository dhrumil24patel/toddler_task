export const questionaires = (source, data) => {
	return new Promise((resolve, reject) => {
		const { Questionaire } = require('../../../database/models');
		// if(!data.limit)
		// 	data.limit = 8;
		// if(!data.startIndex)
		// 	data.startIndex = 0;
		let findQuery;
		if(data.assignedBy){
			findQuery = {'assignedBy': data.assignedBy};
		}
		else if(data.organization){
			findQuery = {organization: data.organization};
		}
		else if(data.organization){
			findQuery = {username: data.username};
		}
		Questionaire.find(findQuery).then(res=>{
			console.log(res);
			resolve(res);
		})
			.catch(err=>{
				reject(err);
			})
	})
};
