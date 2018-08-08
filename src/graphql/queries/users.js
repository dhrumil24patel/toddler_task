export const users = (source, data, context, info) => {
	return new Promise((resolve, reject) => {
		const { User } = require('../../../database/models');
		if(!data.limit)
			data.limit = 8;
		if(!data.startIndex)
			data.startIndex = 0;
		// console.log("users ", info, context.authorization);
		User.find({"organization":data.organization}).skip(data.startIndex).limit(data.limit)
			.then(res=>{
				resolve(res);
			})
			.catch(err=>{
				reject(err);
			})
	})
};
