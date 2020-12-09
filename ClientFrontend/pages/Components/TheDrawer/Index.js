import { Drawer, List, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { changeDrawer } from "../../../Redux/Actions";
import styles from "./index.module.scss";
import { VscClose } from "react-icons/vsc";
import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useRouter } from "next/router";

export default function Index() {
  const isDrawerOpen = useSelector((state) => state.DrawerReducer.isDrawerOpen);
  const dispatch = useDispatch();

  const [subMenuActive, setSubMenuActive] = useState(null);
  const closeDrawer = () => {
    dispatch(changeDrawer());
  };
  const [data, setData] = useState([]);
  const [games, setGames] = useState([]);
  const [apps, setApps] = useState([]);
  useEffect(async () => {
    await axios
      .get("http://localhost:999/find-catagories-by-parent", {
        params: { parent: "games" },
      })
      .then((result) => {
        if (result.data.data) {
          setGames(result.data.data);
        } else {
          message.error("Something went wrong");
        }
      })
      .catch((error) => {
        message.error("Something went wrong");
      });
    await axios
      .get("http://localhost:999/find-catagories-by-parent", {
        params: { parent: "apps" },
      })
      .then((result) => {
        if (result.data.data) {
          setApps(result.data.data);
        } else {
          message.error("Something went wrong");
        }
      })
      .catch((error) => {
        message.error("Something went wrong");
      });
    setData(["home", "apps", "games", "news", "language"]);
  }, []);
  const router = useRouter();
  var menu = "home";

  const { catagories } = router.query;
  if (catagories) {
    menu = catagories[0];
  }
  return (
    <>
      <Drawer
        id={styles.drawer}
        width="300px"
        height="100vh"
        placement="left"
        closable={false}
        onClose={closeDrawer}
        visible={isDrawerOpen}
      >
        <button
          className={styles.close_btn}
          onClick={() => {
            closeDrawer();
          }}
        >
          <VscClose></VscClose>
        </button>
        <br></br>
        <br></br>
        <br></br>
        <List
          dataSource={data}
          renderItem={(item) => {
            if (item === "games" || item === "apps") {
              return (
                <div style={{ overflow: "hidden" }}>
                  <List.Item
                    actions={[
                      <button className={styles.arrowButton}>
                        <MdKeyboardArrowDown
                          style={{ fontSize: "2em" }}
                          onClick={() => {
                            if (item === subMenuActive) {
                              setSubMenuActive(null);
                            } else {
                              setSubMenuActive(item);
                            }
                          }}
                        ></MdKeyboardArrowDown>
                      </button>,
                    ]}
                    className={` ${styles.offline_item}`}
                  >
                    <List.Item.Meta
                      title={
                        <Link href={`/catagory/${item}`}>
                          <strong
                            className={`${
                              menu === item ? styles.drawer_active : null
                            }`}
                          >
                            {item}
                          </strong>
                        </Link>
                      }
                    />
                  </List.Item>

                  {item === subMenuActive && (
                    <SubMenu
                      catagory={item}
                      games={games}
                      apps={apps}
                    ></SubMenu>
                  )}
                </div>
              );
            } else {
              return (
                <List.Item className={styles.offline_item}>
                  <Link href={item === "home" ? `/` : `/${item}`}>
                    <strong
                      className={`${
                        menu === item ? styles.drawer_active : null
                      }`}
                    >
                      {item}
                    </strong>
                  </Link>
                </List.Item>
              );
            }
          }}
        />
      </Drawer>
    </>
  );
}

const SubMenu = ({ catagory, games, apps }) => {
  var data = [];

  if (catagory === "games") {
    data = games;
  } else if (catagory === "apps") {
    data = apps;
  }

  return (
    <div className={styles.submenu}>
      <List
        dataSource={data}
        renderItem={(item) => {
          return (
            <List.Item className={styles.offline_item}>
              <List.Item.Meta
                title={
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <strong style={{ fontSize: "0.8em" }}>{item.name}</strong>
                  </>
                }
              />
            </List.Item>
          );
        }}
      ></List>
    </div>
  );
};
