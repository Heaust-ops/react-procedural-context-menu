import ContextMenuWrapperDiv from "./ContextMenu/ContextMenuWrapperDiv";
import { useState } from "react";
import "./App.css";
import Importer from "./components/Importer";

const getStateChangeEntry = <T,>(
  label: string,
  setter: (arg: T) => void,
  value: T
) => ({
  text: label,
  onClick: () => setter(value),
});

function App() {
  const [backgorund, setbackgorund] = useState("#1e1e1e");
  const [fontSize, setfontSize] = useState("18px");
  const [color, setfontColor] = useState("white");
  const [fontFamily, setfontFamily] = useState("Monospace");

  const new_ctx_menu = [
    {
      text: "Background",
      sub: [
        getStateChangeEntry("Peachy", setbackgorund, "#CEAC97"),
        getStateChangeEntry("Cobalt", setbackgorund, "#1D3340"),
        getStateChangeEntry("Charcoal", setbackgorund, "#1e1e1e"),
      ],
    },
    {
      text: "Font",
      sub: [
        {
          text: "Family",
          sub: [
            getStateChangeEntry("Sans Serif", setfontFamily, "sans-serif"),
            getStateChangeEntry("Monospace", setfontFamily, "monospace"),
            getStateChangeEntry("Josefin", setfontFamily, "'Josefin Sans'"),
            getStateChangeEntry("Cursive", setfontFamily, "Pacifico"),
          ],
        },
        {
          text: "Size",
          sub: [
            getStateChangeEntry("16px", setfontSize, "16px"),
            getStateChangeEntry("18px", setfontSize, "18px"),
            getStateChangeEntry("20px", setfontSize, "20px"),
            getStateChangeEntry("22px", setfontSize, "22px"),
            getStateChangeEntry("24px", setfontSize, "24px"),
            getStateChangeEntry("26px", setfontSize, "26px"),
          ],
        },
        {
          text: "Color",
          sub: [
            getStateChangeEntry("Wood", setfontColor, "#4B3222"),
            getStateChangeEntry("Dark", setfontColor, "#000000"),
            getStateChangeEntry("Bright", setfontColor, "#DFDFDF"),
          ],
        },
      ],
    },
    {
      component: (
        <>
          Github{" "}
          <img
            style={{ height: "1.8rem", borderRadius: "50%" }}
            src="/github.png"
          />
        </>
      ),
      onClick: () => window.open("https://github.com/Heaust-ops/", "_blank"),
    },
    {
      component: (
        <>
          My Blog{" "}
          <img
            style={{ height: "1.8rem", borderRadius: "50%" }}
            src="/logo.png"
          />
        </>
      ),
      onClick: () => window.open("https://blog.heaust.org/", "_blank"),
    },
  ];

  const menus = {
    hotkeys: {
      shifta: new_ctx_menu,
    },
    contextMenu: new_ctx_menu,
  };
  return (
    <ContextMenuWrapperDiv
      className="App"
      style={{
        backgroundColor: backgorund,
        textAlign: "center",
        overflowY: "scroll",
        fontFamily,
        fontSize,
        color,
      }}
      menus={menus}
    >
      <h1>React Context Menu</h1>
      <h2>
        <span
          className={`${backgorund !== "#CEAC97" ? "bg-gray" : "bg-gray-dark"}`}
        >
          Right-Click
        </span>{" "}
        or press{" "}
        <span
          className={`${backgorund !== "#CEAC97" ? "bg-gray" : "bg-gray-dark"}`}
        >
          shift + a
        </span>{" "}
        to try out!
      </h2>
      <div style={{ textAlign: "left", padding: "1rem" }}>
        <h2>Install the package:</h2>
        <Importer pkg={true} />
      </div>
      <div style={{ textAlign: "left", padding: "1rem" }}>
        <h2>
          <h2>How to use, the easy way:</h2>
        </h2>
        <h2>Step 1: Making a Menu</h2>
        <ul>
          <li>
            {" "}
            <h2 style={{ fontWeight: "normal" }}>
              A menu is an array of small menu entries.
            </h2>
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              A menu entry looks like this,
            </h2>
            <Importer content={'{ text: "Label for the entry" }'} />
          </li>
          <br />

          <li>
            {" "}
            <h2 style={{ fontWeight: "normal" }}>
              You can choose to do something, when it's clicked
            </h2>
            <Importer
              content={`{
          text: "Label1",
          onClick: () => console.log('Label1 was Clicked')
        }`}
            />
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              Like this you can make a simple menu,
            </h2>
            <div>
              <h2 style={{ fontWeight: "normal" }}>{`[ {
          text: "Label1",
          onClick: () => console.log('Label1 was Clicked')
        },`}</h2>
              <h2 style={{ fontWeight: "normal" }}>{`{
          text: "Label2",
          onClick: () => console.log('Label2 was Clicked')
        } ]`}</h2>
            </div>
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              A menu item can also have it's own submenu,
            </h2>
            <Importer
              content={
                '{ text: "Label for the entry", sub: [...another menu...] }'
              }
            />
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              Instead of plaintext you can also use a react component
            </h2>
            <Importer
              content={
                '{ component: <>Github <img src="https://github.com/Heaust-ops" /></> }'
              }
            />
          </li>
          <br />
        </ul>

        <br />
        <h2>Step 2: Using the premade wrapper</h2>
        <ul>
          <li>
            <h2 style={{ fontWeight: "normal" }}>
              Import the wrapper div, this defines the region for context menu
              action
            </h2>
            <Importer content='import ContextMenuWrapperDiv from "./ContextMenu/ContextMenuWrapperDiv";' />
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>Make a menu collection,</h2>
            <Importer content="menuCollection = { hotkeys: { shifta: someMenu }, contextMenu: someOtherMenu }" />
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              Use the wrapper div and pass it the menu collection
            </h2>
            <Importer content="<ContextMenuWrapperDiv menus={menuCollection}> {...content...} </ContextMenuWrapperDiv>" />
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              It behaves like a normal div and you can use all of a normal div's
              props
            </h2>
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              Moreover it takes in 2 additional props, itemStyle and
              wrapperStyle
            </h2>
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              itemStyle can be used to style the items in the context menu
            </h2>
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              wrapperStyle can be used to style the wrapper of the context menu
              itself
            </h2>
          </li>
          <br />
        </ul>

        <h2>
          <h2>How to use, for powerusers:</h2>
        </h2>
        <ul>
          <li>
            <h2 style={{ fontWeight: "normal" }}>
              Import the ContextMenu Component
            </h2>
            <Importer content='import ContextMenu from "./ContextMenu/ContextMenu";' />
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              Unlike the wrapper div this takes in a single menu,
            </h2>
            <Importer content="<ContextMenu contextMenuItems={someMenu} >" />
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              This component is just the menu with no activation logic
            </h2>
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              You have to implement the logic of when and where to render it yourself
            </h2>
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              It still has itemStyle and wrapperStyle for the same reasons
            </h2>
          </li>
          <br />

          <li>
            <h2 style={{ fontWeight: "normal" }}>
              Tip: You can use wrapperStyle to position it
            </h2>
          </li>
          <br />
        </ul>
      </div>
    </ContextMenuWrapperDiv>
  );
}

export default App;
