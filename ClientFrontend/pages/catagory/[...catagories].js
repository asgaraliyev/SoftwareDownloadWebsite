import { useRouter } from "next/router";
import TheDrawer from "../Components/TheDrawer";
import Header from "../Components/Header";
import CatagoryList from "../Components/CatagoryList";
import PostList from "../Components/PostList";
import Footer from "../Components/Footer";
import Link from "next/link";
import styles from "../style/index.module.scss";
import axios from "axios";
import { MdKeyboardArrowRight } from "react-icons/md";
import { AiTwotoneHome } from "react-icons/ai";
import { Tabs, message } from "antd";
import { FaFileDownload } from "react-icons/fa";
import { MdNewReleases } from "react-icons/md";
import FilterPosts from "../Components/FilterPosts";
import { useState, useEffect } from "react";
export async function getStaticPaths() {
  const allPaths = await axios
    .get("http://localhost:999/catagories")
    .then((result) => {
      if (result.data.data) {
        const catagories = result.data.data;
        const allPaths = [];
        catagories.map((cat) => {
          if (cat.name !== "root") {
            const catTree = cat.tree;
            catTree.shift();
            catTree.push(cat.name);
            allPaths.push({ params: { catagories: catTree } });
          }
        });
        return allPaths;
      }
    })
    .catch((error) => {
      return [];
    });
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: allPaths,
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: false,
  };
}
export async function getStaticProps({ params }) {
  const { catagories } = params;
  var mode = 0;
  if (catagories.length !== 1) {
    mode = 1;
  }
  var actualResult;
  const catagory = catagories[catagories.length - 1];
  if (mode === 1) {
    actualResult = await axios
      .get("http://localhost:999/catagory-posts", {
        params: { catagory: catagory, filterName: "time" },
      })
      .then((result) => {
        if (result.data.data) {
          return { props: { catagory, mode, posts: result.data.data } };
        } else {
          return { props: { catagory, mode } };
        }
      })
      .catch((error) => {
        console.log("props", error);
        return { props: { catagory, mode } };
      });
  } else if (mode === 0) {
    const allPosts = await axios
      .get("http://localhost:999/catagory-posts", {
        params: { catagory: catagory, filterName: "time" },
      })
      .then((result) => {
        if (result.data.data) {
          return result.data.data;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.log("props", error);
        return [];
      });
    const mostDownloaded = await axios
      .get("http://localhost:999/catagory-posts", {
        params: { catagory: catagory, filterName: "download" },
      })
      .then((result) => {
        if (result.data.data) {
          return result.data.data;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.log("props", error);
        return [];
      });
    const latestUpdates = await axios
      .get("http://localhost:999/catagory-posts", {
        params: { catagory: catagory, filterName: "time" },
      })
      .then((result) => {
        if (result.data.data) {
          return result.data.data;
        } else {
          return [];
        }
      })
      .catch((error) => {
        console.log("props", error);
        return [];
      });
    actualResult = {
      props: { mostDownloaded, latestUpdates, mode, catagory, posts: allPosts },
    };
  }

  return actualResult;
  // paramsdan path i goturecek 2 yola ayrilacag patha gore eger root dir in bi
  // r asagisindaki kateqoriyadandisa path onda 1 ci yola eger deyilse onda 2ci yola gedecek.
  //burada hemin yola gore lazim olan requeststler backende verilecek
  // ve geri donulen objectler seyfenin tipi deyeri ile birlikde props kimi componente gonderilecek
  //burada gonderilen obyektler componentin tipinen asli olaraq deyisir eger deyekki 0 ci nov component tipidirse
  // onda most downloaded games ,most downloaded smliators kimi  array formalarinda yuklenenecek
  // eger 1 ci novduse onda filtirlenmis sekilde yuklenecek hemin filtirleme gonderilen requestde qeyd edilecek
}
export default function Index(props) {
  const { TabPane } = Tabs;
  const { catagory, mode } = props;
  const router = useRouter();
  const [filteredPost, setFilteredPost] = useState([]);
  const [tabChanged, setTabChanged] = useState(false);
  const [distMount, isDidMount] = useState(false);
  const { catagories, posts } = router.query;
  const filterPosts = async (filterName) => {
    const theCata = catagories[catagories.length - 1];
    await axios
      .get("http://localhost:999/catagory-posts", {
        params: { catagory: theCata, filterName },
      })
      .then((result) => {
        if (result.data.data) {
          setFilteredPost(result.data.data);
        } else {
          message.error("Something went wrong");
        }
      })
      .catch((error) => {
        message.error("Something went wrong");
      });
  };

  useEffect(() => {
    console.log(props, "props");
    if (props.posts) {
      setFilteredPost(props.posts);
    }
  }, [router]);
  return (
    <>
      <TheDrawer></TheDrawer>
      <Header></Header>
      <div id={styles.breadcrumb}>
        <span>
          <Link href="/">
            <AiTwotoneHome></AiTwotoneHome>
          </Link>
          <MdKeyboardArrowRight></MdKeyboardArrowRight>
        </span>
        {catagories.map((category) => {
          const indexOfTheCate = catagories.indexOf(category);
          var theLink = "";
          const listOfCats = catagories.slice(0, indexOfTheCate + 1);
          listOfCats.map((cat) => {
            theLink += cat + "/";
          });
          console.log(theLink, "theLink");
          return (
            <span key={category}>
              <Link href={`/catagory/${theLink}`}>{category}</Link>
              <MdKeyboardArrowRight></MdKeyboardArrowRight>
            </span>
          );
        })}
      </div>
      <div>
        <div id={styles.main_area}>
          <div id={styles.posts_area}>
            {mode === 0 ? (
              <div>
                <PostList
                  postList={true}
                  posts={props.latestUpdates}
                  name={`Latest Updates ${props.catagory}`}
                  seeMoreLink={`/catagory/${props.catagory}`}
                ></PostList>
                <PostList
                  postList={true}
                  posts={props.mostDownloaded}
                  name={`Most  Downloaded ${props.catagory}`}
                  seeMoreLink={`/catagory/${props.catagory}`}
                ></PostList>
                <br></br>
                <Tabs defaultActiveKey="2">
                  <TabPane
                    tab={
                      <span
                        onClick={() => {
                          filterPosts("download");
                        }}
                      >
                        <FaFileDownload />
                        Most Downloaded
                      </span>
                    }
                    key="1"
                  >
                    <FilterPosts
                      posts={filteredPost}
                      // catagory={catagory}
                      // filter="download"
                    ></FilterPosts>
                  </TabPane>
                  <TabPane
                    tab={
                      <span
                        onClick={() => {
                          filterPosts("time");
                        }}
                      >
                        <MdNewReleases />
                        Latest Updates
                      </span>
                    }
                    key="2"
                  >
                    <FilterPosts posts={filteredPost}></FilterPosts>
                  </TabPane>
                </Tabs>
              </div>
            ) : (
              <div id={styles.tabs_for_color}>
                <Tabs defaultActiveKey="2">
                  <TabPane
                    tab={
                      <span
                        onClick={() => {
                          filterPosts("download");
                        }}
                      >
                        <FaFileDownload />
                        Most Downloaded
                      </span>
                    }
                    key="1"
                  >
                    <FilterPosts
                      posts={filteredPost}
                      // catagory={catagory}
                      // filter="download"
                    ></FilterPosts>
                  </TabPane>
                  <TabPane
                    tab={
                      <span
                        onClick={() => {
                          filterPosts("time");
                        }}
                      >
                        <MdNewReleases />
                        Latest Updates
                      </span>
                    }
                    key="2"
                  >
                    <FilterPosts posts={filteredPost}></FilterPosts>
                  </TabPane>
                </Tabs>
              </div>
            )}
          </div>
          <div id={styles.catagories_area}>
            <CatagoryList></CatagoryList>
          </div>
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
          .ant-tabs-tab-active {
            color: #01a001 !important;
          }
          .ant-tabs-tab-active * {
            color: #01a001 !important;
            stroke: #01a001 !important;
            fill: #01a001 !important;
          }
          .ant-tabs-ink-bar {
            background: #01a001 !important;
          }
        `}
      </style>
    </>
  );
}
