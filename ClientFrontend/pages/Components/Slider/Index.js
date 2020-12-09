import styles from "./index.module.scss";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Post from "../Post";
export default function Index({
  dots,
  infinite,
  speed,
  autoplay,
  slidesToShow,
  slidesToScroll,
  autoplaySpeed,
  pauseOnHover,
  rtl,
  arrows,
  responsive,
  data,
  posts
}) {
  const settings = {
    dots: dots,
    infinite: infinite,
    speed: speed,
    autoplay: autoplay,
    slidesToShow: slidesToShow,
    slidesToScroll: slidesToScroll,
    autoplaySpeed: autoplaySpeed,
    pauseOnHover: pauseOnHover,
    arrows: arrows,
    rtl: rtl,
    responsive: responsive,
  };
  const post = {
    publicId: "maxresdefault_r9nav4",
    name: "Point Blank For Windows",
    download: 999,
    modType: "Wall Hack Wall Hack Wall Hack",
  };
  return (
    <div className={styles.slider_parent}>
      <Slider {...settings}>
      {posts.map((post)=>{
    
        return(    <Post post={post}></Post>)
      })}
   
      </Slider>
      <style jsx global>
        {`
          .slick-prev {
            background: rgb(255, 255, 255);
            background: linear-gradient(
              90deg,
              rgba(255, 255, 255, 1) 17%,
              rgba(255, 255, 255, 0) 88%
            );
            width: 100px;
            height: 100%;
            position: absolute;
            z-index: 2;
          }
          .slick-prev:before {
            font-size: 31px;
            color: black;
          }
          .slick-next {
            background: rgb(255, 255, 255);
            background: linear-gradient(
              270deg,
              rgba(255, 255, 255, 1) 17%,
              rgba(255, 255, 255, 0) 88%
            );
            width: 100px;
            height: 100%;
            position: absolute;
            z-index: 2;
            right: -0px;
          }
          .slick-next:before {
            font-size: 31px;
            color: black;
          }
        `}
      </style>
    </div>
  );
}
Index.defaultProps = {
  dots: false,
  infinite: true,
  speed: 500,
  autoplay: true,
  slidesToShow: 6,
  slidesToScroll: 3,
  autoplaySpeed: 3000,
  pauseOnHover: false,
  rtl: false,
  arrows: true,
  responsive: [],
};
