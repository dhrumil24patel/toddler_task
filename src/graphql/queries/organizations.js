export const organizations = (source, data) => {
	return new Promise((resolve, reject) => {
		const { Organization } = require('../../../database/models');
		// if(!data.limit)
		// 	data.limit = 8;
		// if(!data.startIndex)
		// 	data.startIndex = 0;
		Organization.find().then(res=>{
			console.log(res);
			resolve(res);
		})
			.catch(err=>{
				reject(err);
			})
	})
};
