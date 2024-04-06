import React, { FC } from "react";
import classNames from "classnames";
// export enum ButtonSize {
//   Large = "lg",
//   Small = "sm",
// }

// export enum ButtonType {
//   Primary = "primary",
//   Default = "default",
//   Danger = "danger",
//   Link = "link",
// }
export type ButtonSize = "lg" | "sm";
export type ButtonType = "primary" | "default" | "danger" | "link";
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  /**
   * How large should the button be?
   */
  size?: ButtonSize;
  btnType?: ButtonType;
  /**
   * Button contents
   */
  children: React.ReactNode;
  href?: string;
}
// export type BaseButtonProps2 = BaseButtonProps;
type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AuchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;
export type ButtonProps = Partial<NativeButtonProps & AuchorButtonProps>;
/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ```javascript
 * import { Button } from 'vikingship'
 * ```
 */

export const Button: FC<ButtonProps> = (props) => {
  const {
    btnType = "default",
    className,
    disabled = false,
    size,
    children,
    href,
    ...restProps
  } = props;
  //btn,btn-lg,btn-primary btn是基础类名，也就是这个css的通用样式
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === "link" && disabled,
  });
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};
Button.defaultProps = {
  disabled: false,
  btnType: "default" as ButtonType,
};
export default Button;
