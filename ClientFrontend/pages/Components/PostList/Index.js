import styles from "./index.module.scss";
import Slider from "../Slider";
import Link from "next/link";
export default function Index({ postList, posts, name, seeMoreLink }) {
  var responsive = [];
  if (postList) {
    responsive = [
      {
        breakpoint: 1571,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1290,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1115,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 977,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 794,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 741,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 399,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ];
  }
  return (
    <div className={styles.post_list}>
      <div className={styles.title_area}>
        <span>
          <h1>{name}</h1>
        </span>
        <span className={styles.seeMore}>
          <Link href={seeMoreLink}>
            <button>See more</button>
          </Link>
        </span>
      </div>
      <Slider responsive={responsive} posts={posts}></Slider>
    </div>
  );
}

Index.defaultProps = {
  postList: false,
};
