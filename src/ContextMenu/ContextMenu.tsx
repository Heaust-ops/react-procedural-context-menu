import {
  CSSProperties,
  Fragment,
  FunctionComponent,
  useRef,
  useState,
} from "react";
import styles from "./ContextMenu.module.css";

export interface ContextMenuItem {
  type?: string;
  sub?: ContextMenuItem[] | null;
  onClick?: (arg?: ContextMenuItem) => void;
  text?: string;
  component?: JSX.Element;
}

export interface ContextMenuProps {
  contextMenuItems: ContextMenuItem[];
  itemStyle?: CSSProperties;
  wrapperStyle?: CSSProperties;
}

const ContextMenu: FunctionComponent<ContextMenuProps> = ({
  contextMenuItems,
  itemStyle,
  wrapperStyle,
}) => {
  const [submenu, setsubmenu] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={`${styles.wrapper} unselectable`}
      style={wrapperStyle ? { ...wrapperStyle } : {}}
    >
      {contextMenuItems.map(
        (item, index) =>
          ({
            /** Text Node */
            text: (
              <Fragment key={index}>
                <div
                  className={`${styles.item}`}
                  style={itemStyle ? { ...itemStyle } : {}}
                  onClick={() => {
                    if (item.onClick) item.onClick(item);
                    if (submenu !== index) setsubmenu(index);
                    else setsubmenu(-1);
                  }}
                >
                  {item.component ?? item.text}
                  {item.sub && (
                    <>
                      <div style={{ width: "0.5rem", height: "0" }} />
                      <svg
                        style={{
                          width: "2rem",
                          height: "2rem",
                          transition: "0.5s",
                          transform: `rotate(${
                            submenu === index ? 180 : 0
                          }deg)`,
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path fill="#777" color="#999" d="M10 17l5-5-5-5v10z" />
                      </svg>
                    </>
                  )}
                </div>

                {item.sub && submenu === index && (
                  <ContextMenu
                    wrapperStyle={{
                      ...wrapperStyle,
                      ...{
                        top: 0,
                        left: ref.current ? ref.current.offsetWidth : 0,
                        position: "absolute",
                      },
                    }}
                    itemStyle={itemStyle}
                    contextMenuItems={item.sub}
                  />
                )}
              </Fragment>
            ),
          }[item.type ?? "text"])
      )}
    </div>
  );
};

export default ContextMenu;
