import Header from "./Components/Header";
import Footer from "./Components/Footer";

import TheDrawer from "./Components/TheDrawer";
import PostList from "./Components/PostList";
import styles from "./style/index.module.scss";
import CatagoryList from "./Components/CatagoryList";
import axios from "axios";
export async function getStaticProps({ params }) {
  const mostDownloaded = await axios
    .get("http://localhost:999/catagory-posts", {
      params: { catagory: "root", filterName: "download" },
    })
    .then((result) => {
      if (result.data.data) {
        const posts = result.data.data;
        posts.slice(0, 10);
        return posts;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return [];
    });
  const latestUpdates = await axios
    .get("http://localhost:999/catagory-posts", {
      params: { catagory: "root", filterName: "time" },
    })
    .then((result) => {
      if (result.data.data) {
        const posts = result.data.data;
        posts.slice(0, 10);
        return posts;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return [];
    });
  const mostDownloadedGames = await axios
    .get("http://localhost:999/catagory-posts", {
      params: { catagory: "games", filterName: "download" },
    })
    .then((result) => {
      if (result.data.data) {
        const posts = result.data.data;
        posts.slice(0, 10);
        return posts;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return [];
    });
  const mostDownloadedApps = await axios
    .get("http://localhost:999/catagory-posts", {
      params: { catagory: "apps", filterName: "download" },
    })
    .then((result) => {
      if (result.data.data) {
        const posts = result.data.data;
        posts.slice(0, 10);
        return posts;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return [];
    });
  const latestUpdatesGames = await axios
    .get("http://localhost:999/catagory-posts", {
      params: { catagory: "games", filterName: "time" },
    })
    .then((result) => {
      if (result.data.data) {
        const posts = result.data.data;
        posts.slice(0, 10);
        return posts;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return [];
    });
  const latestUpdatesApps = await axios
    .get("http://localhost:999/catagory-posts", {
      params: { catagory: "apps", filterName: "time" },
    })
    .then((result) => {
      if (result.data.data) {
        const posts = result.data.data;
        posts.slice(0, 10);
        return posts;
      } else {
        return [];
      }
    })
    .catch((error) => {
      return [];
    });

  const actualResult = {
    props: {
      mostDownloaded,
      latestUpdates,
      mostDownloadedGames,
      mostDownloadedApps,
      latestUpdatesGames,
      latestUpdatesApps,
    },
  };

  return actualResult;
}
export default function index({
  mostDownloaded,
  latestUpdates,
  mostDownloadedGames,
  mostDownloadedApps,
  latestUpdatesGames,
  latestUpdatesApps,
}) {
  return (
    <>
      <TheDrawer></TheDrawer>
      <Header></Header>
      <div id={styles.main_area}>
        <div id={styles.posts_area}>
          <PostList
            postList={true}
            posts={mostDownloaded}
            name="Most Downloaded"
            seeMoreLink="/"
          ></PostList>
          <PostList
            postList={true}
            posts={latestUpdates}
            name="Latest Updates"
            seeMoreLink="/"
          ></PostList>
          <PostList
            postList={true}
            posts={mostDownloadedGames}
            name="Most Downloaded Games"
            seeMoreLink="/catagory/games"
          ></PostList>
          <PostList
            postList={true}
            posts={mostDownloadedApps}
            name="Most Downloaded Apps"
            seeMoreLink="/catagory/apps"
          ></PostList>

          <PostList
            postList={true}
            posts={latestUpdatesGames}
            name="Latest Updates Games"
            seeMoreLink="/catagory/games"
          ></PostList>
          <PostList
            postList={true}
            posts={latestUpdatesApps}
            name="Latest Updates Apps"
            seeMoreLink="/catagory/apps"
          ></PostList>
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
