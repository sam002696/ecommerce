import React from "react";
import TopNavigation from "./TopNavigation";
import HeroSection from "./HeroSection";

const Header = () => {
  return (
    <>
      <header className="relative overflow-hidden">
        {/* Top navigation */}
        <TopNavigation />

        {/* Hero section */}
        <HeroSection />
      </header>
    </>
  );
};

export default Header;
