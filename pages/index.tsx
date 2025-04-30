// pages/index.js
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BriefIntroduction from '../components/BriefIntroduction';
import LatestArticles from '../components/LatestArticles';
import Footer from '../components/Footer';
import Aurora from '@/components/background/Aurora';


const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="absolute inset-0 opacity-70 dark:opacity-90">
        <Aurora 
          colorStops={["#87CEEB", "#90EE90", "#00FFFF"]}
          blend={0.8}
          amplitude={1.0}
          speed={0.7}
        />
      </div>
      <Navbar />
      <HeroSection />
      <BriefIntroduction />
      <LatestArticles />
      {/* <CozeChat /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default HomePage;



