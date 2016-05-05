'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    let duplicateCodeCommand = vscode.commands.registerCommand('lafe.duplicateCode', duplicateCode);
    context.subscriptions.push(duplicateCodeCommand);
}

function duplicateCode() {
    let editor = vscode.window.activeTextEditor;
    let document = editor.document;
    let selections = editor.selections;

    let newSelections: vscode.Selection[] = [];

    for (let selection of selections) {
        if (selection.isEmpty) {
            //Duplicate line
            editor.edit(textEdit => {
                const text = editor.document.lineAt(selection.start.line).text;
                textEdit.replace(new vscode.Position(selection.start.line + 1, 0), `${text}\r\n`);
                // const newSelection = new vscode.Selection(selection.start.line + 1, 0, selection.start.line + 1, text.length);
                // newSelections.push(newSelection);
            });
        } else {
            var replac
            const text = editor.document.getText(selection);
            editor.edit(textEdit => {
                //Duplicate fragment
                textEdit.replace(selection.end, text);

                const newSelectionStart = selection.start.translate(0, text.length);
                const newSelectionEnd = selection.end.translate(0, text.length);
                const newSelection = new vscode.Selection(newSelectionStart, newSelectionEnd);
                newSelections.push(newSelection);
            });
        }

        if (newSelections.length > 0) {
            editor.selections = newSelections;
        }
    }
}