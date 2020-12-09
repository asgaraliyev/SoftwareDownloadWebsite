import { MenuOutlined, SearchOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changeDrawer } from ".../../../Redux/Actions";
import { useRouter } from "next/router";
export default function Index() {
  const dispatch = useDispatch();
  const onchangeDrawer = () => {
    dispatch(changeDrawer());
  };
  const router = useRouter();
  var menu = "";
  console.log(router.query, "header");
  const queries = router.query;
  if (queries.catagories) {
    menu = queries.catagories[0];
  } else if (queries.programName) {
    menu = "program";
  }
  return (
    <div className={styles.header}>
      <div className={styles.left_side}>
        <span
          className={styles.menu_icon}
          onClick={() => {
            onchangeDrawer();
          }}
        >
          <MenuOutlined className={styles.icon} />
        </span>
        <Link href="/">
          <span className={styles.logo}>
            <p>Crack Island</p>
          </span>
        </Link>
      </div>
      <div className={styles.center_side}>
        <ul className={styles.menu}>
          <li className={menu === "" ? styles.menu_active : null}>
            <Link href="/">Home</Link>
          </li>
          <li className={menu === "apps" ? styles.menu_active : null}>
            <Link href="/catagory/apps">Apps</Link>
          </li>
          <li className={menu === "games" ? styles.menu_active : null}>
            <Link href="/catagory/games">Games</Link>
          </li>
          <li>
            <Link to="/news" href="/news" style={{ width: "100%" }}>
              <div className={styles.expand}> News</div>
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.right_side}>
        <div className={styles.input_field}>
          <input placeholder="Search"></input>
          <button>
            <SearchOutlined className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
}
