import Category from "../../../components/customer/Category";
import Featured from "../../../components/customer/Featured";
import Favorites from "../../../components/customer/Favorites";
import CTASection from "../../../components/customer/CTASection";
import HeroSection from "../../../components/customer/HeroSection";
import CustomerLayout from "../../../layouts/CustomerLayout/CustomerLayout";

const StoreFrontPage = () => {
  return (
    <CustomerLayout>
      <HeroSection />
      <Category />
      <Featured />
      <Favorites />
      <CTASection />
    </CustomerLayout>
  );
};
export default StoreFrontPage;
