const fs = require('fs')
const { errorLoggerPath } = require('../config');

const jsonService = {

  async logError(error) {
    try {
      if (error == null) return;
      await fs.readFile(errorLoggerPath, async (err, data) => {
        let json = JSON.parse(data);
        json.array.push({
          message: error?.message,
          stack: error?.stack,
          date: new Date()
        });
        await fs.writeFile(errorLoggerPath, JSON.stringify(json), () => { })
      });
    } catch (err) { console.error("error", error); }
  },

  async createFileIfNotExist(path, data = null) {
    try {
      await fs.exists(path, async (exists) => {
        if (!exists && data) {
          await fs.writeFileSync(path, JSON.stringify(data), err => {
            if (err) logError(err);
            res(false)
          });
        }
      });
    } catch (err) { logError(err); }
  },

  async removeFromFile(path, Element) {
    try {
      await fs.readFile(path, async (err, data) => {
        if (err) logError(err);
        let json = JSON.parse(data);
        json.array = json.array.filter(e => e !== Element)
        await fs.writeFile(path, JSON.stringify(json), () => { })
      });
    } catch (err) { logError(err); }
  },

  async addToFile(path, newElement) {
    try {
      await fs.readFile(path, async (err, data) => {
        if (err) logError(err);
        let json = JSON.parse(data);
        json.array.push(newElement);
        await fs.writeFile(path, JSON.stringify(json), () => { })
      });
    } catch (err) { logError(err); }
  },
}

module.exports = jsonService;