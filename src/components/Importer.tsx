import { FC, useEffect, useState } from "react";

interface ImporterProps {
  pkg?: boolean;
  content?: string;
}

const Importer: FC<ImporterProps> = ({ pkg = false, content }) => {
  const [helperText, sethelperText] = useState(
    content ?? "npm i react-context-menu"
  );
  const [copied, setcopied] = useState(false);
  const yarnHelperText = "yarn add react-context-menu";
  const npmHelperText = "npm i react-context-menu";

  useEffect(() => {
    let to: number;
    if (copied) to = setTimeout(() => setcopied(false), 1500);
    return () => clearTimeout(to);
  }, [copied]);

  const copy = () => {
    navigator.clipboard.writeText(helperText);
    setcopied(true);
  };

  const insideDivStyle = {
    backdropFilter: "brightness(0.9)",
    padding: "0.6rem",
    fontSize: "1.2em",
    border: "2px solid white",
    borderRadius: "0.2em",
    cursor: "pointer",
    borderLeft: "none",
    marginRight: "1rem",
  };

  return (
    <div style={{ display: "flex" }}>
      <div onClick={copy} style={insideDivStyle}>
        {copied ? "‌  ‌  ‌~‌  ‌  ‌  ‌Copied !‌  ‌  ‌  ‌~‌  ‌  ‌" : helperText}
      </div>
      {pkg && (
        <>
          <div
            onClick={copy}
            onMouseEnter={() => sethelperText(yarnHelperText)}
            style={{ ...insideDivStyle }}
          >
            yarn
          </div>
          <div
            onClick={copy}
            onMouseEnter={() => sethelperText(npmHelperText)}
            style={{ ...insideDivStyle }}
          >
            npm
          </div>
        </>
      )}
    </div>
  );
};

export default Importer;
