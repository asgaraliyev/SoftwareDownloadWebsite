import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "antd/dist/antd.css";
import TheDrawer from "./Components/TheDrawer";
import Error from "./Components/Error";

export default function Index() {
  return (
    <>
      <TheDrawer></TheDrawer>
      <Header></Header>
      <Error></Error>
      <Footer></Footer>
    </>
  );
}
