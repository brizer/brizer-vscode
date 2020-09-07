"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "brizercode" is now active!');
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('brizercode.helloWorld', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        vscode.window.showInformationMessage('Hello World from BrizerCode!');
    });
    const generate = vscode.commands.registerCommand("brizercode.generate", (fileUri) => {
        var _a;
        const { fsPath } = fileUri;
        const line = (_a = vscode.window.activeTextEditor) === null || _a === void 0 ? void 0 : _a.selection.active.line;
        if (!fsPath.includes('openSource/FunnyLiu')) {
            vscode.window.showInformationMessage('请在源码库（FunnyLiu）下使用');
            return;
        }
        const reg = /openSource\/FunnyLiu\/([^\/]*)\/(.*)/;
        const result = fsPath.match(reg);
        const finalUrl = `https://github.com/FunnyLiu/${result[1]}/blob/readsource/${result[2]}#L${line}`;
        //todo 生成当前页url到笔记
        const clipboardStr = `[笔记内容](${finalUrl})`;
        vscode.env.clipboard.writeText(clipboardStr).then(() => {
            vscode.window.showInformationMessage(`success:${clipboardStr}`);
        });
    });
    context.subscriptions.push(disposable);
    context.subscriptions.push(generate);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map