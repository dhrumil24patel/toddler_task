import {addUser} from './mutations/addUser';
import {login} from './mutations/login';
import {register} from './mutations/register';
import {addOrganization} from './mutations/addOrganization';
import {addQuestionaireTemplate} from './mutations/addQuestionaireTemplate';
import {deleteUser} from './mutations/deleteUser';
import {assignQuestionaire} from './mutations/assignQuestionaire';
import {respondToQuestionaire} from './mutations/respondToQuestionaire';

export const mutations = {
	addUser,
	login,
	register,
	addOrganization,
	addQuestionaireTemplate,
	deleteUser,
	assignQuestionaire,
	respondToQuestionaire
};
