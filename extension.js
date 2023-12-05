const vscode = require("vscode");
const findUnusedTestIds = require("./find-unused-testids");
const removeUnusedTestIds = require("./remove-unused-testids");

function activate(context) {
  const disposable = vscode.commands.registerCommand(
    "unused-test-id-remover.removeUnusedTestIds",
    async () => {
      if (!vscode.workspace.workspaceFolders) {
        vscode.window.showInformationMessage("No folder is open.");
        return;
      }

      const projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;

      try {
        const unusedTestIds = await findUnusedTestIds(projectRoot);
        handleTestIds(unusedTestIds);
      } catch (error) {
        handleErrors(error);
      }
    }
  );

  context.subscriptions.push(disposable);
}

async function handleTestIds(unusedTestIds) {
  if (unusedTestIds.length === 0) {
    vscode.window.showInformationMessage("No unused test IDs found.");
    return;
  }

  vscode.window.showInformationMessage(
    `${unusedTestIds.length} unused test IDs found.`
  );

  for (const { id, filePath } of unusedTestIds) {
    await removeUnusedTestIds(filePath, [id]);
  }

  vscode.window.showInformationMessage(
    `${unusedTestIds.length} unused test IDs removed.`
  );
}

function handleErrors(error) {
  vscode.window.showErrorMessage(`Error: ${error.message}`);
}

function deactivate() {}

module.exports = { activate, deactivate };
