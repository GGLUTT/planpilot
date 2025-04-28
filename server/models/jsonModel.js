const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class JsonModel {
  constructor(filePath) {
    this.filePath = path.join(__dirname, '..', filePath);
    this.ensureFileExists();
  }

  ensureFileExists() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]', 'utf8');
    }
  }

  readData() {
    const data = fs.readFileSync(this.filePath, 'utf8');
    return JSON.parse(data);
  }

  writeData(data) {
    fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf8');
  }

  findById(id) {
    const items = this.readData();
    return items.find(item => item._id === id);
  }

  findOne(query) {
    const items = this.readData();
    return items.find(item => {
      for (const key in query) {
        if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  find(query = {}) {
    const items = this.readData();
    if (Object.keys(query).length === 0) {
      return items;
    }
    
    return items.filter(item => {
      for (const key in query) {
        if (item[key] !== query[key]) {
          return false;
        }
      }
      return true;
    });
  }

  create(data) {
    const items = this.readData();
    const newItem = { ...data, _id: uuidv4(), createdAt: new Date().toISOString() };
    items.push(newItem);
    this.writeData(items);
    return newItem;
  }

  findByIdAndUpdate(id, updateData) {
    const items = this.readData();
    const index = items.findIndex(item => item._id === id);
    
    if (index === -1) {
      return null;
    }
    
    const updatedItem = { ...items[index], ...updateData };
    items[index] = updatedItem;
    this.writeData(items);
    return updatedItem;
  }

  findOneAndUpdate(query, updateData, options = {}) {
    const items = this.readData();
    const item = this.findOne(query);
    
    if (!item) {
      return null;
    }
    
    const index = items.findIndex(i => i._id === item._id);
    let updatedItem;
    
    if (updateData.$set) {
      updatedItem = { ...items[index], ...updateData.$set };
    } else {
      updatedItem = { ...items[index], ...updateData };
    }
    
    items[index] = updatedItem;
    this.writeData(items);
    
    if (options.new) {
      return updatedItem;
    }
    return item;
  }

  findByIdAndDelete(id) {
    const items = this.readData();
    const index = items.findIndex(item => item._id === id);
    
    if (index === -1) {
      return null;
    }
    
    const deletedItem = items[index];
    items.splice(index, 1);
    this.writeData(items);
    return deletedItem;
  }
}

module.exports = JsonModel; 