import React, { useState, useEffect } from "react";
import axios from "axios";
import Button, { ButtonSize, ButtonType } from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Icon from "./components/Icon";
import Transition from "./components/Transition";
library.add(fas);
function App() {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const uploadedFile = files[0];
      const formData = new FormData();
      formData.append(uploadedFile.name, uploadedFile);
      axios
        .post("https://jsonplaceholder.typicode.com/posts", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((resp) => {
          console.log(resp);
        });
    }
  };
  // const [show, setShow] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <input type="file" name="myfile" onChange={handleFileChange} />
        {/* <FontAwesomeIcon icon={faCoffee} size="lg"></FontAwesomeIcon> */}
        {/* <Icon icon="coffee" theme="danger" size="1x" />
        <Menu
          defaultIndex="0"
          onSelect={(index) => {
            alert(index);
          }}
          mode="vertical"
          defaultOpenSubMenus={["2"]}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem disabled>cool link2</MenuItem>
          <SubMenu title="dropdown">
            <MenuItem>dropdown1</MenuItem>
            <MenuItem>dropdown2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>
        <Button className="custom">Hello</Button>
        <Button disabled>Hello</Button>
        <Button btnType="primary" size="lg">
          Hello
        </Button>
        <Button btnType="danger" size="sm">
          Hello
        </Button>
        <Button btnType="link" href="http://www.baidu.com" target="_blank">
          Baidu Link
        </Button>
        <Button btnType="link" href="http://www.baidu.com" disabled>
          Baidu Link
        </Button>
        <Button
          size="lg"
          onClick={() => {
            setShow(!show);
          }}
        >
          Toggle
        </Button>
        <Transition in={show} timeout={300} animation="zoom-in-left">
          <div>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation="zoom-in-left" wrapper>
          <Button btnType="primary" size="lg">
            A large button
          </Button>
        </Transition> */}
      </header>
    </div>
  );
}

export default App;
