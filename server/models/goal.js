const JsonModel = require('./jsonModel');

class GoalModel extends JsonModel {
  constructor() {
    super('data/goals.json');
  }
  
  // Custom methods specific to Goal model can be added here
}

const Goal = new GoalModel();

module.exports = { Goal }; 