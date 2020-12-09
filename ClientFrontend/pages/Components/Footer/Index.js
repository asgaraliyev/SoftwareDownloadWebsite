import styles from "./index.module.scss";
import { FaFacebookF, FaPinterestP, FaLinkedinIn } from "react-icons/fa";
import { HiHashtag } from "react-icons/hi";
import {
  AiOutlineTwitter,
  AiFillYoutube,
  AiOutlineInfoCircle,
} from "react-icons/ai";
import Link from "next/link";
export default function Index() {
  return (
    <div id={styles.footer}>
      <hr className={styles.line}></hr>

      <div className={styles.about_us}>
        <div className={styles.contents}>
          <div className={styles.actual_content}>
            <div className={styles.side}>
              <h4>
                <HiHashtag></HiHashtag>Useful Sections
              </h4>
              <Link href="/contact">Advertisement</Link>
              &nbsp;
              <Link href="/support">Advertisement</Link>
            </div>
            <div className={styles.side}>
              <h4>
                <AiOutlineInfoCircle></AiOutlineInfoCircle>About Us
              </h4>
              <h2>Crack Island</h2>
              <Link href="/contact">Contact</Link>
              &nbsp;
              <Link href="/support">Support Us</Link>
            </div>
          </div>
          <br></br>
          <br></br>

          <div className={styles.social_media}>
            <hr></hr>
            <div className={styles.icons}>
              <div className={styles.icon}>
                <FaFacebookF />
              </div>
              <div className={styles.icon}>
                <AiOutlineTwitter />
              </div>
              <div className={styles.icon}>
                <AiFillYoutube></AiFillYoutube>
              </div>
              <div className={styles.icon}>
                <FaPinterestP />
              </div>
              <div className={styles.icon}>
                <FaLinkedinIn />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        <p>© Copyright 2017-2020 MODDROID.COM</p>
      </div>
    </div>
  );
}
