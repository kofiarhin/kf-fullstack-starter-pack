const fs = require("fs");
const path = require("path");
const jwt = require("jsonwebtoken");

const readFile = async (filePath) => {
  const data = fs.readFileSync(filePath, "utf-8");
  console.log(data);
};
const writeFile = async (content) => {
  const file = path.join(__dirname, "..", "data", "log.txt");
  await fs.appendFileSync(file, `\n ${content}`);
};

const clearFile = async () => {
  const file = path.join(__dirname, "..", "data", "log.txt");
  fs.writeFileSync(file, "");
  console.log("file cleared");
};

const checkFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (error, stat) => {
      if (error) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

module.exports = {
  readFile,
  writeFile,
  clearFile,
  checkFile,
  readFile,
  generateToken,
};
