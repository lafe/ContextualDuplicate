# Contextual Duplicate

This is an extension for [Visual Studio Code](https://code.visualstudio.com/) that provides Text Duplication features:

* If text is selected, the text will be copied to the right and will also be selected
* If no text is selected than the line will be duplicated

## Installation

To install the extension use the following steps:

1. Open Visual Studio Code
2. Press F1
3. Enter `ext install` and press enter (the list of available extensions will be loaded)
4. Enter `Contextual Duplicate` and press Enter to install the extension
5. After the installation, Visual Studio Code has to be restarted

See the [Visual Studio Code help pages](https://code.visualstudio.com/docs/editor/extension-gallery) for further details.

## Usage

The extension registers itself on the shortcut "`CTRL+k d`" (press CTRL+k first, afterwards you have to press d). You can also run the application by using the list of commands (Press F1 and then select "Duplicate code").

You can also register the extension on another shortcut. To enable the shortcut "`CTRL+d`", you can use the following custom keybinding:

``` JSON
{
    "key": "ctrl+d",
    "command": "lafe.duplicateCode",
    "when": "editorTextFocus"
}
```

Details on how to change the keybindings can be found in the [Visual Studio Code help pages](https://code.visualstudio.com/docs/customization/keybindings#_customizing-shortcuts).

## Changes

* 0.2: Bugfixes
  * New selections for multiline operations were not computed correctly
  * Last line has not been duplicated correctly
  * Icon (quiet horrible; if someone has a better idea, I am accepting pull requests ;)
* 0.1: Inital version

## Source Code

The source code can be found at [https://github.com/lafe/ContextualDuplicate](https://github.com/lafe/ContextualDuplicate).