import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;
export interface MenuProps {
  // defaultIndex?: number; //高亮
  defaultIndex?: string; //高亮
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  onSelect?: SelectCallback;
  /**设置子菜单的默认打开 只在纵向模式下生效 */
  defaultOpenSubMenus?: string[];
}
interface IMenuContext {
  // index: number;
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}
export const MenuContext = createContext<IMenuContext>({ index: "0" });
const Menu: React.FC<MenuProps> = (props) => {
  const {
    className,
    mode,
    style,
    children,
    defaultIndex,
    onSelect,
    defaultOpenSubMenus,
  } = props;
  const [currentActive, setActive] = useState(defaultIndex);
  const classes = classNames("viking-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });
  const handleClick = (index: string) => {
    setActive(index);
    if (onSelect) {
      onSelect(index);
    }
  };
  const passedContext: IMenuContext = {
    index: currentActive ? currentActive : "0",
    onSelect: handleClick,
    mode: mode, //名字一样可以省略写mode，
    defaultOpenSubMenus,
  };
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement =
        child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || "SubMenu") {
        // return child
        return React.cloneElement(childElement, {
          // index, //这样的好处就是子组件MenuItem不需要自己传一个index的属性了
          index: index.toString(), //这样的好处就是子组件MenuItem不需要自己传一个index的属性了
        });
      } else {
        console.error(
          "Warning:Menu has a child which is not a MenuItem component"
        );
      }
    });
  };
  return (
    <ul className={classes} style={style} data-testid="test-menu">
      <MenuContext.Provider value={passedContext}>
        {/* {children}改成下面这个方法调用 */}
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  );
};
Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};
export default Menu;
