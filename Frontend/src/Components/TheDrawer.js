import { Link } from "react-router-dom";

import React from "react";
import { Drawer, Button, List } from "antd";
import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
export default function TheDrawer() {
  const [theDrawer, setTheDrawer] = useState(false);
  const [menuList, setMenuList] = useState(["posts", "catagories", "gallery"]);
  return (
    <>
      <Button
        onClick={() => {
          setTheDrawer(!theDrawer);
        }}
        id="drawer-btn"
      >
        <MenuOutlined />
      </Button>
      <Drawer
        height="100%"
        title={
          <>
            <br></br>
            <br></br>
            <h1>Dashboard</h1>
          </>
        }
        placement="bottom"
        onClose={() => {
          setTheDrawer(!theDrawer);
        }}
        visible={theDrawer}
      >
        <List
          size="large"
          bordered
          dataSource={menuList}
          renderItem={(item) => (
            <List.Item>
              <Link
                to={`/${item}`}
                onClick={() => {
                  setTheDrawer(!theDrawer);
                }}
                style={{ textTransform: "capitalize" }}
              >
                <h1>{item}</h1>
              </Link>
              <br></br>
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
}
