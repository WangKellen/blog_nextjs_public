// pages/index.js
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import BriefIntroduction from '../components/BriefIntroduction';
import LatestArticles from '../components/LatestArticles';
import Footer from '../components/Footer';
import { ParticlesBackground } from '../components/magicui/ParticlesBackground';

const HomePage = () => {
  return (
    <div className="relative min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="absolute inset-0 opacity-70 dark:opacity-90">
        <ParticlesBackground />
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



