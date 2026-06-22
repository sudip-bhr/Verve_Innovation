import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '../components/site/SEO';
import { ArrowLeft } from 'lucide-react';
import api from '../lib/api';

export default function CaseDetail() {
  const { slug } = useParams();
  const [caseStudy, setCaseStudy] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/cases/${slug}`)
      .then(res => {
        if (res.data?.success) setCaseStudy(res.data.data);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="min-h-screen pt-32 px-6"><div className="max-w-7xl mx-auto h-96 bg-black/5 dark:bg-white/5 animate-pulse rounded-3xl" /></div>;
  }

  if (!caseStudy) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-32 px-6">
        <h1 className="text-4xl font-display font-bold text-verve-text-primary mb-4">Case Study Not Found</h1>
        <Link to="/cases" className="text-verve-orange hover:underline">Back to all cases</Link>
      </div>
    );
  }

  const coverImage = caseStudy.coverImage || `https://picsum.photos/seed/${caseStudy.slug}/1920/1080`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": caseStudy.title,
    "image": [coverImage],
    "author": {
      "@type": "Organization",
      "name": "Verve Innovation"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Verve Innovation",
      "logo": {
        "@type": "ImageObject",
        "url": "https://verveinnovation.com/logo.png"
      }
    },
    "description": caseStudy.summary,
  };

  return (
    <>
      <SEO 
        title={caseStudy.title}
        description={caseStudy.summary}
        type="article"
        image={coverImage}
        schema={articleSchema}
      />

      <article className="pt-24 md:pt-32 pb-24">
        {/* Header */}
        <header className="px-6 mb-12">
          <div className="max-w-4xl mx-auto">
            <Link to="/cases" className="inline-flex items-center text-sm font-bold tracking-wider uppercase text-verve-text-secondary hover:text-verve-text-primary mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Cases
            </Link>
            
            <div className="flex flex-wrap gap-3 mb-6">
              {caseStudy.tags?.map(tag => (
                <span key={tag} className="text-xs font-bold tracking-wider uppercase text-verve-orange bg-verve-orange/10 px-3 py-1.5 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-verve-text-primary mb-6">
              {caseStudy.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-verve-text-secondary font-body leading-relaxed">
              {caseStudy.summary}
            </p>
          </div>
        </header>

        {/* Hero Image */}
        <div className="w-full h-[50vh] md:h-[70vh] mb-16 md:mb-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto h-full rounded-3xl overflow-hidden">
            <img src={coverImage} alt={caseStudy.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Content */}
        <div className="px-6 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16 pb-16 border-b border-verve-border">
            <div className="md:col-span-1 space-y-6">
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-verve-text-muted mb-2">Client Industry</h4>
                <p className="text-verve-text-primary font-body">{caseStudy.clientIndustry || 'Technology'}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold tracking-widest uppercase text-verve-text-muted mb-2">Services</h4>
                <p className="text-verve-text-primary font-body">{caseStudy.categories.join(', ')}</p>
              </div>
            </div>
            
            <div className="md:col-span-2 prose prose-lg dark:prose-invert prose-headings:font-display prose-headings:font-bold prose-p:font-body text-verve-text-secondary">
              <p>{caseStudy.description}</p>
              {/* Add more mock content to simulate a full case study */}
              <h3>The Challenge</h3>
              <p>In today's fast-paced digital landscape, the client needed a solution that could scale seamlessly while providing an exceptional user experience across all devices. The legacy system was causing significant friction and drop-offs.</p>
              <h3>Our Approach</h3>
              <p>We began with comprehensive user research and prototyping, focusing on the core user journeys. By implementing a modern tech stack and leveraging design system thinking, we created a robust and flexible platform.</p>
            </div>
          </div>
          
          <div className="text-center">
            <Link to="/contact" className="inline-flex items-center px-8 py-4 bg-verve-orange text-black font-bold uppercase tracking-wider rounded-pill hover:bg-amber-400 transition-colors">
              Start a similar project
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
