import DashboardCard from "../Dashboard/DashboardCard";
import Dashboard from "../Dashboard/DashboardOverview";
import InteractiveFlow from "../InteractiveFlow/InteractiveFlow";
import Footer from "../shered/Footer";
import HeroHeader from "../shered/HeroSection";
import SignatureSectionInteractive from "../SignaturePart/SignaturePart";
const HomeLayout = () => {
  return (
    <div>
      <HeroHeader />
      <InteractiveFlow />
      {/* <Dashboard /> */}
      <SignatureSectionInteractive />
      <Footer />
    </div>
  );
};

export default HomeLayout;
