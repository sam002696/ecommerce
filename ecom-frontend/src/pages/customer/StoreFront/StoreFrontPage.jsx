import Header from "../../../components/customer/Header";
import Footer from "../../../components/customer/Footer";
import Category from "../../../components/customer/Category";
import Featured from "../../../components/customer/Featured";
import Favorites from "../../../components/customer/Favorites";
import CTASection from "../../../components/customer/CTASection";
import MobileMenu from "../../../components/customer/MobileMenu";

const StoreFrontPage = () => {
  return (
    <div className="bg-white">
      {/* Mobile menu */}

      <MobileMenu />

      {/* Header */}

      <Header />

      <main>
        {/* Category section */}

        <Category />

        {/* Featured section */}

        <Featured />

        {/* Favorites section */}

        <Favorites />

        {/* CTA section */}

        <CTASection />
      </main>

      {/* Footer */}

      <Footer />
    </div>
  );
};
export default StoreFrontPage;
