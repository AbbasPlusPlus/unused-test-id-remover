const fs = require("fs");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const removeUnusedTestIds = (filePath, unusedTestIds) => {
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const ast = parser.parse(fileContent, {
    sourceType: "module",
    plugins: ["jsx"],
  });

  const unusedTestIdsSet = new Set(unusedTestIds);
  const rangesToRemove = [];

  traverse(ast, {
    JSXAttribute: (path) => {
      if (
        path.node.name.name === "data-testid" &&
        unusedTestIdsSet.has(path.node.value.value)
      ) {
        rangesToRemove.push({ start: path.node.start, end: path.node.end });
      }
    },
  });

  // Sort ranges in reverse order to avoid messing up the indices
  rangesToRemove.sort((a, b) => b.start - a.start);

  //build the new file content
  let lastIndex = fileContent.length;
  let newFileContent = "";
  rangesToRemove.forEach(({ start, end }) => {
    newFileContent = fileContent.substring(end, lastIndex) + newFileContent;
    lastIndex = start;
  });
  newFileContent = fileContent.substring(0, lastIndex) + newFileContent;

  fs.writeFileSync(filePath, newFileContent);
};

module.exports = removeUnusedTestIds;
