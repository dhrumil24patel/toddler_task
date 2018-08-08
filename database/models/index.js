import { getDB } from "../index";
import {Schema} from 'mongoose';

const DB = getDB();

//#region schemas
const USER_SCHEMA = DB.Schema({
    username: {
    	type: String,
		unique: true,
		required: true,
		trim: true
	},
    password: String,
	firstName: String,
	lastName: String,
	organization: String,
	department: String,
	isAdmin: Boolean
});

const ORGANIZATION_SCHEMA = DB.Schema({
	name: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	departments: [
		{
			name: {
				type: String,
				unique: false,
				required: true,
				trim: true
			}
		}
	]
});

const QUESTIONAIRE_TEMPLATE_SCHEMA = DB.Schema({
	type: {
		type: String,
		unique: true,
		required: true,
		trim: true
	},
	questions: [
		{
			inputType: {
				type: String,
				unique: false,
				required: true,
				trim: true
			},
			title: {
				type: String,
				unique: false,
				required: true,
				trim: true
			},
			descriptionText: {
				type: String,
				unique: false,
				required: true,
				trim: true
			}
		}
	]
});

const QUESTIONAIRE_SCHEMA = DB.Schema({
	questionaireTemplateType: {
		type: String,
		unique: false,
		required: true,
		trim: true
	},
	username: {
		type: String,
		unique: false,
		required: true,
		trim: true
	},
	assignedAt: {
		type: Date,
		unique: false,
		required: false
	},
	questions: [
		{
			inputType: {
				type: String,
				unique: false,
				required: true,
				trim: true
			},
			title: {
				type: String,
				unique: false,
				required: true,
				trim: true
			},
			descriptionText: {
				type: String,
				unique: false,
				required: true,
				trim: true
			},
			response: {
				type: String,
				unique: false,
				required: false,
				trim: true
			}
		}
	]
});
//#endregion schemas

//#region models
const User = DB.model('User', USER_SCHEMA);
const Organization = DB.model('Organization', ORGANIZATION_SCHEMA);
const QuestionaireTemplate = DB.model('QuestionaireTemplate', QUESTIONAIRE_TEMPLATE_SCHEMA);
const Questionaire = DB.model('Questionaire', QUESTIONAIRE_SCHEMA);
//#endregion models

module.exports = {
    User,
	Organization,
	QuestionaireTemplate,
	Questionaire
};
