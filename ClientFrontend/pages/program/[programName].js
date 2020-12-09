import React from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import TheDrawer from "../Components/TheDrawer";
import styles from "../style/index.module.scss";
import indexS from "./index.module.scss";
import { Image } from "cloudinary-react";
import { List } from "antd";
import CatagoryList from "../Components/CatagoryList";
import ReactTimeAgo from "react-time-ago";
import { FaDownload } from "react-icons/fa";
export async function getStaticPaths() {
  const allPaths = await axios
    .get("http://localhost:999/posts")
    .then((result) => {
      if (result.data.data) {
        const posts = result.data.data;
        const allAllowedIds = [];
        posts.map((post) => {
          allAllowedIds.push({ params: { programName: post._id } });
        });
        return allAllowedIds;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return [];
    });
  return {
    paths: allPaths,
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const _id = params.programName;

  const result = await axios
    .get("http://localhost:999/post", { params: { _id } })
    .then((response) => {
      if (response.data.data) {
        return {
          props: { post: response.data.data },
        };
      } else {
        return {
          props: {
            post: null,
          },
        };
      }
    })
    .catch((error) => {
      return {
        props: {
          post: null,
        },
      };
    });
  return result;
}
const appInfo = [
  "name",
  "catagory",
  "programVersion",
  "modInfo",
  "operatingSystem",
  "updatedAt",
  "downloadCount",
  "description",
];
export default function Index(props) {
  return (
    <>
      <TheDrawer></TheDrawer>
      <Header></Header>
      <div id={styles.main_area}>
        <div id={styles.posts_area}>
          <h1 style={{ textAlign: "center" }}>
            {props.post["name"]}
            {props.post["modInfo"] && <>({props.post["modInfo"]})</>}
          </h1>
          <div id={indexS.post_title_area}>
            <div className={indexS.left_side}>
              <div className={indexS.image_area}>
                <Image
                  publicId={props.post.photo.public_id}
                  className={styles.image}
                  height="200px"
                  style={{ borderRadius: " 0.5rem " }}
                  cloudName="drbir95bf"
                ></Image>
              </div>
            </div>
            <div className={indexS.right_side}>
              <List
                dataSource={appInfo}
                renderItem={(item, index) => {
                  var willRender;
                  if (props.post[item] && item === "name") {
                    willRender = (
                      <li>
                        <strong>App Name: </strong>
                        <span className={indexS.item_answer}>
                          {props.post[item]}
                        </span>
                      </li>
                    );
                  } else if (props.post[item] && item === "catagory") {
                    willRender = (
                      <li>
                        <strong>Genre: </strong>
                        <span className={indexS.item_answer}>
                          {props.post[item]}
                        </span>
                      </li>
                    );
                  } else if (props.post[item] && item === "operatingSystem") {
                    willRender = (
                      <li>
                        <strong>OS: </strong>
                        <span className={indexS.item_answer}>
                          {props.post[item]}
                        </span>
                      </li>
                    );
                  } else if (props.post[item] && item === "programVersion") {
                    willRender = (
                      <li>
                        <strong>Latest Version: </strong>
                        <span className={indexS.item_answer}>
                          {props.post[item]}
                        </span>
                      </li>
                    );
                  } else if (props.post[item] && item === "modInfo") {
                    willRender = (
                      <li>
                        <strong>MOD Info: </strong>
                        <span className={indexS.item_answer}>
                          {props.post[item]}
                        </span>
                      </li>
                    );
                  } else if (props.post[item] && item === "updatedAt") {
                    willRender = (
                      <li>
                        <strong>Update: </strong>
                        <span className={indexS.item_answer}>
                          <ReactTimeAgo
                            date={props.post[item]}
                            locale="en-US"
                          />
                          {/* {} */}
                        </span>
                      </li>
                    );
                  } else if (props.post[item] && item === "downloadCount") {
                    willRender = (
                      <li>
                        <strong>Downloaded: </strong>
                        <span className={indexS.item_answer}>
                          {props.post[item]}
                        </span>
                      </li>
                    );
                  } else if (props.post[item] && item === "description") {
                    willRender = (
                      <li>
                        <strong>Description: </strong>
                        <span className={indexS.item_answer}>
                          {props.post[item]}
                        </span>
                      </li>
                    );
                  }
                  return willRender;
                }}
              ></List>
            </div>
          </div>
          <div id={indexS.download_area}>
            <a
              className={indexS.button}
              href={props.post.downloadLink}
              target="_blank"
            >
              <FaDownload></FaDownload>
              Download
            </a>
          </div>
          <div
            className="Container"
            dangerouslySetInnerHTML={{ __html: props.post.content }}
          ></div>
        </div>

        <div id={styles.catagories_area}>
          <CatagoryList></CatagoryList>
        </div>
      </div>
      <Footer></Footer>
      <style jsx global>
        {`
          img,
          html,
          body,
          div,
          h1,
          h2,
          h3,
          h4,
          h5,
          h6,
          p,
          dl,
          dt,
          dd,
          ol,
          ul,
          li,
          table,
          caption,
          tbody,
          tfoot,
          thead,
          tr,
          th,
          td,
          form,
          fieldset,
          embed,
          object,
          applet {
            color: #333;
          }
        `}
      </style>
    </>
  );
}
