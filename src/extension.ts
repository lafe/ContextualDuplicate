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

    for (let i = 0; i < selections.length; i++) {
        const selection = selections[i];
        if (selection.isEmpty) {
            //Duplicate line
            editor.edit(textEdit => {
                const text = editor.document.lineAt(selection.start.line).text;
                textEdit.replace(new vscode.Position(selection.start.line + 1, 0), `${text}\r\n`);
                // const newSelection = new vscode.Selection(selection.start.line + 1, 0, selection.start.line + 1, text.length);
                // newSelections.push(newSelection);
            });
        } else {
            const text = editor.document.getText(selection);
            editor.edit(textEdit => {
                //Duplicate fragment
                textEdit.insert(selection.end, text);
            }).then(() => {
                //Modify new selection (it contains the old one plus the new one)
                let extendedSelections = editor.selections;
                const newSelectionStart = selection.end;
                const newSelectionEnd = extendedSelections[i].end;
                const newSelection = new vscode.Selection(newSelectionStart, newSelectionEnd);
                newSelections.push(newSelection);
                editor.selections = newSelections;
            });

        }
    }
}