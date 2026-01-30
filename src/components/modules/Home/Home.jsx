import DashboardOverview from "../Dashboard/DashboardOverview";
import InteractiveFlow from "../InteractiveFlow/InteractiveFlow";
import Footer from "../shered/Footer";
import HeroSection from "../shered/HeroSection";
import SignaturePart from "../SignaturePart/SignaturePart";

const HomeLayout = () => {
  return (
    <div>
      <HeroSection />
      <InteractiveFlow />
      <DashboardOverview />
      <SignaturePart />
      <Footer />
    </div>
  );
};

export default HomeLayout;
