interface StructuredDataProps {
  type?: 'Organization' | 'WebSite' | 'Store' | 'Product';
  data?: Record<string, any>;
}

export default function StructuredData({ type = 'WebSite', data }: StructuredDataProps) {
  const siteUrl = 'https://pick-your-basket.netlify.app';
  const siteName = 'Farm Fresh - Pick Your Basket';

  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  let structuredData: Record<string, any> = { ...baseStructuredData };

  if (type === 'WebSite') {
    structuredData = {
      ...structuredData,
      name: siteName,
      url: siteUrl,
      description:
        'Carefully selected fresh fruits from trusted farms, no preservatives. Fast delivery within 2 hours.',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${siteUrl}/ordering?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    };
  } else if (type === 'Organization') {
    structuredData = {
      ...structuredData,
      name: siteName,
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-234-567-890',
        contactType: 'Customer Service',
        availableLanguage: 'English',
      },
      sameAs: [
        'https://www.facebook.com/farmfresh',
        'https://www.instagram.com/farmfresh',
        'https://twitter.com/farmfresh',
      ],
    };
  } else if (type === 'Store') {
    structuredData = {
      ...structuredData,
      name: siteName,
      image: `${siteUrl}/og-image.jpg`,
      url: siteUrl,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '123 Farm Street',
        addressLocality: 'Fresh City',
        addressRegion: 'FC',
        postalCode: '12345',
        addressCountry: 'US',
      },
      openingHours: 'Mo-Su 08:00-20:00',
      telephone: '+1-234-567-890',
    };
  }

  // Merge with custom data if provided
  if (data) {
    structuredData = { ...structuredData, ...data };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData, null, 0) }}
    />
  );
}
