import React, {
  FC,
  useContext,
  useState,
  FunctionComponentElement,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon";
import Transition from "../Transition";
// import Icon from '../Icon/icon'
// import Transition from '../Transition/transition'
export interface SubMenuProps {
  // index?: number;
  index?: string;
  /**下拉菜单选项的文字 */
  title: string;
  /**下拉菜单选型的扩展类名 */
  className?: string;
  children?: ReactNode;
}

export const SubMenu: FC<SubMenuProps> = ({
  index,
  title,
  children,
  className,
}) => {
  const context = useContext(MenuContext);
  const submenuRef = useRef<HTMLUListElement>(null);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpend =
    index && context.mode === "vertical"
      ? openedSubMenus.includes(index)
      : false;
  // const isOpend = false;
  const [menuOpen, setOpen] = useState(isOpend);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });
  // useEffect(() => {
  //   if (submenuRef.current) {
  //     const submenuheight = submenuRef.current.scrollHeight;
  //     console.log("submenu height:", submenuheight);
  //   }
  // });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!menuOpen);
  };
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setOpen(toggle);
    }, 300);
  };
  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : {};
  const renderChildren = () => {
    const subMenuClasses = classNames("viking-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`,
        });
        // return childElement;
      } else {
        console.error(
          "Warning: SubMenu has a child which is not a MenuItem component"
        );
      }
    });
    return (
      <Transition in={menuOpen} timeout={300} animation="zoom-in-top">
        {/*  <CSSTransition
         in={menuOpen}
         timeout={3000}
         classNames="zoom-in-top"
         appear
        unmountOnExit
       > */}
        <ul className={subMenuClasses} ref={submenuRef}>
          {childrenComponent}
        </ul>
        {/*  </CSSTransition> */}
      </Transition>
    );
  };
  //{...hoverEvents}传了一个对象过去，这里相当于传了两个事件处理函数
  // onMouseEnter= (e: React.MouseEvent) => { handleMouse(e, true)}  onMouseLeave= (e: React.MouseEvent) => { handleMouse(e, false)}
  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" onClick={handleClick} {...clickEvents}>
        {title}
        <Icon icon="angle-down" className="arrow-icon" />
      </div>
      {renderChildren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
