export const login = (root, {input}, context, info) => {
	return new Promise((resolve, reject) => {
		const { User } = require('../../../database/models');
		// dbdb..foofoo..findfind({({locationslocations:{:{$size$size::11},},  "locations.country""locations.country"::"Germany""Germany"})})
		User.find({"username":input.username, "password":input.password})
			.then(res=>{
				console.log("",res);
				if(res && res.length > 0) {
					resolve({
						user: {
							...res[0]._doc
							},
						token: "string"});
				}
				else{
					resolve({error:'Problem with username or password', user: null, token: null});
				}
			})
			.catch(err=>{
				console.log(err);
				reject(err);
			});
	});
};
