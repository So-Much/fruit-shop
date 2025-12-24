import { Metadata } from 'next';

const siteUrl = 'https://pick-your-basket.netlify.app';
const siteName = 'Farm Fresh - Pick Your Basket';
const defaultTitle = 'Farm Fresh - Fresh Fruits Every Day Delivered to Your Door';
const defaultDescription =
  'Carefully selected fresh fruits from trusted farms, no preservatives. Fast delivery within 2 hours. Shop local and imported fruits, family combos, and seasonal selections.';

export function createMetadata({
  title,
  description = defaultDescription,
  image = '/og-image.jpg',
  url = siteUrl,
  type = 'website',
}: {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
}): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const pageUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'fresh fruits',
      'fruit delivery',
      'online fruit store',
      'fresh produce',
      'fruit basket',
      'local fruits',
      'imported fruits',
      'healthy fruits',
      'fruit combos',
      'farm fresh',
      'organic fruits',
      'fruit shop',
    ],
    authors: [{ name: 'Farm Fresh' }],
    creator: 'Farm Fresh',
    publisher: 'Farm Fresh',
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type,
      url: pageUrl,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@farmfresh',
      site: '@farmfresh',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      // Add your verification codes here when available
      // google: 'your-google-verification-code',
      // yandex: 'your-yandex-verification-code',
      // yahoo: 'your-yahoo-verification-code',
    },
  };
}
