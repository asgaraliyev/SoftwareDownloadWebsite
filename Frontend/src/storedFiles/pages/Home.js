import "antd/dist/antd.css";
import { List, Card } from "antd";
import React, { useState, Component, useEffect, updateState } from "react";
import axios from "axios";
import { Menu, Breadcrumb, Alert, Popconfirm, message } from "antd";
import { HomeOutlined, UserOutlined, DeleteOutlined } from "@ant-design/icons";
import NewCata from "../Components/NewCata";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "mail",
      breadcrumbList: [],
      parent: null,
    };
    this.catagoryFilter = this.catagoryFilter.bind(this);
    this.catagoryClicked = this.catagoryClicked.bind(this);
  }

  catagoryClicked = (item) => {
    if (item.name) {
      this.setState({
        ...this.state,
        parent: item.name,
      });
      this.catagoryFilter();

      this.forceUpdate();
    }
  };
  catagoryFilter = () => {
    axios
      .get("http://localhost:999/catagories", {
        method: "GET",
        headers: {
          "access-control-allow-origin": "*",
          "Content-type": "application/json; charset=UTF-8",
        },
      })
      .then(async (response) => {
        const result = await response.data;
        if (!result.error) {
          var originalCatagories = [];

          const catagories = result.data;
          catagories.map((cat) => {
            if (this.state.parent === null) {
              if (cat.parent === "root") {
                this.setState({ ...this.state, breadcrumbList: cat.tree });
                originalCatagories.push(cat);
              }
            } else {
              if (cat.name === this.state.parent) {
                this.setState({ ...this.state, breadcrumbList: cat.tree });
              }
              if (cat.parent === this.state.parent) {
                originalCatagories.push(cat);
              }
            }
          });
          this.setState(
            (this.state = {
              // allCat: catagories,
              theData: originalCatagories,
            })
          );
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };
  componentDidMount() {
    this.catagoryFilter();
  }
  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  render() {
    const { current, breadcrumbList } = this.state;
    const deleteCata = async (_id) => {
      const res = await axios.delete("http://localhost:999/catagories", {
        params: {
          _id,
        },
      });
      if (res.data.data.deletedCount === 1) {
        message.info("Kataqoriya uğurla silindi");
      } else {
        message.error("Kataqoriyanın silinməsində problem yaşandı.");
      }
      this.catagoryFilter();
    };
    return (
      <div className="catagories">
        <NewCata></NewCata>

        <Breadcrumb>
          {breadcrumbList.map((breadcrumb) => {
            if (breadcrumb === "root") {
              return (
                <Breadcrumb.Item
                  key={breadcrumb}
                  onClick={() => {
                    this.catagoryClicked({ name: breadcrumb });
                  }}
                >
                  <HomeOutlined />
                </Breadcrumb.Item>
              );
            } else {
              return (
                <Breadcrumb.Item
                  key={breadcrumb}
                  onClick={() => {
                    this.catagoryClicked({ name: breadcrumb });
                  }}
                >
                  <span>{breadcrumb}</span>
                </Breadcrumb.Item>
              );
            }
          })}
          <Breadcrumb.Item>{this.state.parent}</Breadcrumb.Item>
        </Breadcrumb>
        <br></br>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 3,
          }}
          dataSource={this.state.theData}
          renderItem={(item) => (
            <List.Item key={item._id}>
              <Popconfirm
                title="Bu katoqoriyanı silməkdə əminsən?"
                onConfirm={() => {
                  deleteCata(item._id);
                }}
                okText="Bəli"
                cancelText="Ləğv et"
              >
                <DeleteOutlined
                  style={{ color: "red", fontSize: 20, cursor: "pointer" }}
                />
              </Popconfirm>
              

              <Card
                style={{ cursor: "pointer" }}
                key={item._id}
                title={item.name}
                onClick={() => {
                  this.catagoryClicked(item);
                }}
              >
                <h5>Parent:{item.parent}</h5>
                <p>
                  <Breadcrumb>
                    {item.tree.map((child) => {
                      if (child === "root") {
                        return (
                          <Breadcrumb.Item key={child}>
                            <HomeOutlined />
                          </Breadcrumb.Item>
                        );
                      } else {
                        return (
                          <Breadcrumb.Item key={child}>
                            <span>{child}</span>
                          </Breadcrumb.Item>
                        );
                      }
                    })}
                    <Breadcrumb.Item> {item.name}</Breadcrumb.Item>
                  </Breadcrumb>
                </p>
              </Card>
            </List.Item>
          )}
        />
        {/* <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="pre" onClick={backToThere}>
            Əvvəlki
          </Menu.Item>
          <Menu.Item key="next">Sonraki</Menu.Item>
        </Menu> */}
      </div>
    );
  }
}
