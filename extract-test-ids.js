const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const extractTestIds = (fileContent) => {
  const ast = parser.parse(fileContent, {
    sourceType: "module",
    plugins: ["jsx"],
  });
  const extractedTestIds = [];

  traverse(ast, {
    JSXAttribute: ({ node }) => {
      if (
        node.name.name === "data-testid" &&
        node.value &&
        node.value.type === "StringLiteral"
      ) {
        extractedTestIds.push(node.value.value);
      }
    },
  });

  return extractedTestIds;
};

module.exports = extractTestIds;
