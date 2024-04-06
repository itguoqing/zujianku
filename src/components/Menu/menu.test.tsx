/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import {
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";
// jest.mock('../Icon/icon', () => {
//   return () => {
//     return <i className="fa" />
//   }
// })
// jest.mock('react-transition-group', () => {
//   return {
//     CSSTransition: (props: any) => {
//       return props.children
//     }
//   }
// })
const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};
const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
  defaultOpenSubMenus: ["4"],
};
const generateMenu = (props: MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title="dropdown">
        <MenuItem>drop1</MenuItem>
      </SubMenu>
      <SubMenu title="opened">
        <MenuItem>opened1</MenuItem>
      </SubMenu>
    </Menu>
  );
};
const createStyleFile = () => {
  const cssFile: string = `
    .viking-submenu {
      display: none;
    }
    .viking-submenu.menu-opened {
      display:block;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  style.innerHTML = cssFile;
  return style;
};
let wrapper: RenderResult,
  wrapper2: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;
describe("test Menu and MenuItem component in default(horizontal) mode", () => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
  });
  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("viking-menu test");
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("click items should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem);
    expect(thirdItem).toHaveClass("is-active");
    expect(activeElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith("2");
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should show dropdown items when hover on subMenu", async () => {
    expect(wrapper.queryByText("drop1")).not.toBeVisible();
    const dropdownElement = wrapper.getByText("dropdown");
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("drop1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).not.toBeVisible();
    });
  });
});
describe("test Menu and MenuItem component in vertical mode", () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps));
    wrapper2.container.append(createStyleFile());
  });
  it("should render vertical mode when mode is set to vertical", () => {
    const menuElement = wrapper2.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show dropdown items when click on subMenu for vertical mode", () => {
    const dropDownItem = wrapper2.queryByText("drop1");
    expect(dropDownItem).not.toBeVisible();
    fireEvent.click(wrapper2.getByText("dropdown"));
    expect(dropDownItem).toBeVisible();
  });
  it("should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index", () => {
    expect(wrapper2.queryByText("opened1")).toBeVisible();
  });
});
// /* eslint-disable testing-library/no-node-access */
// import React from "react";
// import {
//   render,
//   screen,
//   RenderResult,
//   fireEvent,
//   waitFor,
// } from "@testing-library/react";
// import Menu, { MenuProps } from "./menu";
// import MenuItem from "./menuItem";
// import SubMenu from "./subMenu";
// import { wait } from "@testing-library/user-event/dist/utils";
// const testProps: MenuProps = {
//   defaultIndex: "0",
//   onSelect: jest.fn(),
//   className: "test",
// };
// const testVerProps: MenuProps = {
//   defaultIndex: "0",
//   mode: "vertical",
//   // defaultOpenSubMenus: ["4"],
// };
// const generateMenu = (props: MenuProps) => {
//   return (
//     <Menu {...props}>
//       <MenuItem>active</MenuItem>
//       <MenuItem disabled>disabled</MenuItem>
//       <MenuItem>xyz</MenuItem>
//       {/* <li></li> */}
//       {/* <li>hello</li> */}
//       <SubMenu title="dropdown">
//         <MenuItem>drop1</MenuItem>
//       </SubMenu>
//       <SubMenu title="opened">
//         <MenuItem>opened1</MenuItem>
//       </SubMenu>
//     </Menu>
//   );
// };
// const createStyleFile = () => {
//   const cssFile: string = `
//     .viking-submenu {
//       display: none;
//     }
//     .viking-submenu.menu-opened {
//       display:block;
//     }
//   `;
//   const style = document.createElement("style");
//   style.type = "text/css";
//   style.innerHTML = cssFile;
//   return style;
// };
// let wrapper: RenderResult,
//   wrapper2: RenderResult,
//   menuElement: HTMLElement,
//   activeElement: HTMLElement,
//   // thirdItem: HTMLElement,
//   disabledElement: HTMLElement;
// describe("test Menu and MenuItem component", () => {
//   // const setup = () => render(generateMenu(testProps));
//   // setup();
//   wrapper = render(generateMenu(testProps));
//   wrapper.container.append(createStyleFile());
//   menuElement = screen.getByTestId("test-menu");
//   activeElement = screen.getByText("active");
//   disabledElement = screen.getByText("disabled");
//   const drop1 = screen.queryByText("drop1");
//   const dropdownElement = screen.getByText("dropdown");
//   // menuElement = screen.getByTestId("test-menu");
//   // activeElement = screen.getByText("active");
//   // disabledElement = screen.getByText("disabled");
//   // const thirdItem = screen.getByText("xyz");
//   beforeEach(() => {
//     //  render(generateMenu(testProps))
//     // wrapper.container.append(createStyleFile())
//   });
//   it("should render correct Menu and MenuItem based on default props", () => {
//     expect(menuElement).toBeInTheDocument();
//     // expect(thirdItem).toBeInTheDocument();
//     expect(menuElement).toHaveClass("viking-menu test");
//     expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5);
//     const listItems = screen.getAllByRole("listitem");
//     expect(listItems).toHaveLength(5);
//     expect(activeElement).toHaveClass("menu-item is-active");
//     expect(disabledElement).toHaveClass("menu-item is-disabled");
//   });
//   it("click items should change active and call the right callback", async () => {
//     // setup();
//     wrapper = render(generateMenu(testProps));
//     // eslint-disable-next-line testing-library/prefer-screen-queries
//     const thirdItem = wrapper.getByText("xyz");
//     fireEvent.click(thirdItem);
//     activeElement = screen.getByText("active");
//     expect(thirdItem).toHaveClass("is-active");
//     expect(activeElement).not.toHaveClass("is-active");
//     expect(testProps.onSelect).toHaveBeenCalledWith("2");
//     fireEvent.click(disabledElement);
//     expect(disabledElement).not.toHaveClass("is-active");
//     expect(testProps.onSelect).not.toHaveBeenCalledWith("1"); //用于断言 onSelect 是否被调用，并且传递了期望的参数
//   });
//   it("should show dropdown items when hover on subMenu", async () => {
//     expect(drop1).not.toBeVisible();
//     fireEvent.mouseEnter(dropdownElement);
//     await wait(() => {
//       expect(screen.queryByText("drop1")).toBeVisible();
//     });
//     fireEvent.click(screen.getByText('drop1'))
//     // expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
//     // fireEvent.mouseLeave(dropdownElement)
//     // await waitFor(() => {
//     //   expect(wrapper.queryByText('drop1')).not.toBeVisible()
//     // })
//   });
// });
// describe("test Menu and MenuItem component in vertical mode", () => {
//   it("should render vertical mode when mode is set to vertical", () => {
//     render(generateMenu(testVerProps));
//     const menuElement = screen.getByTestId("test-menu");
//     expect(menuElement).toHaveClass("menu-vertical");
//   });
//   // it('should show dropdown items when click on subMenu for vertical mode', () => {
//   //   const dropDownItem = wrapper2.queryByText('drop1')
//   //   expect(dropDownItem).not.toBeVisible()
//   //   fireEvent.click(wrapper2.getByText('dropdown'))
//   //   expect(dropDownItem).toBeVisible()
//   // })
//   // it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
//   //   expect(wrapper2.queryByText('opened1')).toBeVisible()
//   // })
// });
