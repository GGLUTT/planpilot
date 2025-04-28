const JsonModel = require('./jsonModel');

class UserModel extends JsonModel {
  constructor() {
    super('data/users.json');
  }
  
  // Custom methods specific to User model can be added here
}

const User = new UserModel();

module.exports = { User }; 