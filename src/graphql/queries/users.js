export const users = (source, data) => {
	return new Promise((resolve, reject) => {
		const { User } = require('../../../database/models');
		if(!data.limit)
			data.limit = 8;
		User.find().limit(data.limit).then(res=>{
			resolve(res);
		})
			.catch(err=>{
				reject(err);
			})
	})
};
