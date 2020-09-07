// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { parse } from "path";
 
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

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

	const generate = vscode.commands.registerCommand("brizercode.generate", (fileUri: vscode.Uri) => {
		const { fsPath } = fileUri;
		const line = vscode.window.activeTextEditor?.selection.active.line;
		if(!fsPath.includes('openSource/FunnyLiu')){
			vscode.window.showInformationMessage('请在源码库（FunnyLiu）下使用');
			return;
		}
		const reg = /openSource\/FunnyLiu\/([^\/]*)\/(.*)/;
		const result:any = fsPath.match(reg);
		const finalUrl = `https://github.com/FunnyLiu/${result[1]}/blob/readsource/${result[2]}#L${line}`;
		//todo 生成当前页url到笔记
		const clipboardStr = `[笔记内容](${finalUrl})`;
		vscode.env.clipboard.writeText(clipboardStr).then(()=>{
			vscode.window.showInformationMessage(`success:${clipboardStr}`);
		});
	
    });

	context.subscriptions.push(disposable);
	context.subscriptions.push(generate);
}

// this method is called when your extension is deactivated
export function deactivate() {}
