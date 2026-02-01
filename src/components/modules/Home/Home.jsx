import DashboardCard from "../Dashboard/DashboardCard";
import InteractiveFlow from "../InteractiveFlow/InteractiveFlow";
import Footer from "../shered/Footer";
import HeroHeader from "../shered/HeroSection";

const HomeLayout = () => {
  return (
    <div>
      <HeroHeader />
      <InteractiveFlow />
      <DashboardCard />
      <Footer />
    </div>
  );
};

export default HomeLayout;
