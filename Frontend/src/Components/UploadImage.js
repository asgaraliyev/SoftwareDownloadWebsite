import React, { useState } from "react";
import {
  UpSquareTwoTone,
  LoadingOutlined,
  CloseSquareTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { Upload, message, Button } from "antd";
export default function UploadImage() {
  const [uploadArea, setUploadArea] = useState(false);

  const [fileList, setFileList] = useState([]);

  const onChange = ({ file, fileList }) => {
    setFileList(fileList);
  };

  const savePhotos = () => {
    fileList.map(async (file) => {
      const the_file = file.originFileObj;
      var formData = new FormData();
      formData.append("file", the_file);
      formData.append("upload_preset", "ml_default");
      await fetch("https://api.cloudinary.com/v1_1/drbir95bf/image/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => {
          if (res.status === 200) {
            setUploadArea(false);
            message.success(
              "Şəkil uğurla yükləndi.Amma şəkili görmək üçün zəhmət olmasa biraz gözlədikdən sonra səhifəni yeniləyin"
            );
          } else {
            message.error("Bağışlayın şəklin yüklənməsində problem yaşandı");
          }
        })
        .catch((error) => console.log(error));
      setFileList([]);
    });
  };
  return (
    <>
      <UpSquareTwoTone
        twoToneColor="blue"
        onClick={() => {
          setUploadArea(!uploadArea);
        }}
        style={{
          fontSize: 44,
        }}
      />
      {uploadArea && (
        <div id="upload-area">
          <CloseSquareTwoTone
            onClick={() => {
              setUploadArea(!uploadArea);
            }}
            twoToneColor="red"
            style={{
              fontSize: 44,
            }}
          />
          <br></br>
          <br></br>
          <Upload
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
          >
            {fileList.length < 5 && "+ Upload"}
          </Upload>
          <Button
            onClick={() => {
              savePhotos();
            }}
          >
            <strong>Yadda saxla</strong>
          </Button>
        </div>
      )}
    </>
  );
}
