import { client } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';

export async function getStaticPaths() {
  const query = `*[_type == "page"]{ "slug": slug.current }`;
  const pages = await client.fetch(query);

  // Filter out any pages with missing or invalid slug
  const paths = pages
    .filter(page => typeof page.slug === 'string' && page.slug.trim() !== '')
    .map(page => ({
      params: { slug: page.slug },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    title,
    content
  }`;
  const page = await client.fetch(query, { slug: params.slug });

  if (!page) {
    return { notFound: true };
  }

  return {
    props: { page },
  };
}

export default function Page({ page }) {
  if (!page) {
    return <p>Page not found.</p>;
  }

  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
      <PortableText value={page.content} />
    </main>
  );
}
