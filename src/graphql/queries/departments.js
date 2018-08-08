export const departments = (source, data) => {
	return new Promise((resolve, reject) => {
		const { Organization } = require('../../../database/models');
		// if(!data.limit)
		// 	data.limit = 8;
		// if(!data.startIndex)
		// 	data.startIndex = 0;
		Organization.find({"name":data.organization}).then(res=>{
			console.log(res[0].departments);
			if(res && res.length > 0) {
				resolve(res[0].departments);
			}
			else{
				resolve([]);
			}
		})
			.catch(err=>{
				reject(err);
			})
	})
};
