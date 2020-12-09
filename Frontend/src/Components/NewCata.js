import { Button } from "antd";
import { useState, useEffect } from "react";
import { CloseSquareTwoTone, FolderOutlined } from "@ant-design/icons";
import { Form, Input, Select, Checkbox, Alert, message } from "antd";
import axios from "axios";

export default function NewCata() {
  const [open, setOpen] = useState(false);
  const [catagories, setCatagories] = useState([]);

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
  const onFinish = async (values) => {
    message.info("🚀 ~ file: NewCata.js ~ line 65 ~ onFinish ~ values", values);
    const the_Parent = await axios
      .request({
        method: "GET",
        url: `http://localhost:999/catagory`,
        params: {
          name: values.parent,
        },
      })
      .then((response) => {
        if (!response.data.error) {
          return response.data.data;
        } else {
          message.error("Problem yasandi");
        }
      })
      .catch((error) => {
        message.error("Problem yasandi");
      });
    if (the_Parent) {
      const newCatagoryTree = [...the_Parent.tree];
      newCatagoryTree.push(the_Parent.name);
      axios
        .post("http://localhost:999/catagories", {
          name: values.category,
          parent: values.parent,
          tree: newCatagoryTree,
        })
        .then(function (response) {
          if (!response.data.error) {
            window.location.href = "/";
            message.info("Yeni kataqoriya uğurla yaradıldı");
          } else {
            message.error([response.data.error, response.data.errorDetails]);
          }
        })
        .catch(function (error) {
          message.error(error);
        });
    }
  };
  return (
    <div>
      <Button
        danger
        onClick={() => {
          setOpen(!open);
        }}
      >
        {open ? <span>Ləğv et</span> : <span>Yeni kataqoriya yarat</span>}
      </Button>
      {open && (
        <div id="new-catagory">
          <CloseSquareTwoTone
            onClick={() => {
              setOpen(!open);
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
            onFinish={async (values) => {
              await onFinish(values);
            }}
            // onFinishFailed={null}
          >
            <Form.Item
              label="Kataqoriya adı"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Kataqoriya adını doldurun !",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Üst kataqoriya"
              name="parent"
              rules={[
                {
                  required: true,
                  message: "Üst kataqoriyanı doldurun !",
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

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Yaddaşda saxla
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
}
