import "antd/dist/antd.css";
import {
  List,
  Avatar,
  Skeleton,
  message,
  Popconfirm,
  Popover,
  Tag,
} from "antd";
import React, { Component } from "react";
import { HomeOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import axios from "axios";
import NewPost from "../Components/NewPost";
import EditPost from "../Components/EditPost";
class LoadMoreList extends Component {
  state = {
    loading: true,
    editPost: false,
    id: null,
    theList: [],
  };
  getData = async () => {
    await axios.get("http://localhost:999/posts").then((response) => {
      if (!response.data.error) {
        console.log(response.data.data);
        this.setState({
          ...this.state,
          theList: response.data.data,
          loading: false,
        });
      } else {
        message.error(response.data.error);
      }
    });
  };
  componentDidMount() {
    this.getData();
  }

  render() {
    const deleteThisPost = async (postId) => {
      await axios
        .delete("http://localhost:999/posts", {
          params: {
            _id: postId,
          },
        })
        .then((response) => {
          if (response.data.data.deletedCount === 1) {
            message.info("Silindi");
            this.getData();
          } else {
            message.error("alinmadi");
          }
        });
    };
    const { loading, theList } = this.state;

    return (
      <div id="posts">
        <NewPost></NewPost>
        {this.state.id && <EditPost id={this.state.id}></EditPost>}
        <List
          className="demo-loadmore-list"
          loading={this.state.loading}
          itemLayout="horizontal"
          loadMore={true}
          dataSource={theList}
          renderItem={(item) => (
            <List.Item
              actions={[
                <a key="list-loadmore-edit">
                  <Popconfirm
                    title="Bu postu redakte etmək istəyirsiz?"
                    onConfirm={() => {
                      this.setState({
                        ...this.state,
                        id: item._id,
                        editPost: true,
                      });
                    }}
                    okText="Bəli"
                    cancelText="Ləğv et"
                  >
                    <EditTwoTone
                      twoToneColor="green"
                      style={{ fontSize: 20, cursor: "pointer" }}
                    />
                  </Popconfirm>
                </a>,
                <a key="list-loadmore-more">
                  <Popconfirm
                    title="Bu postu silməkdə əminsən?"
                    onConfirm={() => {
                      deleteThisPost(item._id);
                    }}
                    okText="Bəli"
                    cancelText="Ləğv et"
                  >
                    <DeleteTwoTone
                      twoToneColor="red"
                      style={{ fontSize: 20, cursor: "pointer" }}
                    />
                  </Popconfirm>
                </a>,
              ]}
            >
              <Skeleton title={false} loading={!item.description} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.photo.url} alt={item.name} />}
                  title={
                    <Popover
                      placement="bottom"
                      content={() => {
                        return (
                          <List>
                            <li>
                              <strong>Açar sözlər:</strong>
                              {item.keywords.map((keyword) => {
                                return <Tag>{keyword.value}</Tag>;
                              })}
                            </li>
                            <li>
                              <strong>Açığlama:</strong>
                              {item.description}
                            </li>
                            <li>
                              <strong>Versiya:</strong>
                              {item.programVersion}
                            </li>
                            <li>
                              <strong>Kataqoriya:</strong>
                              {item.catagory}
                            </li>
                            <li>
                              <strong>Əməliyyat sistemi:</strong>
                              {item.operatingSystem}
                            </li>
                            <li>
                              <strong>Yükləmə Linki:</strong>
                              <a href={item.downloadLink}>
                                {item.downloadLink}
                              </a>
                            </li>
                          </List>
                        );
                      }}
                    >
                      <a>{item.name}</a>
                    </Popover>
                  }
                  description={item.description}
                />
                <div>{item.date}</div>
              </Skeleton>
            </List.Item>
          )}
        />
      </div>
    );
  }
}
export default LoadMoreList;
