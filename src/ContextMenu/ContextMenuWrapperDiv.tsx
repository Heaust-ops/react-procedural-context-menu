import {
  CSSProperties,
  FunctionComponent,
  HTMLAttributes,
  ReactNode,
  useEffect,
  useState,
} from "react";
import ContextMenu, { ContextMenuItem } from "./ContextMenu";

export interface ContextMenuPropsWithBindings {
  hotkeys?: { [key: string]: ContextMenuItem[] } | null;
  contextMenu?: ContextMenuItem[] | null;
}
interface ContextMenuWrapperDivProps extends HTMLAttributes<HTMLDivElement> {
  itemStyle?: CSSProperties;
  wrapperStyle?: CSSProperties;
  children?: ReactNode;
  menus: ContextMenuPropsWithBindings;
}

const ContextMenuWrapperDiv: FunctionComponent<ContextMenuWrapperDivProps> = ({
  menus,
  itemStyle,
  wrapperStyle,
  ...props
}) => {
  const [menux, setmenux] = useState(-1);
  const [menuy, setmenuy] = useState(-1);
  const [showContextMenu, setshowContextMenu] = useState(false);
  const [displayedMenu, setdisplayedMenu] = useState([] as ContextMenuItem[]);

  /**
   * Handle the Key Stack
   */
  const [keyStack, setkeyStack] = useState([] as KeyboardEvent["key"][]);
  useEffect(() => {
    /**
     * Add keys to the Key Stack
     * @param ev Key Down Event
     */
    const onKeyDown = (ev: KeyboardEvent) => {
      const targetKey = ev.key.toLowerCase();

      /**
       * If the key is just pressed,
       * It shouldn't already be anywhere in the stack.
       * Ensure that.
       */
      if (keyStack.indexOf(targetKey) >= 0)
        setkeyStack(keyStack.filter((el) => el !== targetKey));

      /**
       * Push the Key to the Stack
       */
      if (!keyStack.includes(targetKey)) setkeyStack([...keyStack, targetKey]);
    };

    /**
     * Release Keys from the Stack
     * @param ev Key Up Event
     */
    const onKeyUp = (ev: KeyboardEvent) => {
      const targetKey = ev.key.toLowerCase();

      if (keyStack.indexOf(targetKey) >= 0)
        setkeyStack(keyStack.filter((el) => el !== targetKey));
    };

    /** Implement Key Stack Handlers */
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    return () => {
      // Cleanup
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("keyup", onKeyUp);
    };
  }, [keyStack]);

  /**
   * Track Mouse Position
   */
  const [mousePosition, setMousePosition] = useState({ x: -1, y: -1 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const showAddContextMenu = (
    x: number,
    y: number,
    menu: ContextMenuItem[]
  ) => {
    setdisplayedMenu(menu);
    setmenux(x);
    setmenuy(y);
    setshowContextMenu(true);
  };

  useEffect(() => {
    if (menus.hotkeys) {
      Object.keys(menus.hotkeys).forEach((el) => {
        // Show menu on the combination
        if (keyStack.join("").toLowerCase() === el)
          showAddContextMenu(
            mousePosition.x,
            mousePosition.y,
            menus.hotkeys![el]
          );
      });
    }
  }, [keyStack, menus.hotkeys]);

  return (
    <>
      {/* Context Menu */}
      {showContextMenu && (
        <ContextMenu
          wrapperStyle={{
            ...{ zIndex: 2 },
            ...(wrapperStyle ?? {}),
            ...{ top: menuy, left: menux },
          }}
          itemStyle={itemStyle ?? {}}
          contextMenuItems={displayedMenu}
        />
      )}

      {/* Actual Div */}
      <div
        {...props}
        onClick={(ev) => {
          if (props.onClick) props.onClick(ev);
          setshowContextMenu(false);
          setdisplayedMenu([]);
        }}
        onContextMenu={(ev) => {
          ev.preventDefault();

          if (menus.contextMenu) {
            showAddContextMenu(
              mousePosition.x,
              mousePosition.y,
              menus.contextMenu
            );
          }

          if (props.onContextMenu) props.onContextMenu(ev);
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default ContextMenuWrapperDiv;
