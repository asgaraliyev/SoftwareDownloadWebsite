import { Avatar, message } from "antd";
import styles from "./index.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
export default function Index() {
  const [games, setGames] = useState([]);
  const [apps, setApps] = useState([]);
  useEffect(async () => {
    await axios
      .get("http://localhost:999/find-catagories-by-parent", {
        params: {
          parent: "games",
        },
      })
      .then((res) => {
        if (res.data.data) {
          setGames(res.data.data);
        } else {
          message.error("Something went wrong");
        }
      })
      .catch((error) => {
        message.error("Something went wrong");
      });
    await axios
      .get("http://localhost:999/find-catagories-by-parent", {
        params: {
          parent: "apps",
        },
      })
      .then((res) => {
        if (res.data.data) {
          setApps(res.data.data);
        } else {
          message.error("Something went wrong");
        }
      })
      .catch((error) => {
        message.error("Something went wrong");
      });
  }, []);
  return (
    <>
      <div className={styles.catagory_list_area}>
        <h1>
          Games <hr></hr>
        </h1>
        <ul>
          {games.map((element) => {
            var link = "";
            var theTree = element.tree;
            theTree = theTree.slice(1, theTree.length);
            theTree.push(element.name);
            theTree.map((tree) => {
              link += tree + "/";
            });
            return (
              <li>
                <Link href={`/catagory/${link}`}>
                  <Avatar
                    size="large"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </Link>
                <Link href={`/catagory/${link}`}>{element.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.catagory_list_area}>
        <h1>
          Apps <hr></hr>
        </h1>
        <ul>
          {apps.map((element) => {
            var link = "";
            var theTree = element.tree;
            theTree = theTree.slice(1, theTree.length);
            theTree.push(element.name);
            theTree.map((tree) => {
              link += tree + "/";
            });

            return (
              <li>
                <Link href={`/catagory/${link}`}>
                  <Avatar
                    size="large"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />
                </Link>
                <Link href={`/catagory/${link}`}>{element.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
