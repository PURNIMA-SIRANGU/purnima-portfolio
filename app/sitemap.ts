import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  // Cleaned trailing slash to avoid generating double slashes (//) in child routes
  const baseUrl = 'https://purnima-sirangu-portfolio.vercel.app';

  const routes = [
    '',
    '/about',
    '/roadmap',
    '/projects',
    '/credentials',
    '/blog',
    '/logs',
    '/gallery',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const, // Cast to literal type for strict TypeScript configurations
    priority: route === '' ? 1.0 : 0.8,
  }));
}
