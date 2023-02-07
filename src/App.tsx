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
        <h2><h2>How to use, the easy way:</h2></h2>
        <h2>Import the Wrapper Div,</h2>
        <Importer content='import ContextMenuWrapperDiv from "./ContextMenu/ContextMenuWrapperDiv";' />
      </div>
    </ContextMenuWrapperDiv>
  );
}

export default App;
