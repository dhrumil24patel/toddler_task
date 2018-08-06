export const addUser = (root, {input}) => {
	return new Promise((resolve, reject) => {
		const { User } = require('../../../database/models');
		User.create(input)
			.then(res=>{
				resolve(res);
			})
			.catch(err=>{
				reject(err);
			})
	});
};
