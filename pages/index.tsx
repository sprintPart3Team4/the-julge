import CustomNotice from "@/components/common/customNotice/CustomNotice";
import Notices from "@/components/Notices/Notices";
import Footer from "@/components/common/footer/Footer";
import NavBar from "@/components/common/navBar/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <CustomNotice />
      <Notices />
      <Footer />
    </>
  );
}
