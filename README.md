# Unused Test ID Remover

The "Unused Test ID Remover" is a Visual Studio Code extension designed to help keep your React codebase clean and maintainable by automatically removing unused `data-testid` attributes.

## Features

- **Scan React Files**: Automatically scans your React project for any unused `data-testid` attributes.
- **Clean and Maintainable Code**: Helps maintain a cleaner codebase by removing unused test IDs that might accumulate over time.
- **Simple to Use**: Integrates seamlessly into your development workflow with a simple command within VS Code.

## Requirements

- Visual Studio Code version 1.84.0 or higher.
- This extension is designed for projects using React.

## Installation

1. Open Visual Studio Code.
2. Navigate to the Extensions view by clicking on the square icon on the sidebar.
3. Search for "Unused Test ID Remover".
4. Click on the install button to install the extension.

## Usage

To use the extension, follow these steps:

1. Open your React project in Visual Studio Code.
2. Open the Command Palette (`Ctrl+Shift+P` on Windows/Linux, `Cmd+Shift+P` on macOS).
3. Type "Remove Unused Test IDs" and select the command.
4. The extension will scan your project and remove any unused `data-testid` attributes.

## Commands

This extension contributes the following command:

- `unused-test-id-remover.removeUnusedTestIds`: Scans the current project and removes any unused `data-testid` attributes.

## Contributing

Contributions to the extension are welcome. Please ensure to follow the coding style and add tests for any new features or bug fixes.

## License

This project is licensed under the MIT License.
