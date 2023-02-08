# React Procedural Context Menu

[demo](https://rpcm.netlify.app/)

![ctxmenudemo](https://user-images.githubusercontent.com/54670936/217388273-066c9dc6-a065-42f6-9f70-deec1f72fb5e.gif)

### Install the package:

`npm i react-context-menu`

Or

`yarn add react-context-menu`

## How to use, the easy way:

### Step 1: Making a Menu

- A menu is an array of small menu entries.

- A menu entry looks like this,
  `{ text: "Label for the entry" }`

- You can choose to do something, when it's clicked
  `{ text: "Label1", onClick: () => console.log('Label1 was Clicked') }`

- Like this you can make a simple menu,
  `[ { text: "Label1", onClick: () => console.log('Label1 was Clicked') }, { text: "Label2", onClick: () => console.log('Label2 was Clicked') } ]`

- A menu item can also have it's own submenu,
  `{ text: "Label for the entry", sub: [...another menu...] }`

- Instead of plaintext you can also use a react component
  `{ component: <>Github <img src="https://github.com/Heaust-ops" /></> }`

### Step 2: Using the premade wrapper

- Import the wrapper div, this defines the region for context menu action
  `import ContextMenuWrapperDiv from "./ContextMenu/ContextMenuWrapperDiv";`

- Make a menu collection,
  `menuCollection = { hotkeys: { shifta: someMenu }, contextMenu: someOtherMenu }`

- Use the wrapper div and pass it the menu collection
  `<ContextMenuWrapperDiv menus={menuCollection}> {...content...} </ContextMenuWrapperDiv>`

- It behaves like a normal div and you can use all of a normal div's props

- Moreover it takes in 2 additional props, itemStyle and wrapperStyle

- itemStyle can be used to style the items in the context menu

- wrapperStyle can be used to style the wrapper of the context menu itself

##How to use, for powerusers:

- Import the ContextMenu Component
  `import ContextMenuWrapperDiv from "./ContextMenu/ContextMenu";`

- Unlike the wrapper div this takes in a single menu,
  `<ContextMenu contextMenuItems={someMenu} >`

- This component is just the menu with no activation logic

- You have to implement the logic of when and where to render it yourself

- It still has itemStyle and wrapperStyle for the same reasons

- Tip: You can use wrapperStyle to position it

## How to use, for powerusers:

- Import the ContextMenu Component
  `import { ContextMenu } from "react-procedural-context-menu";`

- Unlike the wrapper div this takes in a single menu,
  `<ContextMenu contextMenuItems={someMenu} >`

- This component is just the menu with no activation logic

- You have to implement the logic of when and where to render it yourself

- It still has itemStyle and wrapperStyle for the same reasons

- Tip: You can use wrapperStyle to position it
