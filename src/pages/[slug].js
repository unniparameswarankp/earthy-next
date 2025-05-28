import { client } from '../../lib/sanityClient';
import { PortableText } from '@portabletext/react';
import { getPageBySlug } from '../../lib/queries';


export async function getStaticPaths() {
  const query = `*[_type == "page"]{ "slug": slug.current }`;
  const pages = await client.fetch(query);

  const paths = pages.map(page => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const query = `*[_type == "page" && slug.current == $slug][0]`;
  const page = await client.fetch(query, { slug: params.slug });

  return {
    props: { page },
  };
}

export default function Page({ page }) {
  return (
    <main className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{page.title}</h1>
      <PortableText value={page.content} />
    </main>
  );
}
