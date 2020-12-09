import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import Post from "../Post";

export default function Index({ posts }) {
  console.log(posts, "posts");
  if (posts) {
    return (
      <>
        {posts.map((post) => {
          return <Post key={post._id} post={post}></Post>;
        })}
      </>
    );
  } else {
    return <div>nothing found</div>;
  }
}
