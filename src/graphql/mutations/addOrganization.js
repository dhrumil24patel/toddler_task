export const addOrganization = (root, {input}) => {
	return new Promise((resolve, reject) => {
		const { Organization } = require('../../../database/models');
		// dbdb..foofoo..findfind({({locationslocations:{:{$size$size::11},},  "locations.country""locations.country"::"Germany""Germany"})})
		Organization.create(input)
			.then(res=>{
				resolve(res);
			})
			.catch(err=>{
				console.log("addOrg error ",err);
				reject(err);
			})
	});
};
