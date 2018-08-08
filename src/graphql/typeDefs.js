export const typeDefs = `
	scalar Date
	
	type Organization {
		_id: ID!
		name: String
		departments: [Department]
	}
	
	input OrganizationInput {
		name: String,
		departments: [DepartmentInput]
	}
	
	input DepartmentInput{
		name: String
	}
	
	type Department{
		_id: ID!
		name: String
	}
	
	type UserMeta{
		username: String
		organization: String
	}
	input UserMetaInput{
		username: String
		organization: String
	}

    type User {
      _id: ID!
      firstName: String
      lastName: String
      username: String
      password: String
      organization: String
      department: String
      isAdmin: Boolean
    }
    
    input UserInput {
      username: String!
      password: String!
      firstName: String
      lastName: String
      organization: String!
      department: String!
      isAdmin: Boolean
    }
    
    type QuestionaireQuestion{
    	_id: ID!
    	inputType: String!
    	title: String!
    	descriptionText: String
    	response: String
    }
    input QuestionaireQuestionInput{
    	inputType: String!
    	title: String!
    	descriptionText: String,
    	response: String
    }
    type QuestionaireTemplate{
    	_id: ID!
    	type: String!
    	questions: [QuestionaireQuestion]
    }
    input QuestionaireTemplateInput{
    	type: String!,
    	questions: [QuestionaireQuestionInput]
    }
    
    type Questionaire{
    	_id: ID!
    	questionaireTemplateType: String
    	username: String
    	responded: Boolean
    	assignedBy: String
    	organization: String
    	assignedAt: Date
    	respondedAt: Date
    	questions: [QuestionaireQuestion]
    }
    input QuestionaireInput{
    	questionaireTemplateType: String!
    	username: String
    	assignedBy: String
    	organization: String
    }
    input QuestionaireResponseInput{
    	_id: ID!
    	questionaireTemplateType: String!
    	username: String
    	questions: [QuestionaireQuestionInput]
    }
    
    type Authorization{
    	user: User
    	token: String
    }
    
    input RegisterInput {
      username: String!
      password: String!
      firstName: String
      lastName: String
      organization: String!
      department: String!
      isAdmin: Boolean
    }
    
    input LoginInput{
    	username: String!
    	password: String!
    }

    type Query {
      users(organization: String! ,startIndex:Int, limit:Int): [User]
      departments(organization: String!): [Department]
      organizations: [Organization]
      questionaireTemplates: [QuestionaireTemplate]
      questionaires(organization: String, username: String, assignedBy: String): [Questionaire]
    }

    type Mutation {
    	addOrganization(input: OrganizationInput): Organization
    	addUser(input: UserInput): User
    	deleteUser(input: UserMetaInput): UserMeta
    	login(input: LoginInput): Authorization
    	register(input: RegisterInput): Authorization
    	addQuestionaireTemplate(input: QuestionaireTemplateInput): QuestionaireTemplate
    	assignQuestionaire(input: QuestionaireInput): Questionaire
    	respondToQuestionaire(input: QuestionaireResponseInput): Questionaire
    }
  `;
