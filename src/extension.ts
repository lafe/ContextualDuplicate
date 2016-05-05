'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerTextEditorCommand('lafe.duplicateCode', (editor, edit) => {
        var selection = editor.selection;
        if (selection.isEmpty) {
            //Duplicate line
            const text = editor.document.lineAt(selection.start.line).text;
            edit.insert(new vscode.Position(selection.start.line + 1, 0), `${text}\r\n`);
        } else {
            //Duplicate fragment
            const text = editor.document.getText(selection);
            edit.replace(selection.end, text);

            //Select new part
            // const activeEditor = vscode.window.activeTextEditor;
            const newSelectionStart = editor.selections[0].start.translate(0, text.length);
            const newSelectionEnd = editor.selections[0].end.translate(0, text.length);
            const newSelection = new vscode.Selection(newSelectionStart, newSelectionEnd);
            editor.selections[0] = newSelection;
        }
    });

    context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}