import React from 'react';
import { Helmet } from 'react-helmet-async';

const defaultSEO = {
  title: 'Verve Innovation | Custom Software Engineering & Digital Transformation',
  description:
    'Verve Innovation builds enterprise-grade software solutions, specializing in custom web and mobile development, digital transformation, and scalable cloud architectures.',
  type: 'website',
  image: '/OG-IMAGE.svg', // SVG used as default OG image
  url: 'https://verveinnovation.com', // Replace with actual domain
};

const SEO = ({ title, description, type, url, image, schema }) => {
  const seo = {
    title: title ? `${title} | Verve Innovation` : defaultSEO.title,
    description: description || defaultSEO.description,
    type: type || defaultSEO.type,
    image: image || defaultSEO.image,
    url: url ? `${defaultSEO.url}${url}` : defaultSEO.url,
  };

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* JSON-LD Schema for Generative Engine Optimization (GEO) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
