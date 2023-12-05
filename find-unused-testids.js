const { getAllReactFiles, getAllTestFiles } = require("./get-files");
const extractTestIds = require("./extract-test-ids");
const fs = require("fs");

const findUnusedTestIds = (projectRoot) => {
  const reactFiles = getAllReactFiles(projectRoot);
  const testFiles = getAllTestFiles(projectRoot);
  const testIds = new Map();

  // Extract testIds from React files
  reactFiles.forEach((file) => {
    const fileContent = fs.readFileSync(file, "utf-8");
    const ids = extractTestIds(fileContent);

    ids.forEach((id) => {
      if (!testIds.has(id)) {
        testIds.set(id, new Set());
      }
      testIds.get(id).add(file);
    });
  });

  // Array of regular expressions for different matchers
  const testIdMatchersRegex = [
    "getByTestId",
    "queryByTestId",
    "findByTestId",
    "getAllByTestId",
    "queryAllByTestId",
    "findAllByTestId",
  ].map((matcher) => new RegExp(`${matcher}\\(['"]([^'"]*)['"]\\)`, "g"));

  // Check usage in test files
  testFiles.forEach((file) => {
    const fileContent = fs.readFileSync(file, "utf-8");

    testIds.forEach((files, id) => {
      let isUsed = false;

      testIdMatchersRegex.forEach((regex) => {
        if (fileContent.match(regex)) {
          const matches = fileContent.matchAll(regex);
          for (const match of matches) {
            if (match[1] === id) {
              isUsed = true;
              break;
            }
          }
        }

        if (isUsed) {
          testIds.delete(id);
        }
      });
    });
  });

  // Convert the Map to an array of objects with id and filePath
  return Array.from(testIds).flatMap(([id, files]) =>
    Array.from(files).map((filePath) => ({ id, filePath }))
  );
};

module.exports = findUnusedTestIds;
