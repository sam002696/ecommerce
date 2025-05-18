import Footer from "../../components/customer/Footer";
import Header from "../../components/customer/Header";
import MobileMenu from "../../components/customer/MobileMenu";

const CustomerLayout = ({ children }) => {
  return (
    <div className="bg-white">
      <MobileMenu />
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default CustomerLayout;
