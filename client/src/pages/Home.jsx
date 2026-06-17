import Hero from '../components/site/home/Hero';
import LogoMarquee from '../components/site/LogoMarquee';
import SolutionsSection from '../components/site/home/SolutionsSection';
import FeaturedCases from '../components/site/home/FeaturedCases';
import AboutSnippet from '../components/site/home/AboutSnippet';
import GradientBand from '../components/site/GradientBand';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Verve Innovation | Premium Digital Products</title>
        <meta name="description" content="We design digital experiences that define the future. Software, mobile apps, and platforms." />
      </Helmet>
      
      <Hero />
      <LogoMarquee />
      <FeaturedCases />
      <SolutionsSection />
      <AboutSnippet />
      
      <GradientBand 
        headline="Ready to build *something extraordinary* together?"
        buttonText="Start a Project"
        buttonLink="/contact"
      />
    </>
  );
}
