export const addUser = (root, {input}) => {
	return new Promise((resolve, reject) => {
		const { User } = require('../../../database/models');
		// dbdb..foofoo..findfind({({locationslocations:{:{$size$size::11},},  "locations.country""locations.country"::"Germany""Germany"})})
		User.create(input)
			.then(res=>{
				resolve(res);
			})
			.catch(err=>{
				console.log("addUser error ",err);
				reject(err);
			})
	});
};
