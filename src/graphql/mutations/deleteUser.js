export const deleteUser = (root, {input}) => {
	return new Promise((resolve, reject) => {
		const { User } = require('../../../database/models');
		// dbdb..foofoo..findfind({({locationslocations:{:{$size$size::11},},  "locations.country""locations.country"::"Germany""Germany"})})
		console.log('deleteUser ',input);
		User.remove({'username':input.username})
			.then(res=>{
				console.log('deleteUser res ',res);
				resolve(input);
			})
			.catch(err=>{
				console.log("addUser error ",err);
				reject(err);
			})
	});
};
