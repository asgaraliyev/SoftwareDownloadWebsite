import {
  Upload,
  Button,
  Form,
  Input,
  Select,
  message,
  TreeSelect,
  Popconfirm,
} from "antd";
import { useState, useEffect } from "react";
import {
  CloseSquareTwoTone,
  FolderOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Image } from "cloudinary-react";
import axios from "axios";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { convertToHTML } from "draft-convert";
const { Dragger } = Upload;
const { TextArea } = Input;
const { SHOW_PARENT } = TreeSelect;
export default function NewPost() {
  const [newPostArea, setNewPostArea] = useState(false);
  const [catagories, setCatagories] = useState([]);
  const [downloaded, setDownloaded] = useState(false);
  const [image, setImage] = useState(null);
  useEffect(() => {
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
          setCatagories(result.data);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  }, []);
  const props = {
    name: "file",
    multiple: false,
    action:
      "https://res.cloudinary.com/drbir95bf/image/upload/v1606483031/sample.jpg",
    async onChange(info) {
      const { status } = info.file;
      if (status === "error") {
        if (!downloaded) {
          var formData = new FormData();
          formData.append("file", info.file.originFileObj);
          formData.append("upload_preset", "ml_default");
          const res = await fetch(
            "https://api.cloudinary.com/v1_1/drbir95bf/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const result = await res.json();
          if (result.error) {
            message.error("Fayl yükklənmədi ERROR" + result.error);
          } else {
            setImage(result);
            setDownloaded(true);
            console.log(result, "result");
            message.success("Fayl uğurla yükləndi :)");
          }
        }
      }
    },
  };

  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState([]);
  const changeTheKeywords = (value) => {
    setKeywords(value);
  };
  const saveNewKeyword = () => {
    const newKeywords = keywords;
    if (newKeyword) {
      newKeywords.push({
        title: newKeyword,
        value: newKeyword,
        key: newKeyword,
      });
      setNewKeyword("");

      setKeywords(newKeywords);
    }
  };
  const tProps = {
    treeData: [],
    value: keywords,
    onChange: changeTheKeywords,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    style: {
      width: "100%",
    },
  };

  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  const saveThisPost = async (value) => {
    console.log(editorState);
    if (image) {
      var params = {
        name: value.name,
        photo: image,
        programVersion: value.version,
        catagory: value.catagory,
        keywords: keywords,
        description: value.description,
        operatingSystem: value.operatingSystem,
        downloadLink: value.downloadLink,
        content: convertToHTML(editorState.getCurrentContent()),
      };
      console.log(
        "🚀 ~ file: NewPost.js ~ line 130 ~ saveThisPost ~ params",
        params
      );

      const result = await axios.post("http://localhost:999/posts", {
        data: params,
      });
      if (result.data.error) {
        message.error(result.data.error);
      }
      if (result.data.errorDetails) {
        message.error(result.data.errorDetails);
      }
      if (result.data.data) {
        setNewPostArea(false);
        message.success("Post uğurlu şəkildə yaradıldı");
        setTimeout(function () {
          window.location.href = "/";
        }, 1000);
      }
    } else {
      message.error("Şəkil əlavə etmədiniz. Zəhmət olmasa şəkil əlavə edin");
    }
  };
  return (
    <div>
      <Button
        type="danger"
        onClick={() => {
          setNewPostArea(!newPostArea);
        }}
      >
        Yeni Post yarat
      </Button>
      {newPostArea && (
        <div id="new-post" style={{ padding: "2em", boxSizing: "border-box" }}>
          <CloseSquareTwoTone
            onClick={() => {
              setNewPostArea(!newPostArea);
            }}
            twoToneColor="red"
            style={{
              fontSize: 44,
            }}
          />
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={(value) => {
              saveThisPost(value);
            }}
            onFinishFailed={null}
          >
            <Form.Item
              label="Post-un adı"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Zəhmət olmasa postun adını daxil edin",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Dragger {...props}>
                {downloaded ? (
                  <>
                    <CloseSquareTwoTone
                      onClick={() => {
                        setImage(null);
                        setDownloaded(!downloaded);
                      }}
                      twoToneColor="red"
                      style={{
                        fontSize: 44,
                      }}
                    />
                    <Image
                      cloudName="drbir95bf"
                      publicId={image.public_id}
                      height="300"
                      crop="scale"
                    />
                  </>
                ) : (
                  <>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Proqramın şəklini yüklə və ya bura sürüklə at
                    </p>
                  </>
                )}
              </Dragger>
            </Form.Item>
            <Form.Item label="Versiya-------" name="version">
              <Input />
            </Form.Item>
            <Form.Item
              label="Yükləmə linki"
              name="downloadLink"
              rules={[
                {
                  required: true,
                  message: "Zəhmət olmasa yükləmə linkini daxil edin",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Əməliyyat Sistemi" name="operatingSystem">
              <Select>
                <Select.Option value="Windows" key="Windows"></Select.Option>
                <Select.Option value="Android" key="Android"></Select.Option>
                <Select.Option value="Mac" key="Mac"></Select.Option>
                <Select.Option value="Iphone" key="Iphone"></Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Kataqoriya"
              name="catagory"
              rules={[
                {
                  required: true,
                  message: "Zəhmət olmasa kataqoriyanı daxil edin",
                },
              ]}
            >
              <Select>
                {catagories.map((category) => {
                  return (
                    <Select.Option value={category.name} key={category._id}>
                      <FolderOutlined style={{ color: "red", fontSize: 20 }} />
                      {category.name}
                      <br></br>
                      {category.tree.map((cat) => {
                        return <span>{cat}/</span>;
                      })}
                      <span>{category.name}</span>
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            <Form.Item name="keywords">
              <h3>Açar sözlər</h3>
              <TreeSelect {...tProps} />
              <br></br>
              <br></br>
              <Input
                onChange={(e) => {
                  setNewKeyword(e.target.value);
                }}
                value={newKeyword}
                placeholder="Yeni bir açar söz daxil edin"
                style={{ width: "50%", marginRight: "1em" }}
              />
              <Button
                type="primary"
                onClick={() => {
                  saveNewKeyword();
                }}
              >
                Yadda saxla
              </Button>
            </Form.Item>

            <Form.Item
              label="Post açığlaması"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Zəhmət olmasa post açığlamasını daxil edin",
                },
              ]}
            >
              <TextArea showCount maxLength={100} minLength={10} />
            </Form.Item>

            <Editor
              initialEditorState={editorState}
              wrapperClassName="demo-wrapper"
              editorClassName="demo-editor"
              onEditorStateChange={onEditorStateChange}
            />
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Bu post-u yaddaşda saxla
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}
