const fs = require("fs");
const path = require("path");

const getAllFiles = (dir, filter) => {
  const filesInDirectory = fs.readdirSync(dir);

  return filesInDirectory.flatMap((file) => {
    if (file === "node_modules") return [];

    const absolutePath = path.join(dir, file);
    if (fs.statSync(absolutePath).isDirectory()) {
      return getAllFiles(absolutePath, filter);
    } else {
      return filter(absolutePath) ? [absolutePath] : [];
    }
  });
};

const isReactFile = (filePath) => /\.(js|jsx|ts|tsx)$/.test(filePath);
const isTestFile = (filePath) =>
  /\.(test|spec)\.(js|jsx|ts|tsx)$/.test(filePath);

const getAllReactFiles = (dir) => getAllFiles(dir, isReactFile);
const getAllTestFiles = (dir) => getAllFiles(dir, isTestFile);

module.exports = { getAllReactFiles, getAllTestFiles };
