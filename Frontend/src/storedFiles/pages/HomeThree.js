import React, { useEffect, useState } from "react";
import { CloudinaryContext } from "cloudinary-react";
import axios from "axios";
import { Image, Card } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

export default function HomeThree() {
  const [images, setImages] = useState([]);
  const getData = async () => {
    await axios
      .get("http://localhost:999/gallery")
      .then((res) => {
        setImages(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const deletePhoto= async(theImage)=>{
    console.log(theImage,"theImage");
    await axios
    .delete("http://localhost:999/gallery",{
      params:{
        image:theImage.public_id,
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <div id="galery">
      {images.map((image) => {
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
        console.log(actualLink, "theLink");
        return (
          <span>
            <DeleteTwoTone
              onClick={()=>{
                deletePhoto(image)
              }}
              twoToneColor="red"
              style={{ fontSize: 20, cursor: "pointer" }}
            />
            <Image className="galery-image" width={200} src={actualLink} />
          </span>
        );
      })}
    </div>
  );
}
