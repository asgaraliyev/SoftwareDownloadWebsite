import React, { useEffect, useState } from "react";
import { CloudinaryContext } from "cloudinary-react";
import axios from "axios";
import { Image, Card, message, Table } from "antd";
import { SyncOutlined, DeleteTwoTone } from "@ant-design/icons";
import UploadImage from "../Components/UploadImage";
export default function HomeThree() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    await axios
      .get("http://localhost:999/gallery")
      .then((res) => {
        const data = res.data;
        if (!data.data) {
          message.error("Şəkillərin yüklənməsində problem yaşandı");
        } else {
          console.log(data);
          setImages(data.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const deletePhotos = async (images) => {
    console.log(images);
    const result = await axios.delete("http://localhost:999/gallery", {
      params: {
        images: images,
      },
    });
    if (result.data.error) {
      message.error(result.data.error);
    } else {
      getData();
      getData();
      getData();
      message.success("Şəkillər uğurla silindi");
    }
  };
  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      render: (text) => (
        <>
          <Image className="galery-image" width={200} src={text} />
        </>
      ),
    },
  ];
  const data = [];
  images.map((image, index) => {
    const imageLink = image.url.split("/");
    const imageFilter = "c_fill,q_99,r_0,w_300";
    var actualLink = "";
    imageLink.map((element) => {
      if (element === "upload") {
        actualLink += element + "/" + imageFilter + "/";
      } else {
        actualLink += element + "/";
      }
    });
    actualLink = actualLink.slice(0, -1);
    data.push({
      key: image.public_id,
      photo: actualLink,
    });
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (theKeys) => {
    setSelectedRowKeys(theKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
  };
  return (
    <div id="galery">
      <span>
        <DeleteTwoTone
          onClick={() => {
            setLoading(true);
            deletePhotos(selectedRowKeys);
          }}
          twoToneColor="red"
          style={{ fontSize: 40, cursor: "pointer" }}
        />
      </span>

      <span>
        <UploadImage></UploadImage>
      </span>
      <span>
        <SyncOutlined
          style={{ fontSize: 40, cursor: "pointer", color: "green" }}
          spin={loading}
          onClick={() => {
            setLoading(true);
            getData();
          }}
        />
      </span>
      <br></br>
      <br></br>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
      {/* {images.map((image) => {
        const imageLink = image.url.split("/");
        const imageFilter = "c_fill,q_99,r_0,w_300";
        var actualLink = "";
        imageLink.map((element) => {
          if (element === "upload") {
            actualLink += element + "/" + imageFilter + "/";
          } else {
            actualLink += element + "/";
          }
        });
        actualLink = actualLink.slice(0, -1);
        // console.log(actualLink, "theLink");
      })} */}
    </div>
  );
}
//   <span style={{ position: "relative" }} key={image.url}>
//     <div className="however"></div>
//     <DeleteTwoTone
//       onClick={() => {
//         deletePhoto(image);
//       }}
//       twoToneColor="red"
//       style={{ fontSize: 20, cursor: "pointer" }}
//     />
//     <Image className="galery-image" width={200} src={actualLink} />
//   </span>
