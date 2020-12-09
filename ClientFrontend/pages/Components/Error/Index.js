import Link from "next/link";
export default function Index() {
  return (
    <>
      <section id="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center ">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">Look like you're lost</h3>
                  <p>the page you are looking for not avaible!</p>
                  <Link href="/">
                    <div className="link_404"> Go to Home</div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <style jsx>{`
        #page_404 {
          padding: 40px 0;
          background: #fff;
          text-align: center;
        }

        #page_404 img {
          width: 100%;
        }

        .four_zero_four_bg {
          background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
          height: 400px;
          background-position: center;
          background-repeat: no-repeat;
        }

        .four_zero_four_bg h1 {
          font-size: 80px;
        }

        .four_zero_four_bg h3 {
          font-size: 80px;
        }

        .link_404 {
          color: #fff !important;
          padding: 10px 20px;
          background: #39ac31;
          margin: 20px 0;
          cursor: pointer;
          display: inline-block;
        }
        .contant_box_404 {
          margin-top: -50px;
        }
      `}</style>
    </>
  );
}
