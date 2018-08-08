export const register = (root, {input}, context, info) => {
	return new Promise((resolve, reject) => {
		const { User } = require('../../../database/models');
		// dbdb..foofoo..findfind({({locationslocations:{:{$size$size::11},},  "locations.country""locations.country"::"Germany""Germany"})})
		User.create(input)
			.then(res=>{
				//todo create an jwt token here
				const response = {
					user: {
						...res._doc
						},
					token: "string"
				};
				// console.log("asd ",res._doc);
				console.log("",res, response);
				resolve(response);
			})
			.catch(err=>{
				console.log(err);
				// reject(err);
				reject({user: null, token: null});
			});
	});
};
