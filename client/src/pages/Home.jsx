import Hero from '../components/site/home/Hero';
import LogoMarquee from '../components/site/LogoMarquee';
import SolutionsSection from '../components/site/home/SolutionsSection';
import FeaturedCases from '../components/site/home/FeaturedCases';
import AboutSnippet from '../components/site/home/AboutSnippet';
import GradientBand from '../components/site/GradientBand';
import SEO from '../components/site/SEO';

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Verve Innovation",
  "url": "https://verveinnovation.com",
  "logo": "https://verveinnovation.com/logo.png",
  "description": "Verve Innovation builds enterprise-grade software solutions, specializing in custom web and mobile development, digital transformation, and scalable cloud architectures.",
  "sameAs": [
    "https://twitter.com/verveinnovation",
    "https://linkedin.com/company/verveinnovation"
  ]
};

export default function Home() {
  return (
    <>
      <SEO 
        title="Premium Digital Products" 
        description="We design digital experiences that define the future. Software, mobile apps, and platforms."
        schema={organizationSchema}
      />
      
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
