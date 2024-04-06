import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import Menu from "./menu";
import SubMenu from "./subMenu";
import Item from "./menuItem";
export default {
  title: "第六章:Menu",
  id: "Menu",
  component: Menu,
  subcomponents: { SubMenu: SubMenu, Item: Item },
} as ComponentMeta<typeof Menu>;

const Template: ComponentStory<typeof Menu> = (args) => (
  <Menu defaultIndex="0" {...args}>
    <Item>cool link</Item>
    <Item>cool link 2</Item>
    <Item disabled>disabled</Item>
    <SubMenu title="下拉选项">
      <Item>下拉选项一</Item>
      <Item>下拉选项二</Item>
    </SubMenu>
    <Item>cool link</Item>
    <Item disabled>cool link2</Item>
  </Menu>
);
export const DefaultMenu = Template.bind({});
DefaultMenu.storyName = "默认Menu";
export const ClickMenu = Template.bind({});
ClickMenu.args = {
  defaultIndex: "1",
  mode: "vertical",
};
ClickMenu.storyName = "纵向Menu";
// export const BClickMenu: ComponentStory<typeof Menu> = (args) => (
//   <Menu {...args} defaultIndex='0' mode="vertical">
//     <Menu.Item>
//       cool link
//     </Menu.Item>
//     <Menu.Item>
//       cool link 2
//     </Menu.Item>
//     <Menu.SubMenu title="点击下拉选项">
//       <Menu.Item>
//         下拉选项一
//       </Menu.Item>
//       <Menu.Item>
//         下拉选项二
//       </Menu.Item>
//     </Menu.SubMenu>
//   </Menu>
// )
// BClickMenu.storyName = '纵向的 Menu'
// export const COpenedMenu:ComponentStory<typeof Menu> = (args) => (
//   <Menu {...args} defaultIndex='0' mode="vertical" defaultOpenSubMenus={['2']}>
//     <Menu.Item>
//       cool link
//     </Menu.Item>
//     <Menu.Item>
//       cool link 2
//     </Menu.Item>
//     <Menu.SubMenu title="默认展开下拉选项">
//       <Menu.Item>
//         下拉选项一
//       </Menu.Item>
//       <Menu.Item>
//         下拉选项二
//       </Menu.Item>
//     </Menu.SubMenu>
//   </Menu>
// )
// COpenedMenu.storyName = '默认展开的纵向 Menu'
